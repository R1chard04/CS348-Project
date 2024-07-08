import pandas as pd
import matplotlib.pyplot as plt

# param: ingreident iname
# df: pandas dataframe ingredient
def ingredient_graph(param, df):
#     df = pd.read_csv('ingredients.csv')

    ingredient = param
    data = df[df['iname'] == ingredient].iloc[0]
    nutrients = ['protein', 'carb', 'fat', 'sugar', 'sodium', 'vitamin_d', 'vitamin_e']
    values = data[nutrients].values

    plt.figure(figsize=(12, 6))

    plt.bar(nutrients, values, color='skyblue', label='Nutrients')

#     plt.plot(nutrients, values, color='red', marker='o', label='Nutrients')

    plt.xlabel('Nutrients')
    plt.ylabel('Values')
    plt.title(f'Nutritional Content in {ingredient.capitalize()}')
    plt.legend()

    plt.show()