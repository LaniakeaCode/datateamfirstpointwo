var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('items', ['items']);
var db2 = mongojs('items', ['items2']);
var db3 = mongojs('items', ['hollyitems']);
var bodyParser = require("body-parser");



app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());


var port = 3000;

// //async fonksiyonlar
// console.log('uygulama basladi.');
// //2999 ms
// setTimeout(() => {
//     console.log('2 sn bekle')
// },2000);
// setTimeout(()=>{
//     console.log('1 sn bekle');
// },1000)
// console.log('uygulama bitti.');


//IMDB api start
var unirest = require("unirest");

var req = unirest("GET", "https://imdb8.p.rapidapi.com/auto-complete");

req.query({
    "q": "Space Jam 2"
});

req.headers({
    "x-rapidapi-key": "eb77e2b504msh019e34f08b481cfp1dc8bcjsnc478f8a2b126",
    "x-rapidapi-host": "imdb8.p.rapidapi.com",
    "useQueryString": true
});



req.end(function (res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);

});
// IMDB api end


// //async function
// const request = require('request');
// const URL ='https://imdb8.p.rapidapi.com/auto-complete';
// request({ url: URL}, (error, response) => {
// console.log(response.body);
//  });







app.get('/items6', function (req, res) { // filmeri getirir
    console.log("veri al");
    db.items.find(function (err, docs) {
        // console.log(docs);
        res.json(docs);
    })
})



app.post('/items6', function (req, res) {
    console.log("veri ekle");
    // console.log(req.body);
    db.items.insert(req.body, function (err, doc) {
        res.json(doc);  // film eklenebilir controller js ile bağlantılı olarak formdaki bilgileri alır
    })
})


app.delete('/items6/:id', function (req, res) { // formda seçilen filmi silme
    console.log("silindi");
    var id = req.params.id;

    console.log(id);

    db.items.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        res.json(doc);
    })
})


app.get('/items6/:id', function (req, res) { // formda seçilen filmi bulup getirme
    var id = req.params.id;
    console.log(id);

    db.items.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        res.json(doc);
    })
})

app.put('/items6/:id', function (req, res) { // seçilen filmin veritabananında update edilmesi
    var id = req.params.id;
    // console.log(req.body.url + " ******");
    console.log("değiştir");
    db.items.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: {
            $set: {
                url: req.body.url,
                name: req.body.name,
                year: req.body.year,
                IMDb: req.body.IMDb
            }
        },
        new: true
    }, function (err, doc) {
        res.json(doc);


    })
})



app.listen(port, () => {
    console.log('Listening on ' + port);
});

