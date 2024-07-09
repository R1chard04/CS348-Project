WITH new_recipe AS (
    INSERT INTO Recipes (recipe_name, rdescription, ringredients, rserving_size, rservings, rsteps)
    VALUES ('Bacon Wrapped Chicken', 'When regular chicken just wont cut it', '{"chicken breast", "bacon"}', 200, 2, 'Wrap chicken breast with bacon and bake.')
	returning rId
)
INSERT INTO IngredientsInRecipe (recipeId, iname, unit_of_measure, quantity)
VALUES 
    ((SELECT rId FROM new_recipe), 'chicken breast', 'grams', 300),
    ((SELECT rId FROM new_recipe), 'bacon', 'grams', 100)

SELECT * FROM Recipes WHERE recipe_name = 'Bacon Wrapped Chicken';