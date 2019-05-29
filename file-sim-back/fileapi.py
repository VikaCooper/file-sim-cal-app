from flask import Flask, jsonify
from flask import request
import json
import dboperations
import fileHandler

app = Flask(__name__)


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
    else:
        pass


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
        file_list = fileHandler.zip_reader('./upload/tmp/compressed/' + filename, theme)
        return jsonify(
            data=file_list
        )


if __name__ == "__main__":
    app.run(debug=True)
