const express = require('express');
const app = express();
const port = 3000;
const data = require('./data');


app.get('/death/year=:year', (req, res)=> {

    const year = parseFloat(req.params.year);
    const age = 2019 - year;
    let total = 0;

    for (let i = 0; i < age; i++) {
      total += data[`${year + i}`][`${i + 1}`];
    }

    let newData = {
      total : total
    }

    res.send(newData);

    // or send percentage of people?

});


app.listen(port, () => {
    console.log(`application is running on port ${port}`);
});
