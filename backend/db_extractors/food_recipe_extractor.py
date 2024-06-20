import pandas as pd
import re

def extract_food_recipes(conn, cursor):
    df = pd.read_csv('db_extractors/recipes_w_search_terms.csv')
    print('length:', len(df.index))
    
    for index, row in df.iterrows():
        if index % 5 != 0:
            continue
        if index % 10000 == 0:
            print('# of inserted rows:', index/5)

        insertRow = []

        # Insert id
        insertRow.append(row['id'])
        
        # Insert recipe_name
        insertRow.append(row['name'][0:100])
        
        # Insert description
        insertRow.append(row['description'][0:200]) if row['description'] and type(row['description']) == str else insertRow.append(None)

        # Insert ingredients
        ingredients = re.sub(r'[\'\[\]]', '', row['ingredients']).split(',')
        insertRow.append(ingredients)

        # Insert serving_size
        numGrams = re.search(r'\((\d+)\s*g\)', row['serving_size']).group(1)
        insertRow.append(numGrams)

        # Insert servings
        insertRow.append(row['servings'])

        # Insert steps
        insertRow.append(row['steps'][0:800])

        # Insert into table
        insert_query_recipe = '''
            INSERT INTO Recipes (id, recipe_name, description, ingredients, serving_size, servings, steps)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            '''
        cursor.execute(insert_query_recipe, tuple(insertRow))
        conn.commit()

        # Insert search terms
        searchTerms = re.sub(r'[\' {}]', '', row['search_terms']).split(',')
        for term in searchTerms:
            insert_query_search = '''
                INSERT INTO Search_Terms (recipeId, terms)
                VALUES (%s, %s)
                '''
            cursor.execute(insert_query_search, (row['id'], term))
            conn.commit()
