# WerkstukDevelopmentV
develop
How to run this program?
Run "docker-compose up --build" in your terminal (be sure to be in the api folder)

Create a .env file in the root of your project

Routes:
1. create user
Replace 'name' by the name you want (beware a name can't contain more than 10 characters), replace 'mail' by your email address (no longer than 15 characters) and categorie by the catogory you want to use. For example '1' or '2'
http://localhost/database/postGebruiker/name/mail/categorieId

create category
Replace 'category' by your category name (beware a category name can't contain more than 10 characters), replace 'categoryId' by your id address (no longer than 2 characters)
http://localhost/database/postCategorie/category/categoryId