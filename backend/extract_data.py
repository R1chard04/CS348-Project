from connect import get_cursor
from db_extractors.food_price_extractor import extract_food_prices
from db_extractors.food_nutrition_extractor import extract_food_nutrition
from db_extractors.food_recipe_extractor import extract_food_recipes

isProdDatabase = False # Set to True if using production database; otherwise False

def extractDataIntoDatabase():
    (conn, cur) = get_cursor()

    extract_food_prices(conn, cur, isProdDatabase)
    extract_food_nutrition(conn, cur, isProdDatabase)
    extract_food_recipes(conn, cur, isProdDatabase)
    
    cur.close()
    conn.close()


extractDataIntoDatabase()
