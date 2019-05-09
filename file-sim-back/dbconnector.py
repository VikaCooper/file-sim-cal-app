import pymysql


def connect_db():
    # Connect to the database
    conn = pymysql.connect(host='localhost',
                           user='edwards',
                           password='mydatabase',
                           db='file_sim',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)

    return conn


def close_db(conn):
    conn.close()



connect_db()
