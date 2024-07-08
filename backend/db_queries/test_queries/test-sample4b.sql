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
ORDER BY cost;