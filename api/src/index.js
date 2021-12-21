const {
    app
} = require('./server')

const port = process.env.APIPORT || 6000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);

});