import dbconnector
import uuid
import datetime
from json import dumps,loads
from flask import session
import sys


def log_in_data(user_input):
    conn = dbconnector.connect_db()
    try:
        with conn.cursor() as cursor:
            sql = "select * from user_log_info"
            cursor.execute(sql)
            result = cursor.fetchall()
            for row in result:
                if row.get('username') == user_input.get('username'):
                    if row.get('password') == user_input.get('password'):
                        if row.get('usertype') == user_input.get('usertype'):
                            print(row)
                            return True
                    else:
                        return False
    finally:
        conn.close()


def create_account_insert(user_input):
    conn = dbconnector.connect_db()
    try:
        with conn.cursor() as cursor:
            print(user_input)
            un = user_input.get('username')
            pw = user_input.get('password')
            ut = user_input.get('usertype')
            sql = "insert into user_log_info (username,password,usertype) VALUES (\"%s\",\"%s\",\"%s\")" % (un, pw, ut)
            result = cursor.execute(sql)
            conn.commit()
            return result
    finally:
        conn.close()


def file_cut_insert(file_cut):
    conn = dbconnector.connect_db()
    try:
        with conn.cursor() as cursor:
            curr_time = datetime.datetime.now().strftime('%Y/%m/%d')
            username = session['username']
            usertype = session['usertype']

            wait_to_insert = []
            for i in file_cut:
                wait_to_insert.append((str(uuid.uuid4()), ','.join(i.get('seg')), str(curr_time), username, usertype))
            sql = "insert into doc_models (doc_id,doc_slices,collect_time,username,usertype) VALUES " \
                  "(%s,%s,%s,%s,%s)"
            result = cursor.executemany(sql, wait_to_insert)
            conn.commit()
            return result
    except Exception:
        print("Unexpected error:", sys.exc_info())
    finally:
        conn.close()


def result_insert(result):
    if not result:
        return False
    conn = dbconnector.connect_db()
    try:
        with conn.cursor() as cursor:
            curr_time = datetime.datetime.now().strftime('%Y/%m/%d')
            username = session['username']
            usertype = session['usertype']

            print(dumps({"result":result}))
            sql = """insert into user_history (record_id,username,usertype,cal_time,result) VALUES (%s,%s,%s,%s,%s)"""
            result = cursor.execute(sql,
                     (str(uuid.uuid4()), username, usertype, str(curr_time), dumps(result))
                                    )
            conn.commit()
            return result
    except Exception:
        print("Unexpected error:", sys.exc_info())
    finally:
        conn.close()

# if __name__ == '__main__':
#     result_insert()
