import utils
import json
from flask import send_file, request
import base64

class Storage:

    def container_list(self, project_name):

        swift_conn = utils.swift_login(project_name)
        accounts = swift_conn.get_account()

        print((accounts[1]))

        arr = []
        my_containers={}

        for container in accounts[1]:
            arr.append(container)
            print(container)

        my_containers['containers']=arr

        return json.dumps(my_containers)


    def container_content(self, project_name, container, folder_name):

        swift_conn = utils.swift_login(project_name)

        if(folder_name == 'null'):
            content = swift_conn.get_container(container, delimiter='/')
        else:
            folder_name = folder_name.replace('*','/')
            # folder_name = folder_name + '/'
            content = swift_conn.get_container(container, prefix=folder_name, delimiter='/')

        # delimiter='/'

        print(content)

        arr = []
        my_content={}

        for object in content[1]:
            if 'subdir' in object:
                arr.append(object)
                print(object)

            if 'name' in object:
                if (object['name'] != folder_name) :
                    arr.append(object)
                    print(object)

        my_content['content']=arr
        print(my_content)
        return json.dumps(my_content)


    def download_object(self, project_name, containerName, objectName):

        swift_conn = utils.swift_login(project_name)
        objectName = objectName.replace('*', '/')
        object = swift_conn.get_object(containerName, objectName)

        file_name = objectName.replace('/', '_')

        # si scrive prima su file system e poi si restituisce il file nella response
        with open(file_name, 'wb') as new_file:
            new_file.write(object[1])

        return send_file(file_name, object[0]["content-type"])


    def upload_object(self, project_name, containerName):

        swift_conn = utils.swift_login(project_name)
        temp = request
        print(temp)
        print((request.files))

        # checking if the file is present or not in the request.
        # if 'file' not in request.files:
        #     return "No file found"

        file = request.files['fileLoaded']
        print(file)

        containerName = containerName.replace('*', '/')
        print("hello")
        swift_conn.put_object(containerName, file.filename, contents=file.read(), content_type=file.headers[1][1])

        return "file successfully saved"



    def container_create(self, project_name, containerName):
            swift_conn = utils.swift_login(project_name)

            swift_conn.put_container(containerName + "/test_folder")

            return json.dumps({"text": "container_created"})


    def delete_object(self, project_name, containerName, objectName):

        swift_conn = utils.swift_login(project_name)
        objectName = objectName.replace('*', '/')

        try:
            swift_conn.delete_object(containerName, objectName)
        except Exception as ex:
            print("Error Error")
            print(ex)
            raise json.dumps({"error":ex.message})

        return json.dumps({"objectName": objectName})


    def acl_read_enable(self, project_name, containerName):
        swift_conn = utils.swift_login(project_name)

        headers = {'X-Container-Read': '.r:*'}
        swift_conn.post_container(containerName, headers=headers)

        return json.dumps({"text": "read_enable"})



    def acl_read_disable(self, project_name, containerName):
            swift_conn = utils.swift_login(project_name)

            headers = {"X-Remove-Container-Read": "any"}
            swift_conn.post_container(containerName, headers)

            return json.dumps({"text": "read_disable"})


