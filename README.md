## CS348 Project (Group 18)

#### About:


#### Platform and User Interface


#### Team Members:
Richard Miao, Haibo Sun, Fred Sun, Thomas Wang, Jason Milad


#### Setup:
You can run this in your local system with the following steps:

1. This application runs on PostgreSQL. Download [pgAdmin]([https://www.genome.gov/](https://www.pgadmin.org/download/)) for this. You will need to follow some instructions in downloading the software and configuring your username and password. When you are done, open the pgAdmin application. Create a (or use an existing) server group, and connect to a database. This needs to be open and running. Open a query tool, and run the DDL queries located in `backend/db_queries/ddl_queries.py` to create the tables. You will also need to create and set up your `backend/database.ini` and `backend/.flaskenv`:

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

2. Next, `git clone` the application, and enter the root directory.
```
$ git clone git@github.com:R1chard04/CS348-Project.git
$ cd CS348-Project/
```

4. Within `backend/db_extractors`, download and add the following 3 csv files: [18100245.csv](https://open.canada.ca/data/en/dataset/8015bcc6-401d-4927-a447-bb35d5dfcc91/resource/ccf891a0-31b0-4887-993f-ed99dc38c28a), [NutritionTable.csv](https://www.kaggle.com/datasets/pyvalentin/full-food-nutrients-composition) and [recipes_w_search_terms.csv](https://www.kaggle.com/datasets/shuyangli94/foodcom-recipes-with-search-terms-and-tags). Name them exactly as defined.

5. Open up a terminal and run the following commands:
```
$ python3 -m venv venv 
$ source venv/bin/activate
$ cd backend
```
You should now be in a virtual environment. This will be used to ultimately host the backend server. 

4. In `backend/test.py`, uncomment the extractor functions on lines 11-13. In a terminal, run the following commands:
```
$ cd backend/
$ python3 test.py
```
Due to the large amount of data, this will run for a few minutes maximum.

5. With the database all set up, open another terminal. For clarity, we name the first terminal T1 and the second T2. T1 should already be in a virtual environment, as per Step 2; T2 will host the front-end web page:
```
$ cd frontend/
$ npm i
$ npm start
```
You should automatically be redirected to a web page on your local browser. If not, click on the localhost link in T2. 

6. In T1, run the following command (you should still be in the `backend/` directory):
```
$ python3 app.py
```
This hosts the backend server for dealing with database queries and data manipulations. 

Now, you may use the web application however you'd like!


#### Sources:
- https://www.kaggle.com/datasets/pyvalentin/full-food-nutrients-composition
- https://open.canada.ca/data/en/dataset/8015bcc6-401d-4927-a447-bb35d5dfcc91/resource/ccf891a0-31b0-4887-993f-ed99dc38c28a
- https://www.kaggle.com/datasets/shuyangli94/foodcom-recipes-with-search-terms-and-tags
