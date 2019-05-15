import os
import zipfile
import re


def zip_reader(filePath, theme):
    is_zip = zipfile.is_zipfile(filePath)
    file_list = []
    if is_zip:
        zip_file_contents = zipfile.ZipFile(filePath, 'r')
        for file in zip_file_contents.namelist():
            if file.endswith('.doc'):
                file = re.sub("\D", "", file) + '_' + theme + '.doc'
                if file not in file_list:
                    file_list.append(file)

    print(len(file_list))
    return file_list


# if __name__ == '__main__':
#     zip_reader('./upload/tmp/compressed/开发测试一.zip', '开发测试一')
