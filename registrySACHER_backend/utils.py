from flask import jsonify
import psycopg2
import toml
import os
from keystoneclient import session
from keystoneclient.auth.identity import v3
import swiftclient
from novaclient import client as novaclient


def db_connect():

    config = load_toml_config()

    try:
        conn = psycopg2.connect(dbname=config["database"]["DB_NAME"], user=config["database"]["DB_USER"],
                                host=config["database"]["DB_HOST"], password=config["database"]["DB_PASSWORD"])
        conn.autocommit = True
    except Exception as e:
        print("Error: I am unable to connect to the database")
        print(e)
        return jsonify({"exception": e.message})

    return conn.cursor()


def load_toml_config():

    config = {}
    # print "The current working directory is", os.getcwd()

    if os.path.exists("./config.toml"):
        # print "EXISTS"
        with open("./config.toml", 'r') as fp:
            config = toml.load(fp)

    return config


def openstack_login():

    config = load_toml_config()

    auth = v3.Password(auth_url=config["openstack_lab"]["OPENSTACK_AUTH_URL"],
                       username=config["openstack_lab"]["OPENSTACK_USERNAME"],
                       password=config["openstack_lab"]["OPENSTACK_PASSWORD"],
                       user_domain_name=config["openstack_lab"]["OPENSTACK_PROJECT_DOMAIN_NAME"],
                       project_name=config["openstack_lab"]["OPENSTACK_PROJECT_NAME"],
                       project_domain_name=config["openstack_lab"]["OPENSTACK_USER_DOMAIN_NAME"])
    return session.Session(auth=auth)


def nova_login():

    config = load_toml_config()

    nova = novaclient.Client(version=config["openstack_sacher"]["NOVA_VERSION"],
                             username=config["openstack_sacher"]["OPENSTACK_USERNAME"],
                             password=config["openstack_sacher"]["OPENSTACK_PASSWORD"],
                             project_name=config["openstack_sacher"]["OPENSTACK_PROJECT_NAME"],
                             auth_url=config["openstack_sacher"]["OPENSTACK_AUTH_URL"])

    return nova


def swift_login(project_name):
    toml_config = load_toml_config()

    swift_conn = swiftclient.Connection(
        authurl=toml_config['swift']['SWIFT_AUTH_URL'],
        user=toml_config['swift']['SWIFT_USERNAME'],
        key=toml_config['swift']['SWIFT_PASSWORD'],
        os_options={'user_domain_name': 'Default', 'project_domain_name': 'Default', 'project_name': project_name},
        auth_version=toml_config['swift']['SWIFT_AUTH_VERSION']
    )

    return swift_conn
