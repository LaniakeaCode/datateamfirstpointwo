var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('items', ['items']);
var db2 = mongojs('items',['items2']);
var bodyParser = require("body-parser");

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());


var port = 3000;

app.get('/items6', function (req, res) {
    console.log("veri al");
    db.items.find(function (err, docs) {
        // console.log(docs);
        res.json(docs);
    })
})

app.get('/items16', function(req, res) {
    db2.items2.find(function(err, docs) {
        res.json(docs);
        // its for login
    })
})

app.post('/items6', function (req, res) {
    console.log("veri ekle");
    // console.log(req.body);
    db.items.insert(req.body, function (err, doc) {
        res.json(doc);
    })
})

app.post('/items16', function(req,res){
    console.log("kullanıcı veririsi ekle");
    db2.items2.insert(req.body, function ( err, doc) {
        res.json(doc);
        // its  for login 
    })
})


app.delete('/items6/:id', function (req, res) {
    console.log("silindi");
    var id = req.params.id;
    
    console.log(id);

    db.items.remove({_id: mongojs.ObjectId(id) }, function (err, doc) {
        res.json(doc);
    })
})

app.delete('/items16/:id', function (req, res) {
    console.log("kullanıcı hesabı silindi");
    var id = req.params.id;

    console.log(id);

    db2.items2.remove({_id: mongojs.ObjectId(id)}, function (err, doc){ //its for login
        res.json(doc);
    })
})

app.get('/items6/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    
    db.items.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
      res.json(doc);
    })
  })

app.get('/items16/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);

    db2.items2.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) { // its for login
        res.json(doc);
    })
})

app.get('/items16/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);

    db2.items2.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) { // its for login
        res.json(doc);
    })
})


app.put('/items6/:id', function(req, res){
    var id = req.params.id;
    // console.log(req.body.url + " ******");
    console.log("değiştir");
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

app.put('/items16/:id', function(req, res){
    var id = req.params.id;                                     // its for login
    console.log("kullanıcı bilgilerini değiştir");
    db2.items2.findAndModify({
        query: {_id:mongojs.ObjectId(id)},
        update: {$set: {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email}},
            new: true},function(err, doc) {
                res.json(doc);
            
      
    })
})


app.listen(port, () => {
    console.log('Listening on ' + port);
});

