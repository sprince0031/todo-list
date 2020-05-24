
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let listItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    // res.send("Hello.");
    const today = new Date();

    const dateFormatOpts = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    const day = today.toLocaleDateString("en-GB", dateFormatOpts);

    res.render('list', {
        day: day,
        listItems: listItems
    });
})

app.post('/', (req, res) => {
    const listItem = req.body.new_item;
    listItems.push(listItem);
    // console.log(listItems);
    
    res.redirect('/');
})

app.get('/about', (req, res) => {
    res.render('about');
})


app.listen(process.env.PORT || 3000, () => {
    if (process.env.PORT) {
        console.log(`App is listening on port ${process.env.PORT}.`);
    } else {
        console.log("App is listening on port 3000.");
    }
    
})