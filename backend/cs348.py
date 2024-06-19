import psycopg2
import csv

conn = psycopg2.connect("dbname=test user=postgres")
cur = conn.cursor()
units = ["cups", "cup", "tablespoon", "teaspoon", "g", "mL", "L"]
#cur.execute("CREATE TABLE test (id serial PRIMARY KEY, num integer, data varchar);")
with open('recipe.csv', newline='') as recipes:
    recipe_dataset = csv.reader(recipes)
    for row in recipe_dataset:
        serving_size = row[serving_size] 
        ingredients = row[ingredients]
        ingredient_with_amount = row[ingredients_raw_str]
        number_of_servings = row[servings]
        name = row[name]
        tags = row[tags] + row[search_terms]
        cur.execute("INSERT INTO RECIPES VALUES (name, serving_size, number_of_servings, tags)")
        for ingredient in ingredients:
            for amount in ingredient_with_amount:
                raw_ingredient_string = amount.split(" ")
                for i in raw_ingredient_string:
                    if ingredient.lower() == i.lower():
                        unit_of_measurement = ""
                        quantity = "" 
                        if i.isdigit():
                            quantity = i
                        if i.lower() in units:
                            unit_of_measurement = i
                        # we need to change it from name to rID, so we need to probably just get it through the recipe table
                        # same thing for ingredient
                        cur.execute("INSERT INTO INGREDIENT_IN_RECIPE VALUES (name, ingredient, unit_of_measurement, quantity)")
                        break
conn.commit()
cur.close()
conn.close()
