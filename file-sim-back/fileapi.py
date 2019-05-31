from flask import Flask, jsonify
from flask import request, session
import json
import dboperations
import fileHandler
import os
import jieba


PREFIX_COMPRESSED_PATH = './upload/tmp/compressed/'
PREFIX_UNCOMPRESSED_PATH = './upload/tmp/uncompressed/'

app = Flask(__name__)
global file_cut
user_name= ''
user_type=''


@app.route('/test')
def test():
    return jsonify(
        message='ok',
        data='test'
    )


@app.route('/login', methods=['GET', 'POST'])
def log_in():
    if request.method == 'POST':
        json_data = json.loads(request.get_data().decode("utf-8"))
        result = dboperations.log_in_data(json_data)
        session['username'] = json_data.get('username')
        session['usertype'] = json_data.get('usertype')
        global user_name
        global user_type
        user_name = session['username']
        user_type = session['usertype']

        print(json_data)

        if result:
            return jsonify(
                message='ok',
                data='登录成功',
                result=True
            )
        else:
            return jsonify(
                message='用户名或密码不正确',
                data='登录失败',
                result=False

            )


@app.route('/logout', methods=['GET', 'POST'])
def log_out():
    if request.method == 'GET':
        session.pop('username')
        session.pop('usertype')
        return jsonify(
            message='ok',
            data='注销成功',
            result=True
        )


@app.route('/createAccount', methods=['GET', 'POST'])
def create_account():
    if request.method == 'POST':
        json_data = json.loads(request.get_data().decode("utf-8"))
        result = dboperations.create_account_insert(json_data)
        print(result)
        if result == 1:
            return jsonify(
                message='ok',
                data='注册成功',
                result=True
            )
        else:
            return jsonify(
                message='用户名或密码格式不对',
                data='注册失败',
                result=False

            )


@app.route('/uploadFile', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file1' not in request.files:
            print('cannot find file')
            return jsonify(
                message='找不到文件',
                data='文件上传失败',
                result=False
            )
        file = request.files['file1']
        file.save('./upload/tmp/compressed/' + file.filename)
        return jsonify(
            message='文件上传成功',
            data='文件上传成功',
            result=True
        )


@app.route('/getFileList/<filename>&<theme>', methods=['POST', 'GET'])
def cal_file_sim(filename, theme):
    if request.method == 'GET':
        try:
            file_cut = get_file_cut(filename, theme)
            dboperations.file_cut_insert(file_cut)
            result = fileHandler.cal_api(file_cut)
            dboperations.result_insert(result)
            return jsonify(
                message='计算成功',
                data=result,
                result=True
            )
        except Exception:
            return jsonify(
                message='计算失败',
                data='',
                result=False
            )




# 解压上传的文件
def term_uncompress(file_path, theme):
    os.system('unar -o ' + PREFIX_UNCOMPRESSED_PATH + ' ' + file_path)
    return PREFIX_UNCOMPRESSED_PATH + theme


# 修改文件名
def modify_filename(path):
    curr_path = os.getcwd()
    os.chdir(path)
    file_list = os.listdir()
    for file in file_list:
        file_cut = jieba.lcut(file, cut_all=False)
        num = ''
        for s in file_cut:
            if s.isdigit() and len(s) > 10:
                num = s
        os.rename(file, num + file_cut[-2] + file_cut[-1])
    os.chdir(curr_path)


# 修改文件格式至txt
def modify_doc2docx(path):
    file_list = os.listdir(path)
    curr_path = os.getcwd()
    os.chdir(path)
    for file in file_list:
        if file.endswith('.doc'):
            os.system('antiword ' + file + ' > ' + file[:-4] + '.txt')
    for file in file_list:
        if not file.endswith('.txt'):
            os.remove(file)
    os.chdir(curr_path)


# 读取txt的内容
def read_from_txt(path):
    # get filenames in directory
    files = os.listdir(path)
    curr_path = os.getcwd()
    os.chdir(path)
    # iterate paths in files
    file_list = []
    for filename in files:
        with open(filename) as f:
            file_content = []
            for line in f.readlines():
                line = line.strip('\n')
                line = line.strip(' ')
                if line != '' and line != '\n':
                    file_content.append(line)
            file_list.append({'filename': filename, 'content': file_content})
    os.chdir(curr_path)
    return file_list


# 对文档分词
def cut_file(file_list):
    # get stop words list
    stop_words = open('stop_words.txt', 'r', encoding='utf-8').readlines()
    stop_words = [w.strip() for w in stop_words]
    file_cut = []
    for file_dic in file_list:
        result_list = []
        if len(file_dic.get('content')) == 0:
            pass
        else:
            doc_seg = jieba.cut(''.join(file_dic.get('content')), cut_all=False)
            for word in doc_seg:
                if word not in stop_words and word.isspace() is False:
                    result_list.append(word)
            file_cut.append({"filename": file_dic.get('filename'), "seg": result_list})
    print(file_cut)
    return file_cut


def get_file_cut(filename, theme):
    fp = term_uncompress(PREFIX_COMPRESSED_PATH + filename, theme)
    modify_filename(fp)
    modify_doc2docx(fp)
    file_list = read_from_txt(fp)
    return cut_file(file_list)


if __name__ == "__main__":
    app.secret_key = '000000'
    app.run(debug=True)
