const path = require('path');
const express = require('express'),
 app = express(),
 webapp = express(),
 router = express.Router();
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const fileupload = require("express-fileupload");

const PORT = 9103;
const baseurl = '/inteliq_api';

const server = https.createServer(/*{ key, cert },*/ app);
const webserver = https.createServer(/*{ key, cert },*/ webapp);

// API WEB SERVER
app.listen(PORT, () => {
	console.log(`app listening at: http://localhost:${PORT}${baseurl}`);
});

app.get(baseurl, function (req,res) {
	res.send("InteliQ IS UP!");
});

// MIDDLEWARE FOR CROSS-ORIGIN REQUESTS
app.use(cors());

app.use(fileupload());
app.use(express.urlencoded({ extended: true }));

// WEB SERVER FOR FRONT-END 
webapp.listen(80, () => {
 	console.log('Web-server is up and runing at: http://www.inteliQ.com');
 });

webapp.get("/", function (req,res) {
	res.send("Webserver IS UP!");
});

const adminhealth = require('./admin-endpoints/healthcheck'),
	questionnaireupd = require('./admin-endpoints/questionnaire_upd'),
	resetall = require('./admin-endpoints/resetall'),
	resetq = require('./admin-endpoints/resetq'),
    // login = require('./admin-endpoints/usermod'),
    // logout = require('./admin-endpoints/users'),
	questionnaire = require('./functional-endpoints/questionnaire'),
	question = require('./functional-endpoints/question'),
	doanswer = require('./functional-endpoints/doanswer'),
	getsessionanswers = require('./functional-endpoints/getsessionanswers'),
	getquestionanswers = require('./functional-endpoints/getquestionanswers');
	getquestionanswers_enhanced = require('./functional-endpoints/getquestionanswers_enhanced');
const { homedir } = require('os');

// RESTFUL API ROUTES
app.use(baseurl+'/admin/healthcheck', adminhealth);
app.use(baseurl+'/admin/questionnaire_upd', questionnaireupd);
app.use(baseurl+'/admin/resetall', resetall);
app.use(baseurl+'/admin/resetq', resetq);
// app.use(baseurl+'/admin/usermod', login)
// app.use(baseurl+'/admin/users', logout)
app.use(baseurl+'/questionnaire', questionnaire);
app.use(baseurl+'/question', question);
app.use(baseurl+'/doanswer', doanswer);
app.use(baseurl+'/getsessionanswers', getsessionanswers);
app.use(baseurl+'/getquestionanswers', getquestionanswers);
app.use(baseurl+'/getquestionanswersenhanced', getquestionanswers_enhanced);


// ROUTES FOR FRONTEND

webapp.use(express.static(path.join(__dirname, '..') + "/frontend/frontend1/build"));
webapp.use("/questionnaire", require('./routes/routes_questionnaire.js'));

module.exports = router;
