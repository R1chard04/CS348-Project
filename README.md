## CS348 Project (Group 18)

### Milestone 0: Setup

#### About:

**Warning:** The project is currently at the very beginning stage and a lot of the operations tend to be very shaky at this point.

Our application is designed to interact with a **JDBC+DB2** database to manage and query food price data from the World Food Programme (WFP). The dataset we plan to use is the WFP Food Prices dataset, which contains information on food prices in various countries and markets. This could be used by statistican and econimists who are interested in researching the overall food price fluctuation in many different countries and other topics that are related to food price, time, and country. Our source of database is from *kaggle.com*.

#### Platform and User Interface
Our application will be deployed on school linux server for development and testing purposes, and it can be easily adapted to run on local machine if needed. The user interface for our application is command-line based, which allows users to interact with the application through a terminal. 

For now the command line is being used, however, we will think more in details about how to imporve the overall user interface and improve the user experience GUI.

#### Team Members:

These reponsibilites are what we could foresee at this point, and what every one will be going to do over the course of the project. As things get more complex, this is subject to change.

1. *Richard Miao*: Richard has been focusing on setting up the database schema and ensuring the DB2 environment is correctly configured, and on the front-end user interface. He also implemented the initial version of the MaintainDB.java application.

2. *Jason Milad*: Jason has worked on integrating the JDBC driver and ensuring smooth connectivity between the Java applications and the DB2 database. He also contributed to developing the QueryDB.java application.

3. *Fred Sun*: Fred has been responsible for testing the database interactions and verifying the correctness of SQL queries. He also wrote the scripts for creating and populating the database tables.

4. *Haibo Sun*: Haibo has focused on user interface design, ensuring that the command-line interactions are intuitive and user-friendly. He also provided support in debugging and refining the Java code.

5. *Thomas Wang*: Thomas has been handling the overall project coordination and documentation. He also contributed to the development of both MaintainDB.java and QueryDB.java, ensuring they meet the project requirements.

#### Github Link:

The following is our github link where we manage all the source code.
- https://github.com/R1chard04/CS348-Project

To do a git clone:
```
git clone git@github.com:R1chard04/CS348-Project.git
```

#### Setuping:

This is very similar to what's being done in the codesample component:

Enter into your student linux server:
```
$ source ~cs348/public/db2profile
$ source ~db2inst2/sqllib/db2profile
$ source ~db2inst2/sqllib/db2cshrc
```

Now enter CS-348, this is where the poject is. 
It is always a good practice to do a git pull.
```
cd ./cs348/project/CS348-Project
git pull
```

Simple Test:


For now we modifies MaintainDB.java and QueryDB.java to achieve some very basic functionalities. Given the size of the database could be huge and we are still early on at the stage of development, these operation may not always work correctly. Definitely more things and improvment will be added in the following weeks.

```
cd solutions

javac MaintainDB.java
java MaintainDB

-- Actions --
Select an option: 
 1) Add a price entry 
 2) Delete entries by country 
 0) Exit

1
Please provide price entry info (adm0_id, adm0_name, adm1_id, adm1_name, mkt_id, mkt_name, cm_id, cm_name, cur_id, cur_name, pt_id, pt_name, um_id, um_name, mp_month, mp_year, mp_price, mp_commoditysource) separated with comma: 
1.0,Afghanistan,272,Badakhshan,266,Fayzabad,55,Bread - Retail,0.0,AFN,15,Retail,5,KG,1,2014,50.0,SourceName
**Start of Answer**
Price entry added.
**End of Answer**

-- Actions --
Select an option: 
 1) Add a price entry 
 2) Delete entries by country 
 0) Exit
 
 0
 Returning...
 
 Database connection closed
 
==================================================================================
javac QueryDB.java
java QueryDB

-- Actions --
Select an option: 
 1) Get price entries by country
 2) Get average price for a commodity
 0) Exit

1
Please provide the country name (adm0_name): 
Afghanistan
**Start of Answer**
1.0, Afghanistan, 272, Badakhshan, 266, Fayzabad, 55, Bread - Retail, 0.0, AFN, 15, Retail, 5, KG, 1, 2014, 50.0, SourceName
**End of Answer**

-- Actions --
Select an option: 
 1) Get price entries by country
 2) Get average price for a commodity
 0) Exit

0
Returning...

Database connection closed.

```

Source: https://www.kaggle.com/datasets/salehahmedrony/global-food-prices
