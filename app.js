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

//IMDB api
var unirest = require("unirest");

var req = unirest("GET", "https://imdb8.p.rapidapi.com/auto-complete");

req.query({
	"q": "game of thr"
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
// IMDB api

app.get('/items6', function (req, res) { // filmeri getirir
    console.log("veri al");
    db.items.find(function (err, docs) {
        // console.log(docs);
        res.json(docs);
    })
})

app.get('/items16', function (req, res) {
    db2.items2.find(function (err, docs) {
        res.json(docs);
        // its for login  kullanıcı bilgilerini getirir
    })
})


app.get('/magza', function (req, res) {
    db3.hollyitems.find(function (err, docs) {
        res.json(docs); // mağza için ürünleri getirir
    })
})

app.post('/items6', function (req, res) {
    console.log("veri ekle");
    // console.log(req.body);
    db.items.insert(req.body, function (err, doc) {
        res.json(doc);  // film eklenebilir controller js ile bağlantılı olarak formdaki bilgileri alır
    })
})

app.post('/items16', function (req, res) {
    console.log("kullanıcı veririsi ekle");
    db2.items2.insert(req.body, function (err, doc) {
        res.json(doc);
        // its  for login   kullanıcı bilgileri eklenebillir controller js ile bağlantılı olarak formdaki bilgileri alır
    })
})

app.post('/magza', function (req, res) {
    console.log("kullanıcı verisi ekle");
    db3.hollyitems.insert(req.body, function (err, doc) {
        res.json(doc);
    })
})

//Başka Fikir: ayrıca kendi ürün tasarımlarınıda ekleyebilirler

app.post('/magza/:id', function (req, res) { // item kopyalayıp ekleme lazım 
    var id = req.params.id;
    console.log("item kopyalandı ve değiştirildi");  // ürünlerin idsi seçilip o ürünün kopyasını mağza veritabanına ekler.
    var user = findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) { // 
        res.json(doc);  // its 
    })

    user._id = new ObjectId();
    user.size = req.params.size;
    user.adet = req.params.adet;
    user.stoksayısı = req.params.stoksayısı;

    db3.hollyitems.insert(user, function (err, doc) { // burda bi şekilde items2 'deki ki ürünü seçen kullanıcının sipariş listesine bu id'yi eklemem lazım.
        res.json(doc); // error olursa 
    })//19dec not usefull in front-end

})


app.delete('/items6/:id', function (req, res) { // formda seçilen filmi silme
    console.log("silindi");
    var id = req.params.id;

    console.log(id);

    db.items.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        res.json(doc);
    })
})

app.delete('/items16/:id', function (req, res) { // formda seçilen kullanıcıyı silme
    console.log("kullanıcı hesabı silindi");
    var id = req.params.id;

    console.log(id);

    db2.items2.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) { //its for login
        res.json(doc);
    })
})

app.delete('/magza/:id', function (req, res) {
    console.log("magza ürünü silindi");
    var id = req.params.id;

    console.log(id);

    db3.hollyitems.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
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

app.get('/items16/:id', function (req, res) { // formda seçilen kullanıcı bilgilerini silme
    var id = req.params.id;
    console.log(id);

    db2.items2.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) { // its for login
        res.json(doc);
    })
})

app.get('/magza/:id', function (req, res) { // mağza için id'ye göre veritabanından item getirir.
    var id = req.params.id;
    console.log(id);

    db3.hollyitems.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
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

app.put('/magza/:id', function (req, res) {
    var id = req.params.id;
    console.log("değiştir");
    db3.items.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: {
            $set: {
                url: req.body.url,
                size: req.body.size,
                adet: req.body.adet,
                // stoksayısı = req.body.stoksayısı
            }
        }

    })
})

var siparisler = [];
app.put('/items16/:id', function (req, res) {
    var id = req.params.id;                                     // seçilen kullanıcı bilgilerinin veritabanından değiştirilmesi
    console.log("kullanıcı bilgilerini değiştir");
    //burdan
    var id2 = req.params.id2;
    var user = findOne({ _id: mongojs.ObjectId(id2) }, function (err, doc) { // 
        res.json(doc);  // its 
    })

    user._id = new ObjectId();
    user.size = req.params.size;
    user.adet = req.params.adet;
    user.stoksayısı = req.params.stoksayısı;
    siparisler.push(user_id);
    //buraya kadar sipariş ekleme listeye
    db2.items2.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: {
            $set: {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                siparisler: siparisler
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

