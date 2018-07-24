import json
import utils


class Server:

    def server_list(self):

        nova = utils.nova_login()

        arr = []  # array
        my_server = {}  # dictionary

        server_list = nova.servers.list()

        instance0 = server_list[0]

        print((instance0.status))

        for server in nova.servers.list():
            my_server['name'] =  server.name
            my_server['status'] = server.status

            print(('SERVER ID ' + server.id + 'SERVER NAME: '  + server.name))

            # print('SERVER RESUME: ' + server.resume())
            arr.append(my_server.copy())


        return json.dumps(arr)



    def pause_server(self, name):

        nova = utils.nova_login()

        arr = []  # array

        print("server pause")

        server = nova.servers.find(name=name)

        try:
            server.pause()
        except Exception as e:
            return json.dumps({"res": "fail"})

        return json.dumps({"res": "done"})




    def resume_server(self, name):

        nova = utils.nova_login()

        arr = []  # array

        print("server pause")

        server = nova.servers.find(name=name)

        try:
            server.unpause()
        except Exception as e:
            return json.dumps({"res": "fail"})

        return json.dumps({"res": "done"})


