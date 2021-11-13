const index = require("./index")
const helpers = require("./helpers")

// test("testing x", () => {
//     expect(index.BgRouter(1)).toBeTruthy();
// })



const request = require('supertest');

it('tests if connection to endpoint is successful', async () => {
    const response = await request(index).get('/database/Gebruikers');
    expect(response.statusCode).toEqual(200);
    expect(response.body.status).toBe("Gebruikers opgehaald");
});