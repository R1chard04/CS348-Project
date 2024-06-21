# DATA DEFINITION LANGUAGE QUERIES

createRecipeTable = """
    CREATE TABLE Recipes (
        id INT NOT NULL,
        recipe_name VARCHAR(100) NOT NULL,
        rdescription VARCHAR(200),
        ringredients TEXT [] NOT NULL,
        rserving_size INT NOT NULL,
        rservings INT NOT NULL,
        rsteps VARCHAR(800) NOT NULL,
        PRIMARY KEY (rId)
    );
"""
createSearchTermsTable = """
    CREATE TABLE RecipeSearchTerms (
        rId INT NOT NULL,
        terms VARCHAR(20) NOT NULL,
        PRIMARY KEY (rId, terms),
        FOREIGN KEY (rId) REFERENCES Recipes(id)
    );
"""
createIngredientTable = """
        CREATE TABLE Ingredients (
        iname VARCHAR(50) NOT NULL,
        protein FLOAT,
        carb FLOAT,
        fat FLOAT,
        sugar FLOAT,
        sodium FLOAT,
        vitamin_d FLOAT,
        vitamin_e FLOAT,
        PRIMARY KEY (iname)
    );
"""
createIngredientInRecipeTable = """
    CREATE TABLE Prices (
        pname VARCHAR(30) NOT NULL,
        pquantity INT NOT NULL,
        pmetric INT NOT NULL,
        price FLOAT NOT NULL,
        PRIMARY KEY (food_name)
    );
"""

createIngredientCostsRelation = """
    CREATE TABLE IngredientCosts (
        iname VARCHAR(50) NOT NULL,
        pname FLOAT NOT NULL,
        PRIMARY KEY (iname, pname),
        FOREIGN KEY (iname) REFERENCES Ingredients(iname),
        FOREIGN KEY (pname) REFERENCES Prices(pname)
    );
"""

createIngredientsInRecipeRelation = """
    CREATE TABLE IngredientsInRecipe (
        rId INT NOT NULL,
        iname VARCHAR(50) NOT NULL,
        unit_of_measure VARCHAR(15) NOT NULL,
        quantity FLOAT NOT NULL,
        PRIMARY KEY (recipeId, iname),
        FOREIGN KEY (recipeId) REFERENCES Recipes(id),
        FOREIGN KEY (iname) REFERENCES Ingredients(iname)
    );
"""

