## CS348 Project (Group 18)

### About:
This is our GitHub repo for the CS348 Project. 

### Platform and User Interface
This system utilizes React.js for the front-end, Flask for the middleware/back-end, Linux as the OS, and PostgreSQL for the DBMS.

### Team Members:
Richard Miao, Haibo Sun, Fred Sun, Thomas Wang, Jason Milad

### Sample vs. Production Databases
The sample database is a subset of the production database. All of the files required for loading data into your PostgreSQL database is located in the "Sources" section. To load up a sample database, follow the next section "Setup" but in step 5, modify `backend/extract_data.py` by setting `isProdDatabase` to `False`; conversely, to load up a production database, set `isProdDatabase` to `True`. 

### Setup:
You can run this in your local system with the following steps:

1. First, `git clone` the application, and enter the root directory.
```
$ git clone git@github.com:R1chard04/CS348-Project.git
$ cd CS348-Project/
```

2. This application runs on PostgreSQL. Download [pgAdmin](https://www.pgadmin.org/download/) for this. Download all applications that as packaged, and configure your username and password when prompted. When you are done, open the pgAdmin application. Create a (or use an existing) server group, and connect to a database. This needs to be open and running. Open a query tool, and run the DDL queries located in `backend/db_queries/ddl_queries.py` to create the tables. You will also need to create and create and set up your `backend/database.ini` and `backend/.flaskenv`:

`backend/database.ini`:
```
[postgresql]
host=localhost
database=postgres
user=<your_username>
password=<your_password>
```
Make sure to change the user and password fields to the ones you configured. Usually, user should be "postgres" and the password should be the same password as your pgAdmin master password.

`backend/.flaskenv`:
```
FLASK_APP=api.py
FLASK_ENV=development
```

3. Within `backend/db_extractors`, download and add the following 3 csv files: [18100245.csv](https://open.canada.ca/data/en/dataset/8015bcc6-401d-4927-a447-bb35d5dfcc91/resource/ccf891a0-31b0-4887-993f-ed99dc38c28a), [NutritionTable.csv](https://www.kaggle.com/datasets/pyvalentin/full-food-nutrients-composition) and [recipes_w_search_terms.csv](https://www.kaggle.com/datasets/shuyangli94/foodcom-recipes-with-search-terms-and-tags). Name them exactly as defined.

4. Open up a terminal and run the following commands:
```
$ python3 -m venv venv 
$ source venv/bin/activate
$ cd backend
```
You should now be in a virtual environment. This will be used to ultimately host the backend server. 

5. In `backend/extract_data.py`, change the global variable `isProdDatabase` based on whether you want to use a sample database or the production database. In a terminal, run the following commands:
```
$ cd backend/
$ python3 extract_data.py
```
Due to the large amount of data, this will run for a few minutes maximum.

6. With the database all set up, open another terminal. For clarity, we name the first terminal T1 and the second T2. T1 should already be in a virtual environment, as per Step 2; T2 will host the front-end web page:
```
$ cd frontend/
$ npm i
$ npm start
```
You should automatically be redirected to a web page on your local browser. If not, click on the localhost link in T2. 

7. In T1, run the following command (you should still be in the `backend/` directory):
```
$ python3 app.py
```
This hosts the backend server for dealing with database queries and data manipulations. 

Now, you may use the web application however you'd like!

### Features (R6a … R9b)

**R6: Feature 1**

Description: 
Extract database recipes to determine which ones can be made provided a list of ingredients that a user has. If no recipes match all ingredients, the user can choose to list recipes that include as many of them as possible.

**R7: Feature 2**

Description:
Total nutritional information of a recipe. For example, calorie count, grams of protein, carbohydrates, and fats, along with other facts seen on nutrition labels.

**R8: Feature 3**

Description: 
Price calculations per serving of the recipe, based on current market prices of each food.

**R9: Feature 4**

Description: 
Filter by most and least expensive and nutritional recipes based on user preferences and ingredient availability to the user. 

**R9.5 Feature 5**

Description: 
Provide more information about a specific recipe. In the final product, this will be when the user clicks on a recipe name and it shows all the information such as ingredients, steps for preparation, nutrition etc.

### Fancy Features (R12 - R16)

**R12: History Search**

We use Redis as a cache system to record user search history, enabling real-time information display, query optimization, and database load reduction.

**R13: Nutrient Calculation and Suggestion**

Python is used to calculate and sum up the nutritional values of all ingredients in a recipe, offering users detailed insights into their caloric and nutrient intake.

**R14: Data Visualization**

Create visualizations to show users’ daily caloric and nutrient intake, compare it against recommended dietary allowances, and use ML algorithms like clustering to suggest new recipes based on eating patterns.

**R15: Querying Capabilities**

Python facilitates advanced querying, such as suggesting recipes based on available ingredients, using libraries like psycopg2 for PostgreSQL interaction.

**R16: Predict User Longevity Based on Current Eating Habits**

Using parameters like BMI and glucose intake, we employ models like Cox Proportional Model to predict life expectancy based on nutrient intake.


### Sources:
- https://www.kaggle.com/datasets/pyvalentin/full-food-nutrients-composition
- https://open.canada.ca/data/en/dataset/8015bcc6-401d-4927-a447-bb35d5dfcc91/resource/ccf891a0-31b0-4887-993f-ed99dc38c28a
- https://www.kaggle.com/datasets/shuyangli94/foodcom-recipes-with-search-terms-and-tags
