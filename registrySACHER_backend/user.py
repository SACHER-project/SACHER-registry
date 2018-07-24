from flask import Flask, request, Response, jsonify
import psycopg2  # postgreSQL driver
from psycopg2 import sql
import bcrypt
import datetime
import json
import utils


class User:

    def user_list(self):

        cur = utils.db_connect()

        try:
            cur.execute(
                """SELECT user_table.username, user_table.password, user_table.email, role_names.role_name, user_table.creation_time
                    FROM user_table INNER JOIN role_names ON user_table.role = role_names.role;""")

        except Exception as e:
            print("I can't SELECT from user_table")
            print(e)

        arr = []  # array
        my_user = {}  # dictionary

        rows = cur.fetchall()
        print("\nRows: \n")

        for row in rows:
            print("   ", row)
            my_user['name'] = row[0]
            # my_user['password'] = row[1]
            my_user['email'] = row[2]
            my_user['role'] = row[3]

            if isinstance(row[4], datetime.datetime):
                serializable_data = row[4].__str__()
                my_user['creation_time'] = serializable_data

            arr.append(my_user.copy())

        print(arr)
        return json.dumps(arr)


    def add_user(self):

        username = request.json['username']
        password = request.json['password']
        email = request.json['email']
        role = request.json['role']

        cur = utils.db_connect()

        try:
            cur.execute("""INSERT INTO user_table (username, password, email, role) VALUES (%(usr)s, %(pwd)s, %(eml)s, %(rol)s)""",
                                {'usr': username, 'pwd': bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()), 'eml': email, 'rol': role})

        except Exception as e:
            if hasattr(e, 'pgcode'):
                if e.pgcode == "23505":
                    print("ERROR 235050")
                    return jsonify({"exception": e.message})
            print("Erro : insert into user_table")
            print(e)

        try:
            cur.execute("""SELECT user_table.username, user_table.password, user_table.email, role_names.role_name, user_table.creation_time
                    FROM user_table INNER JOIN role_names ON user_table.role = role_names.role
                    WHERE user_table.username=%(user)s;""", {'user': username})

        except Exception as e:
            print("Erro : insert into user_table")
            print(e)

        my_user = {}  # dictionary

        row = cur.fetchall()
        # print "\nRow: \n" + row

        my_user['name'] = row[0][0]
        # myUser['password'] = row[0][1]
        my_user['email'] = row[0][2]
        my_user['role'] = row[0][3]

        if isinstance(row[0][4], datetime.datetime):
            serializable_data = row[0][4].__str__()
            my_user['creation_time'] = serializable_data

        print(my_user)
        return json.dumps(my_user)


    def update_user(self, nameToUpdate):

        # username = request.json['name']
        password = request.json['password']
        email = request.json['email']
        role_name = request.json['role']

        cur = utils.db_connect()

        try:
            cur.execute("""SELECT role FROM role_names WHERE role_name=%(role_name)s""", {'role_name': role_name})

        except Exception as e:
            print ("Erro : insert into user_table")
            print(e)

        row = cur.fetchall()
        role = row[0][0]

        try:
            cur.execute("""UPDATE user_table SET password=%(pwd)s, email=%(eml)s, role=%(rol)s WHERE username=%(nameToUpdate)s""",
                        {'pwd': bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()), 'eml': email, 'rol': role, 'nameToUpdate':nameToUpdate})

        except Exception as e:
            if hasattr(e, 'pgcode'):
                if e.pgcode == "23505":
                    print("ERROR 235050")
                    return jsonify({"exception": e.message})
            print("Erro : insert into user_table")
            print(e)

        try:
            cur.execute(sql.SQL("select * from {} where {} = %s").format(sql.Identifier('user_table'),
                                                                         sql.Identifier('username')), [nameToUpdate])

        except Exception as e:
            print ("Erro : insert into user_table")
            print(e)

        my_user = {}  # dictionary

        row = cur.fetchall()
        # print "\nRow: \n" + row

        my_user['name'] = row[0][0]
        # myUser['password'] = row[0][1]
        my_user['email'] = row[0][2]
        my_user['role'] = role_name

        if isinstance(row[0][4], datetime.datetime):
            serializable_data = row[0][4].__str__()
            my_user['creation_time'] = serializable_data

        user={}
        user['user'] = my_user
        return json.dumps(user)



    def delete_user(self, name):

        cur = utils.db_connect()

        try:
            cur.execute("""DELETE FROM user_table WHERE username=%(usr)s""", {'usr': name})
        except (Exception, psycopg2.DatabaseError) as e:
            print(e)
            raise jsonify({"exception":e.message})

        if cur.rowcount == 0:
            return jsonify({"exception": "User not found!"})

        return jsonify({"msg": "User " + name + " deleted!"})



    def login_user(self):

        username = request.json['userName']
        password = request.json['password']

        cur = utils.db_connect()

        try:
            cur.execute("""SELECT user_table.username, user_table.password, user_table.role, role_names.role_name
                                       FROM user_table INNER JOIN role_names ON user_table.role = role_names.role
                                       WHERE user_table.username=%(user)s;""", {'user': username})

            # cur.execute("""SELECT * FROM user_table WHERE username = %(usr)s;""", {'usr': username})

        except Exception as e:
            if hasattr(e, 'pgcode'):
                if e.pgcode == "23505":
                    print("ERROR 235050")
                    return jsonify({"exception": e.message})
            print("Erro : insert into user_table")
            print(e)


        my_response = {}  # dictionary

        row = cur.fetchall()

        hashed_pwd = row[0][1]


        # if bcrypt.hashpw(password.encode('utf-8'), hashed_pwd) == hashed_pwd:
        if bcrypt.checkpw(password.encode('utf-8'), hashed_pwd.encode('utf-8')):
            my_response['res']='success'
            my_response['role'] = row[0][2]
            my_response['role_name'] = row[0][3]

        else:
            my_response['res'] = 'fail'

        print(my_response)
        return json.dumps(my_response)



    def role_services_list(self):

        cur = utils.db_connect()

        try:
            cur.execute(sql.SQL("SELECT * FROM {}").format(sql.Identifier('role_services')))
        except Exception as e:
            print("I can't SELECT from user_table")
            print(e)

        arr = []  # array
        my_role_services = {}  # dictionary

        rows = cur.fetchall()
        print("\nRows: \n")
        for row in rows:
            print("   ", row)
            my_role_services['role'] = row[0]
            my_role_services['services'] = row[1]

            arr.append(my_role_services.copy())

        print(arr)
        return json.dumps(arr)



    def role_services(self, role):

        cur = utils.db_connect()

        try:
            cur.execute("""SELECT services from role_services WHERE role=%(role)s""", {'role': role })

        except Exception as e:
            print("Erro : insert into user_table")
            print(e)

        my_services = {}  # dictionary

        row = cur.fetchall()

        my_services['services'] = row[0]

        print(my_services)

        return json.dumps(my_services)