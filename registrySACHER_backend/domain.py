from flask import request, jsonify
import json
import paramiko  # paramiko execute remote ssh commands
import time
from keystoneclient.v3 import client
import utils
from os.path import expanduser


class Domain:

    def __init__(self):
        print("hello")

    def domain_list(self):

        sess = utils.openstack_login()
        keystone = client.Client(session=sess)
        domains = keystone.domains.list()

        my_domain = {}  # dictionary
        arr = []
        my_domains = {}  # dictionary

        for domain in domains:
            print(domain)
            my_domain['id'] = domain.id
            my_domain['name'] = domain.name
            my_domain['description'] = domain.description
            my_domain['enabled'] = domain.enabled
            arr.append(my_domain.copy())
            print("APPEND")
            print(my_domain)

        print("ARRAY: \n")
        print(arr)
        my_domains['domains'] = arr

        # {domains=[{domain.id, domain.name, domain.description, domain.enabled},
        # {domain.id, domain.name, domain.description, domain.enabled]}}
        print(my_domains)
        return json.dumps(my_domains)  # dictionary to json

    def project_list(self, domain_id):

        sess = utils.openstack_login()
        keystone = client.Client(session=sess)
        projects = keystone.projects.list(domain=domain_id)

        my_project = {}  # dictionary
        arr = []
        my_projects = {}  # dictionary

        for project in projects:
            # print(domain);
            my_project['id'] = project.id
            my_project['domain_id'] = project.domain_id
            my_project['name'] = project.name
            my_project['links'] = project.links
            arr.append(my_project.copy())
            print("APPEND")
            print(my_project)

        print("ARRAY: \n")
        print(arr)
        my_projects['projects'] = arr

        print(my_projects)
        return json.dumps(my_projects)  # dictionary to json


    def role_assignment_list(self, domain_id):

        sess = utils.openstack_login()
        keystone = client.Client(session=sess)
        role_assignments = keystone.role_assignments.list(include_names=True)

        print(role_assignments)

        my_role_assignment = {}  # dictionary
        arr = []
        my_role_assignments = {}  # dictionary

        for role_assignment in role_assignments:

            if 'project' in role_assignment.scope:
                project_role_assignment = role_assignment.scope['project']
                dom_id = project_role_assignment['domain']['id']
                dom_name = project_role_assignment['domain']['name']

            else:
                dom_id = role_assignment.scope['domain']['id']
                dom_name = role_assignment.scope['domain']['name']

            if dom_id == domain_id:
                my_role_assignment['role_id'] = role_assignment.role['id']
                my_role_assignment['role_name'] = role_assignment.role['name']
                my_role_assignment['domain_id'] = dom_name
                if hasattr(role_assignment, 'user'):
                    my_role_assignment['user'] = role_assignment.user['name']
                arr.append(my_role_assignment.copy())
                print("APPEND")
                print(my_role_assignment)

        print("ARRAY: \n")
        print(arr)
        my_role_assignments['roleAssignments'] = arr

        print(my_role_assignments)
        return json.dumps(my_role_assignments)  # dictionary to json


    def add_domain(self):

        domain_name = request.json['domainName']
        domain_description = request.json['domainDescription']

        user_name = request.json['userName']
        user_password = request.json['userPassword']
        project_name = request.json['projectName']

        sess = utils.openstack_login()
        keystone = client.Client(session=sess)

        try:
            # domain, user e role sono creati con keystone client
            # add role e' eseguito con ssh paramico

            domain = keystone.domains.create(domain_name, domain_description)
            print((keystone.domains.list()))

            project = keystone.projects.create(project_name, domain, )
            print((keystone.projects.list()))
            user = keystone.users.create(user_name, password=user_password, domain=domain)
            print((keystone.users.list()))
            role = keystone.roles.create("admin", domain=domain)
            print((keystone.roles.list()))

            toml_config = utils.load_toml_config()

            # expand tilde
            keypath = expanduser(toml_config["ssh"]["SSH_PRIVATE_KEY_PATH"])

            ssh_conn = paramiko.SSHClient()
            ssh_conn.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            ssh_conn.connect(toml_config["ssh"]["HOSTNAME"], username=toml_config["ssh"]["SSH_USER"],
                             key_filename=keypath)

            stdin, stdout, stderr = ssh_conn.exec_command('ls -l')
            print(stdout)

            print('EXECUTING ON SERVER LAB2: source /home/giuseppe/devstack_ocata/accrc/admin/admin')
            print(('EXECUTING: openstack role add --user ' + user.name + ' --project ' + project.name + ' admin'))
            stdin, stdout, stderr = ssh_conn.exec_command('source /home/giuseppe/devstack_ocata/accrc/admin/admin && openstack role add --user ' + user.name +' --project ' + project.name + ' admin')
            time.sleep(1)

        except Exception as ex:
            print("Error Error")
            print((ex.message))
            raise jsonify({"exception":ex.message})

        my_domain = {}  # dictionary
        my_domain['id'] = domain.id
        my_domain['name'] = domain.name
        my_domain['description'] = domain.description
        my_domain['enabled'] = domain.enabled

        domain={}
        domain['domain'] = my_domain
        return json.dumps(domain)


    def delete_domain(self, id):

        sess = utils.openstack_login()
        keystone = client.Client(session=sess)

        try:

            projects = keystone.projects.list(domain=id)
            users = keystone.users.list(domain=id)

            for project in projects:
                keystone.projects.delete(project)


            for user in users:
                keystone.users.delete(user)

            keystone.domains.update(domain=id, enabled=False)
            domain = keystone.domains.delete(id)

        except Exception as ex:
            print("Error Error")
            print(ex)
            raise jsonify({"exception":ex.message}) #InvalidUsage('This view is gone', status_code=410)
            #return jsonify({"exception":ex.message})

        print(domain)

        return jsonify({"msg": "Domain ID: " + id + " deleted"})


    def update_domain(self, id):

        sess = utils.openstack_login()
        keystone = client.Client(session=sess)

        domain_name = request.json['domainname']
        domain_description = request.json['domaindescription']

        if request.json['domainenabled'] == "true":
            domain_enabled = True
        else:
            domain_enabled = False

        try:
            domain = keystone.domains.update(domain=id,name=domain_name,
                                             description=domain_description,enabled=domain_enabled)
        except Exception as ex:
            print("Error UpdateDomain")
            print(ex)
            return jsonify({"exception": ex.message})

        my_domain = {}  # dictionary
        my_domain['id'] = domain.id
        my_domain['name'] = domain.name
        my_domain['description'] = domain.description
        my_domain['enabled'] = domain.enabled
        #print(domain)

        domain={}
        domain['domain'] = my_domain
        print(domain)
        return json.dumps(domain)



    def server_list(self, domain_id):

        sess = utils.openstack_login()
        keystone = client.Client(session=sess)

        keystone.project
        projects = keystone.projects.list(domain=domain_id)

        my_project = {}  # dictionary
        arr = []
        my_projects = {}  # dictionary

        for project in projects:
            # print(domain);
            my_project['id'] = project.id
            my_project['domain_id'] = project.domain_id
            my_project['name'] = project.name
            my_project['links'] = project.links
            arr.append(my_project.copy())
            print("APPEND")
            print(my_project)

        print("ARRAY: \n")
        print(arr)
        my_projects['projects'] = arr

        print(my_projects)
        return json.dumps(my_projects)  # dictionary to json


    if (__name__ == '__main__'):
        sess = utils.openstack_login()
        keystone = client.Client(session=sess)
        domains = keystone.domains.list()
        print("HELLO\n")
        print(domains)
