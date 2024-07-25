from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from flask_caching import Cache
import redis

import json
import urllib.parse
from fancy_features import bmi_table, dri_table, nutrient_data, recipe_data, recipe_healthy
from connect import get_cursor
from db_queries.feature_queries import getRecipeById, getRecipeByName, getSearchByName, getAllRecipes, r6_get, r7_get, r8_get, r9_price_get, r9_protein_content_get, r10_get


app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Cache configuration
app.config['CACHE_TYPE'] = 'redis'
app.config['CACHE_REDIS_HOST'] = 'localhost'
app.config['CACHE_REDIS_PORT'] = '6379'
app.config['CACHE_REDIS_DB'] = '0'
app.config['CACHE_REDIS_URL'] = 'redis://localhost:6379/0'
cache = Cache(app)

# PostgreSQL connection
(conn, cur) = get_cursor()

@app.route('/', methods=['GET'])
@cross_origin()
@cache.cached(timeout=50)
def getEveryRecipe():
    cacheKey = 'allrecipes'
    cachedData = cache.get(cacheKey)
    if cachedData:
        print("cache hit")
        return jsonify({'msg': cachedData})
    cur.execute(getAllRecipes())
    rows = cur.fetchall()
    cache.set(cacheKey, rows)
    return jsonify({'msg': rows})

# Get recipe by ID
@app.route('/getrecipe/<id>', methods=['GET'])
@cross_origin()
@cache.cached(timeout=50)
def getRecipe(id):
    if not id.isnumeric():
        return jsonify({
            'msg': [],
            'error': 'Invalid recipe ID'})
    cacheKey = f'recipeid_{id}'
    cachedData = cache.get(cacheKey)
    if cachedData:
        return jsonify({'msg': cachedData})
    cur.execute(getRecipeById(id))
    rows = cur.fetchall()
    cache.set(cacheKey, rows)
    return jsonify({'msg': rows})

# Get recipe by name
@app.route('/getrecipebyname/<name>', methods=['GET'])
@cross_origin()
@cache.cached(timeout=50)
def getRecipeName(name):
    decodedName = urllib.parse.unquote(name)
    cacheKey = f'recipename_{decodedName}'
    cachedData = cache.get(cacheKey)
    if cachedData:
        return jsonify({'msg': cachedData})
    cur.execute(getRecipeByName(decodedName))
    rows = cur.fetchall()
    cache.set(cacheKey, rows)
    return jsonify({'msg': rows})

# Search by (similar) name
@app.route('/searchname/<search>', methods=['GET'])
@cross_origin()
@cache.cached(timeout=50)
def search(search):
    cacheKey = f'searchname_{search}'
    cachedData = cache.get(cacheKey)
    if cachedData:
        return jsonify({'msg': cachedData})
    cur.execute(getSearchByName(search))
    rows = cur.fetchall()
    cache.set(cacheKey, rows)
    return jsonify({'msg': rows})

@app.route('/getallingredients/', methods=['GET'])
@cross_origin()
@cache.cached(timeout=50)
def getAllIngredients():
    cacheKey = 'allingredients'
    cachedData = cache.get(cacheKey)
    if cachedData:
        return jsonify({'msg': cachedData})
    cur.execute("SELECT DISTINCT iname FROM ingredients;")
    rows = cur.fetchall()
    cache.set(cacheKey, rows)
    return jsonify({'msg': rows})

# Feature 6: Get recipes by ingredients
@app.route('/getrecipesbyingredients/<ingredients>', methods=['GET'])
@cross_origin()
@cache.cached(timeout=50)
def getRecipesByIngredients(ingredients):
    decodedIngredients = urllib.parse.unquote(ingredients).split(',')
    cacheKey = f'recipesbyingredients_{ingredients}'
    cachedData = cache.get(cacheKey)
    if cachedData:
        return jsonify({'msg': cachedData})
    cur.execute(r6_get(decodedIngredients))
    rows = cur.fetchall()
    cache.set(cacheKey, rows)
    return jsonify({'msg': rows})

# Feature 7: Get macros of recipe id
@app.route('/getmacrosbyid/<id>', methods=['GET'])
@cross_origin()
@cache.cached(timeout=50)
def getMacrosById(id):
    if not id.isnumeric():
        return jsonify({
            'msg': [],
            'error': 'Invalid recipe ID'})
    cacheKey = f'macrosbyid_{id}'
    cachedData = cache.get(cacheKey)
    if cachedData:
        return jsonify({'msg': cachedData})
    cur.execute(r7_get(id))
    rows = cur.fetchall()
    cache.set(cacheKey, rows)
    return jsonify({'msg': rows})

# Feature 8: price calculation of recipe id
@app.route('/getpricebyid/<id>', methods=['GET'])
@cross_origin()
@cache.cached(timeout=50)
def getPriceById(id):
    if not id.isnumeric():
        return jsonify({
            'msg': [],
            'error': 'Invalid recipe ID'})
    cacheKey = f'pricebyid_{id}'
    cachedData = cache.get(cacheKey)
    if cachedData:
        return jsonify({'msg': cachedData})
    cur.execute(r8_get(int(id)))
    rows = cur.fetchall()
    cache.set(cacheKey, rows)
    return jsonify({'msg': rows})

# Feature 9a: cheapest recipes
@app.route('/getleastexpensive/', methods=['GET'])
@cross_origin()
@cache.cached(timeout=50)
def getMostExpensive():
    cacheKey = 'leastexpensive'
    cachedData = cache.get(cacheKey)
    if cachedData:
        return jsonify({'msg': cachedData})
    cur.execute(r9_price_get())
    rows = cur.fetchall()
    cache.set(cacheKey, rows)
    return jsonify({'msg': rows})

# Feature 9: recipes with most protein
@app.route('/getmostprotein/', methods=['GET'])
@cross_origin()
@cache.cached(timeout=50)
def getMostProtein():
    cacheKey = 'mostprotein'
    cachedData = cache.get(cacheKey)
    if cachedData:
        return jsonify({'msg': cachedData})
    cur.execute(r9_protein_content_get())
    rows = cur.fetchall()
    cache.set(cacheKey, rows)
    return jsonify({'msg': rows})

# Feature 10: Get useful recipe info
@app.route('/getgeneralrecipeinfo/<id>', methods=['GET'])
@cross_origin()
@cache.cached(timeout=50)
def getGeneralRecipeInfo(id):
    if not id.isnumeric():
        return jsonify({
            'msg': [],
            'error': 'Invalid recipe ID'})
    cacheKey = f'generalrecipeinfo_{id}'
    cachedData = cache.get(cacheKey)
    if cachedData:
        return jsonify({'msg': cachedData})
    cur.execute(r10_get(id))
    rows = cur.fetchall()
    cache.set(cacheKey, rows)
    return jsonify({'msg': rows})

@app.route('/getbmi/<weight>/<height>', methods=['GET'])
@cross_origin()
def getBMI(weight, height):
    bmi = bmi_table.calculate_bmi(int(weight), int(height))
    print(bmi)
    return jsonify({'msg': bmi})

@app.route('/getbmiplot/', methods=['GET'])
@cross_origin()
def getBMIPlot():
    bmiMap = bmi_table.getBmiTupleIndexes()
    print('bmiIndexes:', bmiMap)
    return jsonify({'msg': bmiMap})

# @app.route('/getingredientgraph/<iname>', methods=['GET'])
# @cross_origin()
# def getIngredintGraph(iname):
#     ingredientPlot = nutrient_data.ingredient_graph(iname)
#     # ====================== needs work? 
#     return jsonify({'ingredientPlot': ingredientPlot})

# @app.route('/getnutritioninfo/<recipe_id>', methods=['GET'])
# @cross_origin()
# def getNutritionInfo(recipe_id):
#     nutritionPlot = recipe_healthy.plot_nutritional_info(recipe_id)
#     # ====================== needs work? 
#     return jsonify({'nutritionPlot': nutritionPlot})

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

