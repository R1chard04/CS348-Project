# ALL FEATURE QUERIES: R6 - R9

# Intelligently extract database recipes to determine which ones can be made provided a list of ingredients that a user has. If no recipes match all ingredients, the user can choose to list recipes that include as many of them as possible.
def r6_get(userIngredients):
    ingredients_query = " UNION SELECT '".join(userIngredients) + "'"
    
    return """
        WITH input AS 
        (
        SELECT '{userIngredients[0]}' AS ingredient 
        UNION SELECT '{ingredients_query}'
        )
        SELECT DISTINCT r.rID AS rID, r.recipe_name AS name, COUNT(*) AS cnt
        FROM Recipes r 
        JOIN IngredientsInRecipe ir ON r.rID = ir.recipeId 
        JOIN Ingredients i ON i.iname = ir.iname 
        LEFT JOIN input inp ON inp.ingredient = i.iname
        WHERE inp.ingredient IS NOT NULL
        GROUP BY r.rID, r.recipe_name
        ORDER BY cnt DESC;
    """

# Total nutritional information of a recipe. For example, calorie count, grams of protein, carbohydrates, and fats, along with other facts seen on nutrition labels.
def r7_get(recipeId):
    return """
        SELECT 
            r.rID AS recipe_id, 
            r.recipe_name AS recipe_name, 
            (SUM((i.protein * uc.conversion_factor / 100) * ri.quantity) * 4 + 
            SUM((i.carb * uc.conversion_factor / 100) * ri.quantity) * 4 + 
            SUM((i.fat * uc.conversion_factor / 100) * ri.quantity) * 9) AS calories,
            SUM((i.protein * uc.conversion_factor / 100) * ri.quantity) AS total_protein, 
            SUM((i.carb * uc.conversion_factor / 100) * ri.quantity) AS total_carbs, 
            SUM((i.fat * uc.conversion_factor / 100) * ri.quantity) AS total_fat
        FROM Recipes r 
        JOIN IngredientsInRecipe ri ON r.rID = ri.recipeId 
        JOIN Ingredients i ON i.iname = ri.iname
        JOIN UnitConversions uc ON ri.unit_of_measure = uc.unit
        WHERE r.rID = ${recipeID}
        GROUP BY r.rID, r.recipe_name;
        """

# Price calculations per serving of the recipe, based on current market prices of each food.
def r8_get(recipeId):
    return """
        SELECT r.rID AS rID, r.recipe_name AS name, 
            ROUND(
                CAST(
                    (
                        SELECT SUM(p.price * ri.quantity / p.pquantity)
                        FROM IngredientsInRecipe ri 
                        JOIN Ingredients ingredient ON ingredient.iname = ri.iname
                        JOIN Prices p ON ingredient.iname = p.pname
                        WHERE ri.recipeId = r.rID
                    ) AS NUMERIC
                ), 2
            ) AS cost
        FROM Recipes r
        WHERE r.rID = ${recipeId}
        GROUP BY r.rID, r.recipe_name;
        """

# Filter by most and least expensive and nutritional recipes based on user preferences and ingredient availability to the user. 
def r9_price_get(recipeId): 
    return """
        SELECT r.rID AS rID, r.recipe_name AS name, 
            ROUND(
                CAST(
                    (
                        SELECT SUM(p.price * ri.quantity / p.pquantity)
                        FROM IngredientsInRecipe ri 
                        JOIN Ingredients ingredient ON ingredient.iname = ri.iname
                        JOIN Prices p ON ingredient.iname = p.pname
                        WHERE ri.recipeId = r.rID
                    ) AS NUMERIC
                ), 2
            ) AS cost
        FROM Recipes r
        WHERE r.rID = ${recipeId}
        GROUP BY r.rID, r.recipe_name,
        ORDER BY cost;
        """

def r9_protein_content_get(recipeId): 
    return """
        SELECT 
            r.rID AS recipe_id, 
            r.recipe_name AS recipe_name, 
            (SUM((i.protein * uc.conversion_factor / 100) * ri.quantity) * 4 + 
            SUM((i.carb * uc.conversion_factor / 100) * ri.quantity) * 4 + 
            SUM((i.fat * uc.conversion_factor / 100) * ri.quantity) * 9) AS calories,
            SUM((i.protein * uc.conversion_factor / 100) * ri.quantity) AS total_protein, 
            SUM((i.carb * uc.conversion_factor / 100) * ri.quantity) AS total_carbs, 
            SUM((i.fat * uc.conversion_factor / 100) * ri.quantity) AS total_fat
        FROM Recipes r 
        JOIN IngredientsInRecipe ri ON r.rID = ri.recipeId 
        JOIN Ingredients i ON i.iname = ri.iname
        JOIN UnitConversions uc ON ri.unit_of_measure = uc.unit
        GROUP BY r.rID, r.recipe_name
        ORDER BY total_protein DESC;
        """

def getAllRecipes():
    return """
        SELECT * FROM recipes;
        """

def getRecipeById(recipeId):
    return f"""
        SELECT * FROM Recipes WHERE rid = {recipeId};
        """

def getRecipeByName(recipeName):
    return f"""
        SELECT * FROM recipes WHERE recipe_name LIKE '%{recipeName}%';
        """

def getSearchByName(search):
    return f"""
        SELECT * FROM recipes WHERE recipe_name LIKE '%{search}%';
        """