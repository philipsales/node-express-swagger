var app = require('./config/app');
var port = process.env.PORT || 3000;

var server = app.listen(port, function(){
    console.log('Express server listening: ' + port);
});

module.exports = {
    app
}