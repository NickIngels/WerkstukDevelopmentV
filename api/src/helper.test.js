const {
    app
} = require("./server");
const helpers = require("./helpers");
const request = require('supertest');
const {
    doesNotMatch
} = require("assert");


it('tests if getting GebruikerData is succesful', async () => {
    const response = await request(app).get('/database/Gebruikers');
    expect(response.statusCode).toEqual(200);
    expect(response.body.status).toBe("Gebruikers opgehaald");
});

it('tests if getting GebruikerData is succesful', async () => {
    const response = await request(app).post('/database/postGebruiker/waytoolongname/mail');
    expect(response.statusCode).toEqual(500);
});

it('tests if getting GebruikerData is succesful', async () => {
    const response = await request(app).post('/database/postGebruiker/goodname/mail');
    expect(response.statusCode).toEqual(200);
});

// it('tests if recieving Gebruikerdata is succesful', async () => {
//     const response = await request(app).get('/database/Gebruikers');
//     expect(response.statusCode).toEqual(200);
// });

it('tests if deleting GebruikerData is succesful', async () => {
    const response = await request(app).delete('/database/deleteGebruiker/5');
    expect(response.statusCode).toEqual(200);
});

//test("testing port length", () => {
//    expect(helpers.checkPortLength(app.port.toString())).toBeFalsy();
//})

//test("testing url", () => {
//    expect(helpers.checkIfURL(`http://localhost:${app.port}`)).toBeFalsy();
//})

describe('helper', () => {
    test("obviously runs", () => {
        expect(1 === 1).toBeTruthy();
    })
})