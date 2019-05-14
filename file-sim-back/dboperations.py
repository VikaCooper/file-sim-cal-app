import dbconnector


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
            sql = "insert into user_log_info (username,password) VALUES (\"%s\",\"%s\")" % (un, pw)
            result = cursor.execute(sql)
            conn.commit()
            return result
    finally:
        conn.close()
