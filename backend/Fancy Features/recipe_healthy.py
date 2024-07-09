recommended_intake = {
    "Calories": 2000,
    "Total protein": 50,
    "Total carbs": 300,
    "Total fat": 70
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
        
        for i, value in enumerate(plot_data):
            ax.plot([i, i], [0, value], color='red', lw=2)
        
        plt.title(f"Nutritional Content of {recipe_name}", fontsize=14, fontweight='bold')
        plt.xlabel("Nutritional Components", fontsize=12)
        plt.ylabel("Values", fontsize=12)
        plt.xticks(rotation=0, fontsize=10)
        plt.grid(axis='y')

        plt.tight_layout()
        plt.show()

        print(f"\nHealth Assessment for {recipe_name}:\n")
        if is_healthy(calories, protein, carbs, fat):
            print(f"{recipe_name} is a healthy choice!\n")
        else:
            print(f"{recipe_name} is not a healthy choice based on the following criteria:\n")
            if calories >= 600:
                print(f" - Calories: {calories} (should be less than 600)")
            if protein <= 20:
                print(f" - Total protein: {protein}g (should be more than 20g)")
            if carbs >= 70:
                print(f" - Total carbs: {carbs}g (should be less than 70g)")
            if fat >= 20:
                print(f" - Total fat: {fat}g (should be less than 20g)")

        print("\nNutritional Advice:\n")
        print(" - Maintaining a balanced diet with a variety of nutrients is essential for overall health.")
        print(" - Ensure adequate intake of vitamins and minerals by including fruits and vegetables in your diet.")
        print(" - Stay hydrated by drinking plenty of water throughout the day.")
        print(" - Limit intake of added sugars and saturated fats to reduce the risk of chronic diseases.")
        print(" - Consult with a healthcare professional or registered dietitian for personalized dietary advice.")

        comparison_data = {
            "Component": ["Calories", "Total protein", "Total carbs", "Total fat"],
            "Recipe": [calories, protein, carbs, fat],
            "Daily Recommended": [recommended_intake["Calories"], recommended_intake["Total protein"], recommended_intake["Total carbs"], recommended_intake["Total fat"]]
        }
        comp_df = pd.DataFrame(comparison_data)
        comp_df.set_index("Component", inplace=True)

        plt.figure(figsize=(10, 6))
        comp_df.plot(kind='pie', subplots=True, figsize=(18, 10), autopct='%1.1f%%', startangle=140)
        plt.title(f"Nutritional Intake Comparison for {recipe_name}")
        plt.tight_layout()
        plt.show()
    else:
        print(f"Recipe id {recipe_id} not found in the data.")

plot_nutritional_info(df, 1)