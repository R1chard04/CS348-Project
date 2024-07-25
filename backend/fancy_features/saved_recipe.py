def insertIntoSavedRecipes(recipeId):
    return f"""
    INSERT INTO SavedRecipes (recipeId)
    VALUES ('{recipeId}');
    """

def viewAllSavedRecipes():
    return"""
    SELECT r.rID, r.recipe_name FROM Recipes r JOIN SavedRecipes sr ON r.rID = sr.recipeId;
    """

def getSingleSavedRecipe(recipeId):
    """
    SELECT r.rID, r.rdescription, r.recipe_name, r.rsteps, r.rserving_size, r.rservings, (SUM((i.protein * uc.conversion_factor / 100) * ri.quantity) * 4 + 
            SUM((i.carb * uc.conversion_factor / 100) * ri.quantity) * 4 + 
            SUM((i.fat * uc.conversion_factor / 100) * ri.quantity) * 9) AS calories,
            SUM((i.protein * uc.conversion_factor / 100) * ri.quantity) AS total_protein, 
            SUM((i.carb * uc.conversion_factor / 100) * ri.quantity) AS total_carbs, 
            SUM((i.fat * uc.conversion_factor / 100) * ri.quantity) AS total_fat
    FROM Recipes r 
    JOIN IngredientsInRecipe ri ON r.rID = ri.recipeId 
    JOIN Ingredients i ON i.iname = ri.iname
    JOIN UnitConversions uc ON ri.unit_of_measure = uc.unit
    JOIN SavedRecipes sr ON r.rID = sr.recipeId
    WHERE r.rID = {recipeId}
    GROUP BY r.rID, r.recipe_name; 
    """