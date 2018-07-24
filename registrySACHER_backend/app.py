from flask import Flask
import user
import domain
import storage
import server


app = Flask(__name__)

domain_instance=None;
storage_instance=None;
user_instance=None;
server_instance=None;


if __name__ == '__main__':
    print("MAIN")


def init_instances():

    global domain_instance
    global user_instance
    global storage_instance
    global server_instance

    if domain_instance is None:
        domain_instance= domain.Domain()

    if user_instance is None:
        user_instance = user.User()

    if storage_instance is None:
        storage_instance = storage.Storage()

    if server_instance is None:
        server_instance = server.Server()


@app.before_request
def before_request():
    init_instances()


@app.route('/')
def hello_world():
    return 'Hello World!'

############## DOMAIN #####################################

@app.route('/domains', methods=["GET"])
def domain_list():
    return domain_instance.domain_list()


@app.route("/domain", methods=["POST"])
def add_domain():
    return domain_instance.add_domain()


@app.route("/domain/<id>", methods=["DELETE"])
def delete_domain(id):
    return domain_instance.delete_domain(id)


@app.route("/domain/<id>", methods=["PUT"])
def update_domain(id):
    return domain_instance.update_domain(id)


@app.route('/projects/<domainId>', methods=["GET"])
def project_list(domainId):
    return domain_instance.project_list(domainId)


@app.route('/roleassignment/<domainId>', methods=["GET"])
def role_assignment_list(domainId):
    return domain_instance.role_assignment_list(domainId)

 ############# SERVER #################################


@app.route('/servers', methods=["GET"])
def server_list():
    return server_instance.server_list()

@app.route('/serverpause/<name>', methods=["GET"])
def pause_server(name):
    return server_instance.pause_server(name)

@app.route('/serverresume/<name>', methods=["GET"])
def resume_server(name):
    return server_instance.resume_server(name)


 ############# USER #################################


@app.route("/loginRegistry", methods=["POST"])
def login_user():
    return user_instance.login_user()


@app.route("/users", methods=["GET"])
def user_list():
    return user_instance.user_list()


@app.route("/user", methods=["POST"])
def add_user():
    return user_instance.add_user()


@app.route("/user/<name>", methods=["DELETE"])
def delete_user(name):
    return user_instance.delete_user(name)


@app.route("/user/<name>", methods=["PUT"])
def update_name(name):
    return user_instance.update_user(name)


@app.route("/roleservices", methods=["GET"])
def role_services_list():
    return user_instance.role_services_list()


@app.route("/roleservices/<role>", methods=["GET"])
def role_services(role):
    return user_instance.role_services(role)


############## SWIFT ####################################

@app.route("/containerlist/<project_name>", methods=["GET"])
def container_list(project_name):
    return storage_instance.container_list(project_name)

@app.route("/containercontent/<project_name>/<containerName>/<folder_name>", methods=["GET"])
def container_content(project_name, containerName, folder_name):
    return storage_instance.container_content(project_name, containerName, folder_name)

@app.route("/download/<project_name>/<containerName>/<objectName>", methods=["GET"])
def download_object(project_name, containerName, objectName):
    return storage_instance.download_object(project_name, containerName,objectName)

@app.route('/upload/<project_name>/<containerName>', methods=['POST'])
def upload_object(project_name, containerName):
    return storage_instance.upload_object(project_name, containerName)

@app.route('/containercreate/<project_name>/<containerName>', methods=['PUT'])
def container_create(project_name, containerName):
    return storage_instance.container_create(project_name, containerName)

@app.route('/readenable/<project_name>/<containerName>', methods=['GET'])
def acl_read_enable(project_name, containerName):
    return storage_instance.acl_read_enable(project_name, containerName)

@app.route('/readdisable/<project_name>/<containerName>', methods=['GET'])
def acl_read_disable(project_name, containerName):
    return storage_instance.acl_read_disable(project_name, containerName)

@app.route("/deleteobject/<project_name>/<containerName>/<objectName>", methods=["DELETE"])
def delete_object(project_name, containerName, objectName):
    return storage_instance.delete_object(project_name, containerName, objectName)


####################################################

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    print("CORS CORS--------------------------------")
    return response


app.run()