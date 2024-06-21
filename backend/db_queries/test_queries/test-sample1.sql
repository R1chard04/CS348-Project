SELECT DISTINCT r.rID AS rID, r.name AS name FROM Recipes r 
JOIN ingredient_in_Recipe ir ON r.rID = ir.rID 
JOIN Ingredients i ON i.iID = ir.iID
WHERE i.iname = "Ground Beef" OR i.iname = "Onion" OR i.iname = "Garlic" OR i.iname = "Tomato";
