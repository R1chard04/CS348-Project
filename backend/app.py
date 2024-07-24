from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import json
import urllib.parse

from connect import get_cursor
from db_queries.feature_queries import getRecipeById, getRecipeByName, getSearchByName, getAllRecipes, r6_get, r7_get, r8_get, r9_price_get, r9_protein_content_get

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

(conn, cur) = get_cursor()

@app.route('/', methods=['GET'])
@cross_origin()
def hello():
    cur.execute(getAllRecipes())
    rows = cur.fetchall()
    print(rows)
    return jsonify({'msg': rows})

# Get recipe by ID
@app.route('/getrecipe/<id>', methods=['GET'])
@cross_origin()
def getRecipe(id):
    if not id.isnumeric():
        return jsonify({
            'msg': [],
            'error': 'Invalid recipe ID'})
    cur.execute(getRecipeById(id))
    rows = cur.fetchall()
    print(rows)
    return jsonify({'msg': rows})

# Get recipe by name
@app.route('/getrecipebyname/<name>', methods=['GET'])
@cross_origin()
def getRecipeName(name):
    decodedName = urllib.parse.unquote(name)
    cur.execute(getRecipeByName(decodedName))
    rows = cur.fetchall()
    print(rows)
    return jsonify({'msg': rows})

# Search by (similar) name
@app.route('/searchname/<search>', methods=['GET'])
@cross_origin()
def search(search):
    cur.execute(getSearchByName(search))
    rows = cur.fetchall()
    return jsonify({'msg': rows})

@app.route('/getallingredients/', methods=['GET'])
@cross_origin()
def getAllIngredients():
    cur.execute("SELECT DISTINCT iname FROM ingredients;")
    rows = cur.fetchall()
    return jsonify({'msg': rows})

# Feature 6: Get recipes by ingredients
@app.route('/getrecipesbyingredients/<ingredients>', methods=['GET'])
@cross_origin()
def getRecipesByIngredients(ingredients):
    decodedIngredients = urllib.parse.unquote(ingredients).split(',')
    cur.execute(r6_get(decodedIngredients))
    rows = cur.fetchall()
    print(rows)
    return jsonify({'msg': rows})

# Feature 7: Get macros of recipe id
@app.route('/getmacrosbyid/<id>', methods=['GET'])
@cross_origin()
def getMacrosById(id):
    if not id.isnumeric():
        return jsonify({
            'msg': [],
            'error': 'Invalid recipe ID'})
    cur.execute(r7_get(id))
    rows = cur.fetchall()
    print(rows)
    return jsonify({'msg': rows})

# Feature 8: price calculation of recipe id
@app.route('/getpricebyid/<id>', methods=['GET'])
@cross_origin()
def getPriceById(id):
    if not id.isnumeric():
        return jsonify({
            'msg': [],
            'error': 'Invalid recipe ID'})
    cur.execute(r7_get(id))
    rows = cur.fetchall()
    print(rows)
    return jsonify({'msg': rows})

# Feature 9a: cheapest recipes
@app.route('/getmostexpensive/', methods=['GET'])
@cross_origin()
def getMostExpensive():
    cur.execute(r9_price_get())
    rows = cur.fetchall()
    print(rows)
    return jsonify({'msg': rows})

# Feature 9: recipes with most protein
@app.route('/getmostprotein/', methods=['GET'])
@cross_origin()
def getMostProtein():
    cur.execute(r9_protein_content_get())
    rows = cur.fetchall()
    print(rows)
    return jsonify({'msg': rows})

# Feature 10: Get useful recipe info
@app.route('/getgeneralrecipeinfo/<id>', methods=['GET'])
@cross_origin()
def getGeneralRecipeInfo(id):
    if not id.isnumeric():
        return jsonify({
            'msg': [],
            'error': 'Invalid recipe ID'})
    cur.execute(getRecipeById(id))
    rows = cur.fetchall()
    print(rows)
    return jsonify({'msg': rows})

# Feature 6: Get recipes by ingredients
# @app.route('/addrecipe/<name>/<servings>/<servingSize>/<steps>/<ingredients>', methods=['POST'])
# @cross_origin()
# def getRecipesByIngredients(ingredients):
#     decodedIngredients = urllib.parse.unquote(ingredients).split(',')
#     cur.execute(r6_get(decodedIngredients))
#     rows = cur.fetchall()
#     print(rows)
#     return jsonify({'msg': rows})

if __name__ == '__main__':
    app.run()

