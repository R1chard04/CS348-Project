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
WHERE r.rID = 1
GROUP BY r.rID, r.recipe_name;