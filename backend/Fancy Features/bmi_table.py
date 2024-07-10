import pandas as pd

file_path = 'bmi.csv' 
bmi_df = pd.read_csv(file_path, names=['Gender', 'Height', 'Weight', 'Index'], header=0)

print(bmi_df)
