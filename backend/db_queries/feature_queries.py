# ALL FEATURE QUERIES: R6 - R9

# Intelligently extract database recipes to determine which ones can be made provided a list of ingredients that a user has. If no recipes match all ingredients, the user can choose to list recipes that include as many of them as possible.
def r6_get(userIngredients):
    return """
        WITH input AS 
        (
            SELECT 'Ingredient1' AS ingredient 
            UNION SELECT 'Ingredient2' 
            UNION SELECT 'Ingredient4' 
            UNION SELECT 'Ingredient5' 
        ),
        SELECT r.rID AS rID, r.name AS name, COUNT(*) AS cnt, FROM Recipes r 
        JOIN ingredient_in_Recipe ri ON r.rID = ri.rID 
        JOIN ingredients ingredient ON ingredient.iID = ri.iID
        LEFT JOIN input i ON i.ingredient = ingredient.name
        WHERE i.ingredient IS NOT NULL
        GROUP BY r.RID, r.name
        ORDER BY cnt DESC;
        """

# Total nutritional information of a recipe. For example, calorie count, grams of protein, carbohydrates, and fats, along with other facts seen on nutrition labels.
def r7_get(recipeId):
    return """
        SELECT r.rID AS rID, r.name AS name, SUM(i.calories * ri.quantity) AS calories, SUM(i.protein_grams * ri.quantity) AS protein, SUM(i.carbs_grams * ri.quantity) AS carbs, SUM(i.fat_grams * ri.quantity) AS fat
        FROM Recipes r 
        JOIN ingredient_in_Recipe ri ON r.rID = ri.rID 
        JOIN ingredients ingredient ON ingredient.iID = ri.iID
        WHERE r.recipe_id = ${recipeId}
        GROUP BY rID, name;
        """

# Price calculations per serving of the recipe, based on current market prices of each food.
def r8_get(recipeId):
    return """
        SELECT r.rID AS rID, r.name AS name, SUM(p.price * ri.quantity / p.pquantity) AS cost
        FROM Recipes r 
        JOIN IngredientsInRecipe ri ON r.rID = ri.rID 
        JOIN ingredients ingredient ON ingredient.iID = ri.iID
        JOIN IngredientCosts p ON ingredient.iname = p.pname
        WHERE r.rID = INPUT
        GROUP BY rID, name;
        """

# Filter by most and least expensive and nutritional recipes based on user preferences and ingredient availability to the user. 
def r9_price_get(recipeId): 
    return """
        SELECT r.rID AS rID, r.name AS name, SUM(i.price_per_serving * ri.quantity) AS cost
        FROM Recipes r 
        JOIN ingredient_in_Recipe ri ON r.rID = ri.rID 
        JOIN ingredients ingredient ON ingredient.iID = ri.iID
        WHERE r.recipe_id = ${recipeId}
        GROUP BY rID, name
        ORDER BY cost;
        """

def r9_protein_content_get(recipeId): 
    return """
        SELECT r.rID AS rID, r.name AS name, SUM(i.calories * ri.quantity) AS calories, SUM(i.protein_grams * ri.quantity) AS protein, SUM(i.carbs_grams * ri.quantity) AS carbs, SUM(i.fat_grams * ri.quantity) AS fat
        FROM Recipes r 
        JOIN ingredient_in_Recipe ri ON r.rID = ri.rID 
        JOIN ingredients ingredient ON ingredient.iID = ri.iID
        WHERE r.recipe_id = ${recipeId}
        GROUP BY rID, name
        ORDER BY protein;
        """

def getAllRecipes():
    return """
        SELECT * FROM recipes;
        """

def getRecipeById(recipeId):
    return f"""
        SELECT * FROM recipes WHERE rId = {recipeId};
        """

def getRecipeByName(recipeName):
    return f"""
        SELECT * FROM recipes WHERE recipe_name = '{recipeName}';
        """

def getSearchByName(search):
    return f"""
        SELECT * FROM recipes WHERE recipe_name LIKE '%{search}%';
        """