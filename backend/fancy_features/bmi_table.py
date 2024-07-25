import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

file_path = './fancy_features/bmi.csv' 
bmi_df = pd.read_csv(file_path, names=['Gender', 'Height', 'Weight', 'Index'], header=0)

print(bmi_df)

def calculate_bmi(weight, height):
    height_m = height / 100
    bmi = weight / (height_m ** 2)
    return bmi/10

def getBmiTupleIndexes():
    count = {}
    for i in bmi_df['Index']:
        if i in count:
            count[i] += 1
        else:
            count[i] = 1
    return count

def bmi_distrbution(user_height, user_weight):
    user_bmi = calculate_bmi(user_weight, user_height)
    print(f"Your BMI is: {user_bmi:.2f}")

    plt.figure(figsize=(10, 6))
    sns.histplot(bmi_df['Index'], bins=10, kde=True)
    plt.axvline(x=user_bmi, color='red', linestyle='--', linewidth=2, label=f'Your BMI: {user_bmi:.2f}')
    plt.title('Distribution of BMI Index')
    plt.xlabel('BMI Index')
    plt.ylabel('Frequency')
    plt.legend()
    plt.show()

    plt.figure(figsize=(10, 6))
    sns.boxplot(x='Gender', y='Index', data=bmi_df)
    plt.axhline(y=user_bmi, color='red', linestyle='--', linewidth=2, label=f'Your BMI: {user_bmi:.2f}')
    plt.title('BMI Index by Gender')
    plt.xlabel('Gender')
    plt.ylabel('BMI Index')
    plt.legend()
    plt.show()
    return plt

# print(tuple(bmi_df['Index']))
bmi_distrbution(164,123)