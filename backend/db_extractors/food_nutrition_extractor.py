import pandas as pd
import re

usedFoods = set()

def extract_food_nutrition(conn, cursor):
    df = pd.read_csv('db_extractors/NutritionTable.csv')

    for _, row in df.iterrows():
        print('row:', row['alim_nom_eng'])

        insertRow = []

        # Insert food name
        name = row['alim_nom_eng'].split(',')[0][0:50]
        if name in usedFoods:
            continue
        insertRow.append(name)

        # Insert protein
        insertRow.append(str(row['Protein (g/100g)']).replace(',', '.').replace('<', '').strip())

        # Insert carb
        insertRow.append(str(row['Carbohydrate (g/100g)']).replace(',', '.').replace('<', '').strip())

        # Insert fat
        insertRow.append(str(row['Fat (g/100g)']).replace(',', '.').replace('<', '').strip())

        # Insert sugar
        insertRow.append(str(row['Sugars (g/100g)']).replace(',', '.').replace('<', '').strip())

        # Insert sodium
        insertRow.append(str(row['Sodium (mg/100g)']).replace(',', '.').replace('<', '').strip())

        # Insert vitamin_d
        insertRow.append(str(row['Vitamin D (µg/100g)']).replace(',', '.').replace('<', '').strip())

        # Insert vitamin_e
        insertRow.append(str(row['Vitamin E (mg/100g)']).replace(',', '.').replace('<', '').strip())

        # Remove invalid characters and replace them with NULL
        for i in range(0, len(insertRow)):
            if insertRow[i] == '-' or (i > 0 and any(c.isalpha() for c in insertRow[i])):
                insertRow[i] = None
        
        # Insert into table
        insert_query = '''
            INSERT INTO Nutrition (nutrition_name, protein, carb, fat, sugar, sodium, vitamin_d, vitamin_e)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            '''
        cursor.execute(insert_query, tuple(insertRow))
        conn.commit()

        # Add to global set to prevent (key) duplicates
        usedFoods.add(name)

