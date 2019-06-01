from gensim import corpora, models, similarities
import xlwt


############################
############################
# 用三种方法计算文档相似度
############################
############################
# 计算词袋
def bag_of_words(file_cut):
    # 存储所有分过词后的文本
    all_texts = []
    for f in file_cut:
        all_texts.append(f.get('seg'))
    # 在所有文档的基础之上，建立字典
    dictionary = corpora.Dictionary(all_texts)
    # 通过词袋分别建立每篇文档的向量
    return [[dictionary.doc2bow(text) for text in all_texts], dictionary]


# 建立TF-IDF模型
def tf_idf_value(corpus):
    tf_idf = models.TfidfModel(corpus)
    corpus_tfidf = tf_idf[corpus]

    return corpus_tfidf


# vsm计算文档相似度
def cal_sim_by_vsm(corpus_tfidf, corpus):
    print('正在通过VSM计算文档之间的相似度......')
    index = similarities.MatrixSimilarity(corpus_tfidf, corpus_len=len(corpus))
    return index


# lsi计算文档相似度
def cal_sim_by_lsi(tf_idf, dictionary, corpus):
    print('正在通过LSI模型计算文档之间的相似度......')
    lsi = models.LsiModel(tf_idf, id2word=dictionary, num_topics=3)
    corpus_lsi = lsi[corpus]
    index = similarities.MatrixSimilarity(corpus_lsi)
    return index


# lda计算文档相似度
def cal_sim_by_lda(tf_idf, dictionary, corpus):
    print('正在通过LDA模型计算文档之间的相似度......')
    lda = models.LdaModel(tf_idf, id2word=dictionary, num_topics=5)
    corpus_lda = lda[corpus]
    index = similarities.MatrixSimilarity(corpus_lda)
    return index


# 结果分析
def result_analysis(vsm, lsi, lda):
    result = []
    for (x, y, z) in zip(vsm, lsi, lda):
        key = list(x.keys())[0]
        tmp_s = []
        for (o, p, q) in zip(x[key], y[key], z[key]):
            s = str(round((float(o) + float(p) + float(q)) / 3, 3))
            tmp_s.append(s)
        result.append({key: tmp_s})
    return result


def cal_process(file_cut):
    bag_words = bag_of_words(file_cut)
    corpus = bag_words[0]
    dictionary = bag_words[1]
    corpus_tfidf = tf_idf_value(corpus)
    vsm_result = result_format(file_cut, cal_sim_by_vsm(corpus_tfidf, corpus))
    print(vsm_result)
    lsi_result = result_format(file_cut, cal_sim_by_lsi(corpus_tfidf, dictionary, corpus))
    print(lsi_result)
    lda_result = result_format(file_cut, cal_sim_by_lda(corpus_tfidf, dictionary, corpus))
    print(lda_result)

    result = result_analysis(vsm_result, lsi_result, lda_result)
    print(result)
    return [
        {'vsm': vsm_result},
        {'lsi': lsi_result},
        {'lda': lda_result},
        {'result': result}
    ]


############################
############################
# 处理得到的结果
############################
############################

def result_format(file_cut, result_list):
    result = []
    st = []
    for s in file_cut:
        st.append(s.get('filename').split('.')[0])
    for x, y in zip(st, result_list):
        tmp_y = []
        for a in list(y):
            tmp_y.append(str(round(a, 3)))
        result.append({x: tmp_y})
    return result

############################
############################
# 生成Excel文件
############################
############################

# def write2excel(result):
#     wb = xlwt.Workbook()
#     vsm_sheet = wb.add_sheet('vsm')
#     vsm_result = result[0].get('vsm')
#     columns = []
#     for vr in vsm_result:
#         columns.append(list(vr.keys())[0])

def cal_api(file_cut):
    return cal_process(file_cut)
