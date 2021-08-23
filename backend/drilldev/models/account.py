import os
from drilldev.app import app
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)
class Account(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	