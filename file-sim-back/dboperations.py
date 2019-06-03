import dbconnector
import uuid
import datetime
from json import dumps, loads
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
            record_id = str(uuid.uuid4());

            print(dumps({"result": result}))
            sql = """insert into user_history (record_id,username,usertype,cal_time,result) VALUES (%s,%s,%s,%s,%s)"""
            cursor.execute(sql,
                                    (record_id, username, usertype, str(curr_time), dumps(result))
                                    )
            conn.commit()
            return record_id
    except Exception:
        print("Unexpected error:", sys.exc_info())
    finally:
        conn.close()


def record_search(date_strings):
    if not date_strings[0]:
        date_strings[0] = '2019/01/01'
    if not date_strings[1]:
        date_strings[1] = datetime.datetime.now().strftime('%Y/%m/%d')
    print('in date string: ', date_strings)
    conn = dbconnector.connect_db()
    try:
        with conn.cursor() as cursor:
            sql = """
            SELECT * from user_history WHERE unix_timestamp(cal_time) BETWEEN unix_timestamp(%s) 
            and unix_timestamp(%s);
            """
            cursor.execute(sql, (date_strings[0], date_strings[1]))
            result = cursor.fetchall()
            return result
    except Exception:
        print("Unexpected error:", sys.exc_info())
    finally:
        conn.close()


def record_by_id(record_id):
    conn = dbconnector.connect_db()
    try:
        with conn.cursor() as cursor:
            sql = """
            SELECT result from user_history WHERE record_id = %s;
            """
            cursor.execute(sql, (record_id))
            result = cursor.fetchall()
            print(result)
            return result
    except Exception:
        print("Unexpected error:", sys.exc_info())
    finally:
        conn.close()


def records_all():
    conn = dbconnector.connect_db()
    try:
        with conn.cursor() as cursor:
            sql = """
               SELECT doc_id, doc_slices from doc_models;
               """
            cursor.execute(sql)
            result = cursor.fetchall()
            return result
    except Exception:
        print("Unexpected error:", sys.exc_info())
    finally:
        conn.close()

# if __name__ == '__main__':
#     record_by_id('052eeab3-a1e4-4c66-b98b-de10d394f12d')
