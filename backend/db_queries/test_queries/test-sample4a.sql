SELECT r.rID AS rID, r.name AS name, SUM(i.calories * ri.quantity) AS calories, SUM(i.protein_grams * ri.quantity) AS protein, SUM(i.carbs_grams * ri.quantity) AS carbs, SUM(i.fat_grams * ri.quantity) AS fat
FROM Recipes r 
JOIN IngredientsInRecipe ri ON r.rID = ri.rID 
JOIN ingredients ingredient ON ingredient.iID = ri.iID
WHERE r.recipe_id = INPUT
GROUP BY rID, name
ORDER BY protein;
