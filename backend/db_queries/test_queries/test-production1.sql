WITH input AS 
(
    SELECT 'egg' AS ingredient
)
SELECT DISTINCT r.rID AS rID, r.recipe_name AS name, COUNT(*) AS cnt
FROM Recipes r 
JOIN IngredientsInRecipe ir ON r.rID = ir.recipeId 
JOIN Ingredients i ON i.iname = ir.iname 
LEFT JOIN input inp ON inp.ingredient = i.iname
WHERE inp.ingredient IS NOT NULL
GROUP BY r.RID, r.recipe_name
ORDER BY cnt DESC;