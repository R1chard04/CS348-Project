from connect import get_cursor
from db_extractors.food_price_extractor import extract_food_prices
from db_extractors.food_nutrition_extractor import extract_food_nutrition

def richardTest():
    (conn, cur) = get_cursor()
    # cur.execute("SELECT * FROM recipes")
    # rows = cur.fetchall()

    # extract_food_prices(conn, cur)
    extract_food_nutrition(conn, cur)

    
    cur.close()
    conn.close()


richardTest()
