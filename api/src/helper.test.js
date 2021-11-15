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

test("testing port length", () => {
    expect(helpers.checkPortLength(index.port.toString())).toBeFalsy();
})

test("testing url", () => {
    expect(helpers.checkIfURL(`http://localhost:${index.port}`)).toBeFalsy();
})