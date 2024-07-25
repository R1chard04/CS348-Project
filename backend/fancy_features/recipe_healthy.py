import pandas as pd
import matplotlib.pyplot as plt

advice_texts = {
    "Calories_high": "The calorie content is quite high. Consider balancing this meal with low-calorie foods throughout the day.",
    "Calories_low": "The calorie content is low. Make sure you are getting enough calories to meet your daily energy needs.",
    "Protein_high": "This meal is high in protein. Great for muscle building and repair!",
    "Protein_low": "This meal is low in protein. Consider adding more protein-rich foods to your diet.",
    "Carbs_high": "This meal is high in carbohydrates. Ensure you balance this with low-carb meals to avoid excessive intake.",
    "Carbs_low": "The carbohydrate content is low. It's important to get enough carbs for energy.",
    "Fat_high": "This meal is high in fat. Try to limit intake of saturated fats to maintain heart health.",
    "Fat_low": "The fat content is low. Including healthy fats is essential for overall health."
}

def is_healthy(calories, protein, carbs, fat):
    if calories < 600 and protein > 20 and carbs < 70 and fat < 20:
        return True
    return False

def plot_nutritional_info(df, recipe_id):
    if recipe_id in df["Recipe id"].values:
        row = df[df["Recipe id"] == recipe_id].iloc[0]
        recipe_name = row["Recipe name"]
        calories = row["Calories"]
        protein = row["Total protein"]
        carbs = row["Total carbs"]
        fat = row["Total fat"]

        plot_data = row[["Calories", "Total protein", "Total carbs", "Total fat"]]
        
        plt.figure(figsize=(10, 6))
        ax = plot_data.plot(kind='bar', color=['blue', 'green', 'red', 'purple'])
        
        
        row_arr = ["Calories", "Total protein", "Total carbs", "Total fat"]
        plot_data = row[row_arr]
        values = row[row_arr].values
        plt.plot(row_arr, values, color='red', marker='o', label='Nutrients')
        
        
        plt.title(f"Nutritional Content of {recipe_name}", fontsize=14, fontweight='bold')
        plt.xlabel("Nutritional Components", fontsize=12)
        plt.ylabel("Values", fontsize=12)
        plt.xticks(rotation=0, fontsize=10)
        plt.grid(axis='y')

        plt.tight_layout()
        # plt.show()

        print(f"\nHealth Assessment for {recipe_name}:\n")
        if is_healthy(calories, protein, carbs, fat):
            print(f"{recipe_name} is a healthy choice!\n")
        else:
            print(f"{recipe_name} is not a healthy choice based on the following criteria:\n")
            if calories >= 600:
                print(f" - Calories: {calories} (should be less than 600)")
                print(advice_texts["Calories_high"])
            else:
                print(advice_texts["Calories_low"])
            if protein <= 20:
                print(f" - Total protein: {protein}g (should be more than 20g)")
                print(advice_texts["Protein_low"])
            else:
                print(advice_texts["Protein_high"])
            if carbs >= 70:
                print(f" - Total carbs: {carbs}g (should be less than 70g)")
                print(advice_texts["Carbs_high"])
            else:
                print(advice_texts["Carbs_low"])
            if fat >= 20:
                print(f" - Total fat: {fat}g (should be less than 20g)")
                print(advice_texts["Fat_high"])
            else:
                print(advice_texts["Fat_low"])

        comparison_data = {
            "Component": ["Calories", "Total protein", "Total carbs", "Total fat"],
            "Recipe": [calories, protein, carbs, fat],
            "Daily Recommended": [recommended_intake["Calories"], recommended_intake["Total protein"], recommended_intake["Total carbs"], recommended_intake["Total fat"]]
        }
        comp_df = pd.DataFrame(comparison_data)
        comp_df.set_index("Component", inplace=True)

        plt.figure(figsize=(14, 8))
        comp_df.plot(kind='pie', subplots=True, autopct='%1.1f%%', startangle=140, fontsize=10)
        plt.suptitle(f"Nutritional Intake Percentage Comparison for {recipe_name}", fontsize=16, fontweight='bold')
        plt.tight_layout()
        # plt.show()
        return plt