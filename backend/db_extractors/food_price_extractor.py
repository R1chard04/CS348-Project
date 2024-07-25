import pandas as pd
import re

metrics = ('kilogram', 'millilitre', 'gram', 'litre', 'dozen')
columns = ['food_name', 'food_quantity', 'food_metric', 'price']
usedFoods = set()

def extract_food_prices(conn, cursor, isProdDatabase=False):
    df = pd.read_csv('db_extractors/18100245.csv')
    
    for i, row in df.iterrows():
        if not isProdDatabase and i % 1000 != 0:
            continue

        # No insert if not in units or if price does not exist
        if row['SCALAR_FACTOR'] != 'units' or row['VALUE'] == 'NaN':
            continue
        print('row:', row['Products'])
        
        insertRow = []
        
        # Insert food_name
        foodProductArr = row['Products'].split(',')
        if (len(foodProductArr) != 2) or (foodProductArr[0] in usedFoods):
            continue
        insertRow.append(foodProductArr[0])
        
        # Insert food_quantity
        foodQuantity = re.search(r'\d+\.?\d*|\.\d+', foodProductArr[1])
        insertRow.append(float(foodQuantity.group(0))) if foodQuantity else insertRow.append(1)
        
        # Insert food_metric
        foodMetric = foodProductArr[1].strip().split(' ')[-1]
        if foodMetric[-1] == 's':
            foodMetric = foodMetric[:-1]
        insertRow.append(foodMetric) if foodMetric in metrics else insertRow.append('unit')
        
        # Insert price
        insertRow.append(row['VALUE'])

        # Insert into table
        insert_query = '''
            INSERT INTO Prices (pname, pquantity, pmetric, price)
            VALUES (%s, %s, %s, %s)
            '''
        cursor.execute(insert_query, tuple(insertRow))
        conn.commit()

        # Add to global set to prevent (key) duplicates
        usedFoods.add(foodProductArr[0])

