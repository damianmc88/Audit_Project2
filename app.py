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

app = Flask(__name__)

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

# Save references to each table
# Samples_Metadata = Base.classes.sample_metadata
# Samples = Base.classes.samples

@app.route('/')
def index():
    return render_template('index.html')

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
    data = db.engine.execute("SELECT request_channel, count(*) as requests FROM audit_type GROUP BY 1 ")
    cols = data.keys()
    rows = data.fetchall()
    for_return = [dict(x) for x in rows]
    return jsonify(for_return)



# @app.route("/names")
# def names():
#     """Return a list of sample names."""

#     # Use Pandas to perform the sql query
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Return a list of the column names (sample names)
#     return jsonify(list(df.columns)[2:])


# @app.route("/metadata/<sample>")
# def sample_metadata(sample):
#     """Return the MetaData for a given sample."""
#     sel = [
#         Samples_Metadata.sample,
#         Samples_Metadata.ETHNICITY,
#         Samples_Metadata.GENDER,
#         Samples_Metadata.AGE,
#         Samples_Metadata.LOCATION,
#         Samples_Metadata.BBTYPE,
#         Samples_Metadata.WFREQ,
#     ]

#     results = db.session.query(*sel).filter(Samples_Metadata.sample == sample).all()

#     # Create a dictionary entry for each row of metadata information
#     sample_metadata = {}
#     for result in results:
#         sample_metadata["sample"] = result[0]
#         sample_metadata["ETHNICITY"] = result[1]
#         sample_metadata["GENDER"] = result[2]
#         sample_metadata["AGE"] = result[3]
#         sample_metadata["LOCATION"] = result[4]
#         sample_metadata["BBTYPE"] = result[5]
#         sample_metadata["WFREQ"] = result[6]

#     print(sample_metadata)
#     return jsonify(sample_metadata)


# @app.route("/samples/<sample>")
# def samples(sample):
#     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the sample number and
#     # only keep rows with values above 1
#     sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]
#     # Format the data to send as json
#     data = {
#         "otu_ids": sample_data.otu_id.values.tolist(),
#         "sample_values": sample_data[sample].values.tolist(),
#         "otu_labels": sample_data.otu_label.tolist(),
#     }
#     return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
