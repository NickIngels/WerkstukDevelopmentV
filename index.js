// Express

const express = require('express');
const app = express();
const port = process.env.PORT || 6000;
const bgRouter = express.Router();

const {
    Client
} = require('pg')
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 2103,
    password: "admin",
    database: "postgres"
})
client.connect();

// Middleware
//const bodyParser = require('body-parser');
const {
    request
} = require('http');

// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());

const pg = require('knex')({

    client: 'pg',

    searchPath: ['knex', 'public'],

    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://admin:admin@localhost:5432/Gebruikers'

});

async function gebruikersData() {
    await pg.select().table("Gebruikers");
}

bgRouter.route('/updateGebruiker/:UUID')
    .patch((req, res) => {
        async function UpdateGebruikers() {
            request.post
            await client.query(
                `UPDATE public."Gebruikers"
            SET "naam" = '${req.body.naam}'
            WHERE "UUID" = '${req.params.UUID}'`,
                (err, res) => {
                    console.log(err, res);
                }
            );
            res.send("Aanpassingen doorgevoerd!")
        }
        UpdateGebruikers();
    });


bgRouter.route('/gebruikers')
    .get((req, res) => {
        //gebruikersData()
        client.query(`SELECT * FROM public."Gebruikers"`, (err, res) => {
            if (!err) {
                console.log(res.rows);
            } else {
                console.log(err.message);
            }
        });
        res.send("Gebruikers opgehaald");
    })


bgRouter.route('/deleteGebruiker/:UUID')
    .delete((req, res) => {
        //async function deleteGebruiker() {
        client.query(
            `DELETE FROM public."Gebruikers" WHERE "UUID" = '${req.params.UUID}';`,
            (err, res) => {
                console.log(err, res);
            }
        );
        res.send("Gebruiker verwijderd")
        // }
        //deleteGebruiker();
    });

// Under construction
// app.post('/addGebruiker', (req, res) => {
//     client.query(
//         "INSERT INTO Gebruikers(UUID, naam, email)VALUES(gen_random_uuid(), 'Bart', 'bartmail')",
//         (err, res) => {
//             console.log(err, res);
//             client.end();
//         }
//     );
//     res.send("Gebruiker toegevoegd")
// });

app.use('/database', bgRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);

});

module.exports = {
    port
}