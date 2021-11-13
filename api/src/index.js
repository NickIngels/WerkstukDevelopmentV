// Express

const express = require('express');
const app = express();
const port = process.env.APIPORT || 6000;
const bgRouter = express.Router();


const pg = require('knex')({

    client: 'pg',

    searchPath: ['knex', 'public'],

    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://admin:admin@pg:5432/Gebruikers'

});


async function createGebruikersTable() {
    await pg.schema.hasTable('Gebruikers').then(function (exists) {
        if (!exists) {
            return pg.schema.createTable('Gebruikers', function (t) {
                t.increments('UUID').primary();
                t.string('naam', 100);
                t.string('email', 100);
            });
        }
    });
}

async function insertGebruikersData() {
    await pg.table('Gebruikers').insert({
        naam: "Dirk",
        email: "Dirkmail"
    })
}

async function gebruikersData() {
    return await pg.select().table("Gebruikers");
}

async function deleteGebruiker(UUID) {
    return await pg.table('Gebruikers').where('UUID', '=', UUID).del()
}

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
            console.log(databaseData);
            res.send("Data recieved")
        })
    })



bgRouter.route('/deleteGebruiker/:UUID')
    .delete((req, res) => {
        deleteGebruiker(req.params.UUID);
        res.send("Gebruiker deleted")
    });

// WIP
// app.post('/addGebruiker', (req, res) => {
//     );
//     res.send("Gebruiker toegevoegd")
// });

app.get('/', (req, res) => {

    res.send("Hello world")
})

app.use('/database', bgRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);

});

createGebruikersTable();
insertGebruikersData();



module.exports = {
    port
}