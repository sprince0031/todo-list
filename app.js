
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const itemsSchema = mongoose.Schema({
    item: {
        type: String,
        required: [true, "A list item is required to add to the list!"]
    }
});

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
    item: "Make plan"
})

const item2 = new Item({
    item: "Work on plan"
})

const item3 = new Item({
    item: "Execute plan"
})

const defaultItems = [item1, item2, item3];

app.get('/', (req, res) => {
    // res.send("Hello.");

    Item.find({}, (err, foundItems) => {
        
        if (err) {
            console.log(err);
        } else {

            if (foundItems.length === 0) {

                Item.insertMany(defaultItems, err => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Default Items added successfully!");
                    }
                });
                res.redirect('/');
            } else {
                res.render('list', {
                    title: "Today",
                    listItems: foundItems
                });
            }
            
        }
    })

    
})

app.post('/', (req, res) => {
    const listItem = req.body.new_item;
    
    const newItem = new Item({
        item: listItem
    });

    newItem.save();

    // console.log(listItems);
    
    res.redirect('/');
})

app.post('/delete', (req, res) => {
    Item.findByIdAndRemove(req.body.checkbox, (err, deletedDoc) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`${deletedDoc.item} has been removed from the list successfully!`)
        }
        res.redirect('/')
    });
});

app.get('/:listname', (req, res) => {
    const List = mongoose.model(`${req.params.listname}item`, itemsSchema);

    List.find({}, (err, tasks) => {
        if (err) {
            console.log(err);
        } else {
            if (tasks.length === 0) {
                const initItem = new List({
                    item: `Welcome to your ${req.params.listname} list.`
                });
                initItem.save();
                res.redirect(`/${req.params.listname}`);
            } else {
                res.render('list', {
                    title: req.params.listname,
                    listItems: tasks
                })
            }
        }
    })
})

app.post('/:listname', (req, res) => {
    const item = req.body.item_name;
    const List = mongoose.model(`${req.params.listname}item`, itemsSchema, `${req.params.listname}items`);
    const newItem = new List({
        item: item
    });

    newItem.save();
    res.redirect(`/${req.params.listname}`)
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