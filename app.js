const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
// app.use(express.json());
app.use(express.static('public'));

const uri = process.env.DB_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const connection = mongoose.connection;
connection.once('open', () => {
 console.log("MongoDB database connection established successfully!");
 
});

const itemsRouter = require('./routes/items');
const miscRouter = require('./routes/misc');

app.use('', miscRouter);
app.use('', itemsRouter);

// const List = mongoose.model('List', listSchema);

// app.post('/delete', (req, res) => {
//     Item.findByIdAndRemove(req.body.checkbox, (err, deletedDoc) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(`${deletedDoc.item} has been removed from the list successfully!`)
//         }
//         res.redirect('/')
//     });
// });

// const listSchema = mongoose.Schema({
//     name: String,
//     items: [itemsSchema]
// });

// app.get('/:customListName', (req, res) => {
//     const customListName = req.params.customListName;
    
//     List.findOne({name: customListName}, (err, foundList) => {

//         if (err) {
//             console.log(err);
//         } else {
//             if (foundList) {
//                 res.render('list', {title: foundList.name, listItems: foundList.items});
//             } else {
//                 const list = new List({
//                     name: customListName,
//                     items: defaultItems
//                 });
            
//                 list.save();

//                 res.redirect(`/${customListName}`);
//             }
//         }

//     })
    

// });

// app.post('/:customListName', (req, res) => {
//     const item = req.body.new_item;
//     const customListName = req.params.customListName;
    
//     List.findOne({name: customListName}, (err, foundList) => {
//         if(err) {
//             console.log(err);
//         } else {
//             if (foundList) {
//                 foundList.items.push({item: item});
//                 // console.log(foundList.items);
//                 foundList.save();
//             } else {
//                 console.log('Oops! The list you are trying to add to doesn\'t exist!');
//             }
//         }
//     });

//     res.redirect(`/${customListName}`)
// });

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    
})