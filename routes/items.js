const router = require('express').Router();
let Item = require('../models/item.model');

router.route('/').get((req, res) => {
    // res.send("Hello.");

    Item.Item.find({}, (err, foundItems) => {
        
        if (err) {
            console.log(err);
        } else {

            if (foundItems.length === 0) {

                Item.Item.insertMany(Item.defaultItems, err => {
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

    
});

router.route('/').post((req, res) => {
    const listItem = req.body.new_item;
    console.log(listItem);
    
    const newItem = new Item.Item({
        item: listItem
    });

    newItem.save();

    // console.log(listItems);
    
    res.redirect('/');
});

router.route('/').delete((req, res) => {
    const id = req.query.id;
    
    Item.Item.findByIdAndRemove(id, (err, deletedDoc) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`${deletedDoc.item} has been removed from the list successfully!`)
        }
        res.send(JSON.stringify({deleted: true}));
    });
});

module.exports = router;