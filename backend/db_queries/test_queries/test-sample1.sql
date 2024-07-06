SELECT DISTINCT r.rID AS rID, r.recipe_name AS name 
FROM Recipes r 
JOIN IngredientsInRecipe ir ON r.rID = ir.recipeId 
JOIN Ingredients i ON i.iname = ir.iname 
WHERE i.iname = 'egg' OR i.iname = 'romaine lettuce';
