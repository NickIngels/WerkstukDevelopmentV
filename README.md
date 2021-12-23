# WerkstukDevelopmentV - Relational database

What do you need?
- code editor. For example visual studio code
- docker desktop app
- tableplus to view tables (or another program)
- Thunder client as a visual studio code plugin to test routes

How to run this program?
Create a .env file in the root of your project which contains the following:
PORT=5432
APIPORT=6000

POSTGRES_PASSWORD=admin
POSTGRES_USER=admin
POSTGRES_DB=Gebruikers

////////////////////////////////////////////////////////

Run "docker-compose up --build" in your terminal 
To run your tests run the 'npm test' command in your terminal (be sure to be in the api folder)

Routes:
1. create user (post)
Replace 'name' by the name you want (beware a name can't contain more than 10 characters), replace 'mail' by your email address (no longer than 15 characters) and 'categorieId' by the catogory id you want to use. For example '1' or '2'
http://localhost/database/postGebruiker/name/mail/categorieId

1.1 create category
Replace 'category' by your category name (beware a category name can't contain more than 10 characters), replace 'categoryId' by your id address (no longer than 2 characters)
http://localhost/database/postCategorie/category/categoryId

2. read user table (get)
http://localhost/database/Gebruikers

2.1 read category table
http://localhost/database/categorieen

3. update user table (patch)
Change 'gebruikerId' into the id of the user you want to change for example 2. change 'name' into the new username and change 'mail' in the new mail credentials
http://localhost/database/updateGebruiker/gebruikerId/name/mail

3.1 update categorie table
Change 'categorieId' into the id of the category you want to change for example 2. change 'categorie' into the new category name
http://localhost/database/updateCategorie/categorieId/categorie

4. delete user (delete)
change 'gebruikerId' into the id of the item you want to delete. For example '1'
http://localhost/database/deleteGebruiker/gebruikerId

4.1 delete category
change 'categorieId' into the id of the item you want to delete. For example '1'
http://localhost/database/deleteCategorie/categorieId