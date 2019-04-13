import pandas as pd
import numpy as np
from flask import Flask, render_template, redirect 
import sqlalchemy
from flask import jsonify
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy
import os
import sqlite3
from flask_cors import CORS, cross_origin
app = Flask(__name__)

cors = CORS(app, resources={r"*": {"origins": "*"}})

#################################################
# Database Setup
#################################################

# conn = sqlite3.connect('db/audit2.sqlite') c = conn.cursor()
# app = Flask(__name__)

# @app.route('/') def index():    
#  c.execute('SELECT * FROM audit_id')    
#  return render_template('index.html', rows = c.fetchall())


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/audit2.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route("/data_table")
def data_table():
  return render_template('data_table.html')
# this makes shit super wonky. don't do it!

# @app.route("/final_pie.html")
# def final_pie():
#   return render_template('final_pie.html')

@app.route("/goals")
def goals():
  return render_template('goals.html')

@app.route('/pie_chart')
def pie_chart():
    return render_template('pie_chart.html')

@app.route('/pie_chart2')
def pie_chart2():
    return render_template('pie_chart2.html')

@app.route("/json_endpoint")
def json_data():
    """Return the homepage."""
    data = db.engine.execute("SELECT * FROM audit_type ")
    cols = data.keys()
    rows = data.fetchall()
    to_return = []
    for r in rows:
        to_return.append(
          dict(zip(cols, r))  
        )
    return jsonify(to_return)


@app.route('/json/request_channel')
def get_requst_channel():
    """ Returns count of audits by request_channel"""
    data = db.engine.execute("SELECT request_channel, count(*) as audit_count, sum(num_records_reviewed) as total_records FROM audit_type GROUP BY 1 ")
    cols = data.keys()
    rows = data.fetchall()
    for_return = [dict(x) for x in rows]
    return jsonify(for_return)


@app.route('/json/audit_type')
def get_audit_type():
    """ Returns count of audits by request_channel"""
    data = db.engine.execute("SELECT audit_type, count(*) as audit_count, sum(num_records_reviewed) as total_records FROM audit_type GROUP BY 1 ")
    cols = data.keys()
    rows = data.fetchall()
    for_return = [dict(x) for x in rows]
    return jsonify(for_return)


@app.route('/json/audit_team')
def get_audit_team():
    """ Returns count of audits by request_channel"""
    data = db.engine.execute("SELECT audit_team, count(*) as audit_count, sum(num_records_reviewed) as total_records FROM audit_type GROUP BY 1 ")
    cols = data.keys()
    rows = data.fetchall()
    for_return = [dict(x) for x in rows]
    return jsonify(for_return)


@app.route('/json/tool')
def get_tool():
    """ Returns count of audits by request_channel"""
    data = db.engine.execute("SELECT tool, count(*) as audit_count, sum(num_records_reviewed) as total_records FROM audit_type GROUP BY 1 ")
    cols = data.keys()
    rows = data.fetchall()
    for_return = [dict(x) for x in rows]
    return jsonify(for_return)


@app.route('/json/audit_info')
def get_audit_info():
    """ Returns count of audits by request_channel"""
    data = db.engine.execute("SELECT audit_id, received_date, num_records_reviewed FROM audit_type")
    cols = data.keys()
    rows = data.fetchall()
    for_return = [dict(x) for x in rows]
    return jsonify(for_return)



### JSON Example Data ###
# "audit_id": 298,
# "audit_team": "Internal",
# "audit_type": "Data_Extraction",
# "finished_date": "1/10/18",
# "index": 0,
# "num_records_reviewed": 1437,
# "received_date": "1/2/18",
# "request_channel": "Grocery",
# "tool": "Manual"


if __name__ == "__main__":
    app.run(debug=True)
