
var express = require('express');
var router = express.Router(); 

var bodyParser = require('body-parser');

//router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

var User = require('./../models/User');
var statusCode = '';
var statusMsg = '';
var payload = '';  
var _data = { 
    'msg': statusMsg, 
    'data': payload
};

router.post('/', function(req,res){
    console.log(req.body.name);
    console.log(req.body);
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },
    function(err,user){
        if (err) return res.status(500).send("error adding information in database");
        res.status(200).send(user);
    });
});

router.get('/', function(req,res){
    User.find({}, function(err,user){
        if (err) return res.status(500).send("error finding information in database");
        res.status(200).send(user);
    });
});

router.get('/:id', function(req,res){
    console.log(req.params.id);
    User.findByIdAndRemove(req.params.id, function(err,user){

        if (err) {
            statusCode='404';
            statusMsg="no user found";
            payload="";
        }
        else {
            statusCode='200';
            statusMsg="user found";
            payload=user;
        }

        _data['data']=payload;
        _data['msg']=statusMsg;

        return res.status(statusCode).send(_data);
    });
});

router.delete('/:id', function(req,res){
    console.log(req.params.id);
    User.findByIdAndRemove(req.params.id, function(err,user){

        if (err) {
            statusCode='404';
            statusMsg="no user found";
            payload="";
        }
        else {
            statusCode='200';
            statusMsg="user deleted";
            payload=user;
        }

        _data['data']=payload;
        _data['msg']=statusMsg;

        return res.status(statusCode).send(_data);
    });
});

router.put('/:id', function(req,res){
    console.log('update: ', req.params.id);
    console.log('update: ', req.body);
    User.findByIdAndUpdate(req.params.id, req.body, {new:true},
        function(err,user){
            if (err) {
                statusCode='500';
                statusMsg="problem updating";
                payload="";
            }
            else {
                statusCode='200';
                statusMsg="user updated";
                payload=user;
            }

            _data['data']=payload;
            _data['msg']=statusMsg;

            return res.status(statusCode).send(_data);
    });
});


module.exports = router;