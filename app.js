var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('items', ['items']);

var bodyParser = require("body-parser");

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());


var port = 3000;

app.get('/items6', function (req, res) { 
    console.log("veri al");
    db.items.find(function (err, docs) {
        
        res.json(docs);
    })
})

app.post('/items6', function (req, res) {
    console.log("veri ekle");
    // console.log(req.body);
    db.items.insert(req.body, function (err, doc) {
        res.json(doc);  
    })
})



app.delete('/items6/:id', function (req, res) {
    
    var id = req.params.id;
    
    console.log(id);

    db.items.remove({_id: mongojs.ObjectId(id) }, function (err, doc) {
        res.json(doc);
    })
})



app.get('/items6/:id', function (req, res) { // searching through
    var id = req.params.id;
    console.log(id);
    
    db.items.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
      res.json(doc);
    })
  })


app.put('/items6/:id', function(req, res){ 
    var id = req.params.id;
    
    
    db.items.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {
            url: req.body.url,
            name: req.body.name,
            year: req.body.year,
            IMDb: req.body.IMDb}},
            new: true},function(err, doc) {
                res.json(doc);
            
        
    })
})


app.listen(port, () => {
    console.log('Listening on ' + port);
});

