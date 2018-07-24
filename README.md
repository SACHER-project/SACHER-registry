# SACHER-registry


FRONTEND installation (React)
1) git clone https://github.com/SACHER-project/SACHER-registry.git
2) cd registrySACHER_frontend
3) sudo apt-get install nodejs npm
4) sudo npm install -g serve
5) sudo npm instal
6) sudo rm -r build/
7) sudo npm run build
8) serve -s build


BACKEND installation (Python Flask)
1) git clone https://github.com/SACHER-project/SACHER-registry.git
2) cd registrySACHER_backend
2) sudo apt install python2.7 python-pip
3) pip install -r requirements.txt
4) export FLASK_APP=app.py
5) comment out #app.run() in app.py
6) python -m flask run --host=0.0.0.0 

