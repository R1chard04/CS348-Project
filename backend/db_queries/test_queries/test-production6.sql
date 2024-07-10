WITH new_recipe AS (
    INSERT INTO Recipes (recipe_name, rdescription, ringredients, rserving_size, rservings, rsteps)
    VALUES ('Baked Potato', 'Hot and tasty winter treat', 
    '{"potato", "butter"}', 400, 2, 'Cut open potato. Load with butter. Bake.')
	returning rId
)
INSERT INTO IngredientsInRecipe (recipeId, iname, unit_of_measure, quantity)
VALUES 
    ((SELECT rId FROM new_recipe), 'potato', 'grams', 400),
    ((SELECT rId FROM new_recipe), 'butter', 'grams', 100);

SELECT * FROM Recipes JOIN ingredientsinrecipe ON rId = recipeid WHERE rID = SELECT rID FROM new_recipe;