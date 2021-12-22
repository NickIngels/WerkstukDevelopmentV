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

it('tests if getting categorieData is succesful', async () => {
    const response = await request(app).get('/database/categorieen');
    expect(response.statusCode).toEqual(200);
    expect(response.body.status).toBe("Categorieen opgehaald");
});

it('tests if posting GebruikerData with more than 10 characters throws error', async () => {
    const response = await request(app).post('/database/postGebruiker/waytoolongname/mail/1');
    expect(response.statusCode).toEqual(500);
});

it('tests if posting GebruikerData is succesful', async () => {
    const response = await request(app).post('/database/postGebruiker/goodname/mail/1');
    expect(response.statusCode).toEqual(200);
});

it('tests if posting categorieData is succesful', async () => {
    const response = await request(app).post('/database/postCategorie/testing/7');
    expect(response.statusCode).toEqual(200);
});

it('tests if deleting GebruikerData is succesful', async () => {
    const response = await request(app).delete('/database/deleteGebruiker/2');
    expect(response.statusCode).toEqual(200);
});