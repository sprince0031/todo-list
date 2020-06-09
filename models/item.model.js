const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    item: {
        type: String,
        required: [true, "A list item is required to add to the list!"]
    }
});

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
    item: "Welcome to your todo list"
})

const item2 = new Item({
    item: "Hit the + button to add a new item"
})

const item3 = new Item({
    item: "<-- Hit this to delete an item"
})

const defaultItems = [item1, item2, item3];

module.exports = {
    Item: Item,
    defaultItems: defaultItems
};