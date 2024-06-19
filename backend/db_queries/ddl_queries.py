# DATA DEFINITION LANGUAGE QUERIES

createRecipeTable ="""
    CREATE TABLE Recipes (
        id INT NOT NULL,
        recipe_name VARCHAR(50) NOT NULL,
        description VARCHAR(80),
        ingredients TEXT [] NOT NULL,
        serving_size INT NOT NULL,
        steps TEXT [] NOT NULL,
        PRIMARY KEY (id)
    );
    """
createIngredientTable = """
    CREATE TABLE Nutrition (
        nutrition_name VARCHAR(30) NOT NULL,
        protein INT,
        carb INT,
        fat INT,
        sugar INT,
        sodium INT,
        vitamin_d INT,
        vitamin_e INT,
        PRIMARY KEY (nutrition_name)
    );
"""
createIngredientInRecipeTable = """
    CREATE TABLE Food_Prices (
        food_name VARCHAR(30) NOT NULL,
        price INT NOT NULL,
        PRIMARY KEY (food_name)
    );
    """

