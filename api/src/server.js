//Dockerhub access token dc518349-b132-474a-92b1-faf1d44e5520


// Express
const {
    error
} = require('console');
const express = require('express');
const app = express();
const bgRouter = express.Router();

let tableExists = false;

// Knex
const pg = require('knex')({

    client: 'pg',

    searchPath: ['knex', 'public'],

    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://admin:admin@localhost:5432/Gebruikers'

});

//This functions creates a user table which contains an id, a name and an email address
async function createGebruikersTable() {
    await pg.schema.hasTable('Gebruikers').then(function (exists) {
        if (!exists) {
            tableExists = true;
            return pg.schema
                .createTable('categorieen', function (t) {
                    t.increments('categorieId').primary;
                    t.string('categorie', 10);
                })
                .createTable('Gebruikers', function (t) {
                    t.increments('UUID').primary();
                    t.string('naam', 100);
                    t.string('email', 100);
                    t.integer('categorie', 3).unsigned().references('categorieId').inTable('categorieen');
                }).then();
        }
    });

    if (tableExists) {
        await insertCategorieData();
        await insertGebruikersData();
    }
}



//With this function you can post user information
async function insertGebruikersData() {
    await pg.table('Gebruikers').insert({
        naam: "Dirk",
        email: "Dirkmail",
        categorie: "1"
    })
}

async function insertCategorieData() {
    await pg.table('categorieen').insert({
        categorieId: "1",
        categorie: "jongen"
    })
}



//Testing post
async function postGebruiker(name, mail) {
    return await pg.table('Gebruikers').insert({
        naam: name,
        email: mail,
        categorie: "1"
    })
}

bgRouter.route('/postGebruiker/:name/:mail')
    .post((req, res) => {
        if (req.params.name.length > 10 || req.params.mail.length > 20) {
            throw (error)
        } else {
            postGebruiker(req.params.name, req.params.mail);
            res.send("Gebruiker toegevoegd")
        }

    })


//This function gets all user data
async function gebruikersData() {
    return await pg.select().table("Gebruikers");
}

//This function lets you delete a user, when providing an id
async function deleteGebruiker(UUID) {
    return await pg.table('Gebruikers').where('UUID', '=', UUID).del()
}

//This function allows you to update user information using the id of the user
async function updateGebruiker(UUID) {
    return await pg.table('Gebruikers').where('UUID', '=', UUID).update('naam', "Nick")
}

bgRouter.route('/updateGebruiker/:UUID')
    .patch((req, res) => {
        updateGebruiker(req.params.UUID);
        res.send("Updated gebruiker")
    });

bgRouter.route('/gebruikers')
    .get((req, res) => {
        gebruikersData().then((databaseData) => {
            //console.log(databaseData);
            res.send({
                status: "Gebruikers opgehaald"
            })
        })
    })

bgRouter.route('/deleteGebruiker/:UUID')
    .delete((req, res) => {
        deleteGebruiker(req.params.UUID);
        res.send("Gebruiker deleted")
    });

// Work in progress
// app.post('/addGebruiker', (req, res) => {
//     );
//     res.send("Gebruiker toegevoegd")
// });

app.get('/', (req, res) => {

    res.send("Hello world")
})

app.use('/database', bgRouter);



createGebruikersTable();
//insertGebruikersData();


module.exports = {
    app
}