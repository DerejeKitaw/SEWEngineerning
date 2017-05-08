// 01_require express , path , bodyParser
    var express = require('express');
    var path = require('path');
    var bodyParser = require('body-parser');
// 02_import express.route.get('/' and '/tasks')as index and tasks
    //var index = require('./routes/index');
    var jobs = require('./routes/jobs');
// 03_define port number
    var port = 3010;
// 04_define app
    var app = express();
// 05_Set View Engine
    //app.set('views', path.join(__dirname, 'views'));
    //app.set('view engine', 'ejs');
    //app.engine('html', require('ejs').renderFile);
// 06_Set Static Folder (root folder for index.html links)
    app.use(express.static(path.join(__dirname, 'client')));
// 07_Body Parser MW
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
// 08_Assign route defined in 02
    //app.use('/', index);
    app.use('/api', jobs);
// 09_listen to the port
    app.listen(port, function () {
    console.log('Server started on port ' + port);
    });