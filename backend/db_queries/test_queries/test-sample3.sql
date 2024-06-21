SELECT r.rID AS rID, r.name AS name, 
    (
        SELECT SUM(p.price * ri.quantity / p.pquantity)
        FROM IngredientsInRecipe ri 
        JOIN ingredients ingredient ON ingredient.iID = ri.iID
        JOIN IngredientCosts p ON ingredient.iname = p.pname
        WHERE ri.rID = r.rID
    ) AS cost
FROM Recipes r
WHERE r.rID = 'Egg'
GROUP BY r.rID, r.name;

