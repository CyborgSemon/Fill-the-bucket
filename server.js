const express = require('express');
const app = express();
const port = 3000;


app.get('/death/year=:year', (req, res)=> {

    const year = req.params.year;
    const age = 2019 - year;
    let total = 0;

    for (let i = 0; i < age; i++) {
      total += data[year][1 + i];
    }

    res.send(`${year}, ${age}, ${total}`);

    // or send percentage of people?

});


app.listen(port, () => {
    console.log(`application is running on port ${port}`);
});
