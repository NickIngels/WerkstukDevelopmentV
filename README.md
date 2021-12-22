# WerkstukDevelopmentV
develop
How to run this program?


Create a .env file in the root of your project which contains the following:
PORT=5432
APIPORT=6000

POSTGRES_PASSWORD=admin
POSTGRES_USER=admin
POSTGRES_DB=Gebruikers

////////////////////////////////////////////////////////

Run "docker-compose up --build" in your terminal (be sure to be in the api folder)

Routes:
1. create user
Replace 'name' by the name you want (beware a name can't contain more than 10 characters), replace 'mail' by your email address (no longer than 15 characters) and 'categorieId' by the catogory id you want to use. For example '1' or '2'
http://localhost/database/postGebruiker/name/mail/categorieId

1.1 create category
Replace 'category' by your category name (beware a category name can't contain more than 10 characters), replace 'categoryId' by your id address (no longer than 2 characters)
http://localhost/database/postCategorie/category/categoryId

2. read user table
http://localhost/database/Gebruikers
2.1 read category table
http://localhost/database/categorieen