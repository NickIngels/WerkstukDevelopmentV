const index = require("./index")
const helpers = require("./helpers");
const request = require('supertest');
const {
    doesNotMatch
} = require("assert");


it('tests if connection to endpoint is successful', async () => {
    const response = await request(index).get('/database/Gebruikers');
    expect(response.statusCode).toEqual(200);
    expect(response.body.status).toBe("Gebruikers opgehaald");
});

it('tests if recieving Gebruikerdata is succesful', async () => {
    const response = await request(index.app).get('/database/Gebruikers');
    expect(response.statusCode).toEqual(200);
});

it('tests if deleting GebruikerData is succesful', async () => {
    const response = await request(index.app).delete('/database/deleteGebruiker/1');
    expect(response.statusCode).toEqual(200);
});

test("testing port length", () => {
    expect(helpers.checkPortLength(index.port.toString())).toBeFalsy();
})

test("testing url", () => {
    expect(helpers.checkIfURL(`http://localhost:${index.port}`)).toBeFalsy();
})