var myApp = angular.module('myApp', []);

myApp.controller('myAppController', function ($scope, $http) {

    $scope.poster = null;

    $scope.getItem = function () {
        $http.get("/items6").then(function (res) {
            // console.log(res);
            console.log("Valar Dohaeris");
            $scope.items = res.data;
        })

    }


    $scope.showItemInBeginning = function () {

        console.log("Valar Morghulis");
        $scope.getItem();
    }

    $scope.getItemOfuser = function () {
        $http.get("/items16").then(function (res) {        // its for login's controller
            console.log("kullanıcı bilgileri alındı")
            $scope.items = res.data;
        })
    }

    $scope.addItem = function () {
        $scope.item.url = $scope.poster;
        $http.post("/items6", $scope.item).then(function (res) {
            // console.log(res);
            console.log("Valar Morghulis");
            $scope.getItem();
        })
    }

    $scope.addItemOfuser = function () {                     // its for login's controller
        $http.post("/items16", $scope.item).then(function (res) {
            console.log("kullanıcı bilgileri eklendi");
            $scope.getItemOfuser();
        })
    }

    $scope.removeItem = function (item) {
        console.log(item);
        $http.delete('/items6/' + item._id).then(function (res) {
            console.log(res);
            $scope.getItem();
        })
    }

    $scope.removeItemOfuser = function (item) {             // its for login's controller
        console.log(item);
        $http.delete('/items16/' + item._id).then(function (res) {
            console.log(res);
            $scope.getItemOfuser();
        })
    }

    $scope.eddie = function (item) {
        console.log(item);
        $http.get('/items6/' + item._id).then(function (res) {
            $scope.item = res.data;
        });
    }

    $scope.selectItemOfuser = function (item) {             // its for login's controller
        console.log(item);
        $http.get('/items16/' + item._id).then(function (res) {
            $scope.item = res.data;
        })
    }

    $scope.dating = function () {
        $scope.item.url = $scope.poster;
        console.log($scope.item._id);
        $http.put('/items6/' + $scope.item._id, $scope.item).then(function (res) {
            console.log(res);
            $scope.getItem();
        })
    }

    $scope.updatingItemOfuser = function () {         // its for login
        console.log($scope.item._id);
        $http.put('/items16' + $scope.item._id, $scope.item).then(function (res) {
            console.log(res);
            $scope.getItemOfuser();
        })

    }



    $scope.fileNameChanged = function (item) {
        let file = item.files[0];

        let reader = new FileReader();

        reader.onload = function (e) {
            //   console.log(e.target.result);
            $scope.poster = e.target.result;

            //   document.getElementById("blah").src = e.target.result
        };

        reader.onerror = function () {
            console.log(reader.error);
        };
        reader.readAsDataURL(item.files[0]);

    }

})