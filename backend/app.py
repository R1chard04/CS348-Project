from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import json
import urllib.parse

from connect import get_cursor
from db_queries.feature_queries import getRecipeById, getRecipeByName, getSearchByName

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

(conn, cur) = get_cursor()

@app.route('/', methods=['GET'])
@cross_origin()
def hello():
    response = jsonify({'msg': 'data'})
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

# Get recipe by ID
@app.route('/getrecipe/<id>', methods=['GET'])
@cross_origin()
def getRecipe(id):
    cur.execute(getRecipeById(id))
    rows = cur.fetchall()
    return jsonify({'msg': rows})

# Get recipe by name
@app.route('/getrecipebyname/<name>', methods=['GET'])
@cross_origin()
def getRecipeName(name):
    decodedName = urllib.parse.unquote(name)
    cur.execute(getRecipeByName(decodedName))
    rows = cur.fetchall()
    return jsonify({'msg': rows})

# Search by (similar) name
@app.route('/searchname/<search>', methods=['GET'])
@cross_origin()
def search(search):
    cur.execute(getSearchByName(search))
    rows = cur.fetchall()
    return jsonify({'msg': rows})


if __name__ == '__main__':
    app.run()

