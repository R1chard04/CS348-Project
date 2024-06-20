# DATA DEFINITION LANGUAGE QUERIES

createRecipeTable ="""
    CREATE TABLE Recipes (
        id INT NOT NULL,
        recipe_name VARCHAR(50) NOT NULL,
        description VARCHAR(80),
        ingredients TEXT [] NOT NULL,
        serving_size INT NOT NULL,
        servings INT NOT NULL,
        steps TEXT [] NOT NULL,
        PRIMARY KEY (id)
    );
"""
createSearchTermsTable = """
    CREATE TABLE Search_Terms (
        recipeId INT NOT NULL,
        terms TEXT [] NOT NULL,
        PRIMARY KEY (recipeId, terms)
        FOREIGN KEY (recipeId) REFERENCES Recipes(id)
    );
"""
createIngredientTable = """
        CREATE TABLE Nutrition (
        nutrition_name VARCHAR(50) NOT NULL,
        protein FLOAT,
        carb FLOAT,
        fat FLOAT,
        sugar FLOAT,
        sodium FLOAT,
        vitamin_d FLOAT,
        vitamin_e FLOAT,
        PRIMARY KEY (nutrition_name)
    );
"""
createIngredientInRecipeTable = """
    CREATE TABLE Food_Prices (
        food_name VARCHAR(30) NOT NULL,
        food_quantity INT NOT NULL,
        food_metric INT NOT NULL,
        price INT NOT NULL,
        PRIMARY KEY (food_name)
    );
"""

