import os
import jieba
from gensim import corpora, models, similarities

PREFIX_COMPRESSED_PATH = './upload/tmp/compressed/'
PREFIX_UNCOMPRESSED_PATH = './upload/tmp/uncompressed/'


# 解压上传的文件
def term_uncompress(file_path, theme):
    os.system('unar -o ' + PREFIX_UNCOMPRESSED_PATH + theme + ' ' + file_path)
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


# 计算词袋
def bag_of_words(file_cut):
    all_texts = []
    for f in file_cut:
        all_texts.append(f.get('seg'))
    dictionary = corpora.Dictionary(all_texts)
    return dictionary


# 建立模型
def tf_idf_value(file_cut, dictionary):
    doc_vectors = []
    for f in file_cut:
        doc_single_v = dictionary.doc2bow(f.get('seg'))
        doc_vectors.append(doc_single_v)
    tf_idf = models.TfidfModel(doc_vectors)

    print(tf_idf.idfs)
    tf_idf_vectors = tf_idf[doc_vectors]
    print(tf_idf_vectors)


def cal_sim(file_cut):
    result = []

    stno = list(file_cut.keys())

    texts = file_cut.values()  # get documents' content

    d = corpora.Dictionary(texts)  # establish bow model

    doc_vectors = [d.doc2bow(text) for text in texts]

    tfidf = models.TfidfModel(doc_vectors)  # establish ti-idf model
    tfidf_vectors = tfidf[doc_vectors]

    lsi = models.LsiModel(tfidf_vectors, id2word=d)  # establish lsi model
    lsi_vector = lsi[tfidf_vectors]
    index_lsi = similarities.MatrixSimilarity(lsi_vector)

    # use every doc to be a query and get every query's similarity
    for key in file_cut.keys():
        i = 0
        tmp = {}
        print(key)
        query = file_cut[key]
        query_bow = d.doc2bow(query)
        query_lsi = lsi[query_bow]
        sims_lsi = index_lsi[query_lsi]
        for k in stno:
            tmp[k] = sims_lsi[i]
            i += 1
        result[key] = tmp  # get result here
        print(result[key])  # output every doc's similarity


if __name__ == '__main__':
    term_uncompress(PREFIX_COMPRESSED_PATH + '开发测试一.zip', '开发测试一')
    modify_filename(PREFIX_UNCOMPRESSED_PATH + '开发测试一/' + '开发测试一')
    modify_doc2docx(PREFIX_UNCOMPRESSED_PATH + '开发测试一/' + '开发测试一')
    file_list = read_from_txt(PREFIX_UNCOMPRESSED_PATH + '开发测试一/' + '开发测试一')
    print(len(file_list))
    file_cut = cut_file(file_list)
    print(len(file_cut))
    dictionary = bag_of_words(file_cut)
    tf_idf_value(file_cut, dictionary)
