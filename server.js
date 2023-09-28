const express = require('express');
const app = express();
// const port = 3000;
const mongoose = require('mongoose');
const path = require('path');

const surveyRoutes = require('./routes/survey');

let port = 3000;

if (process.env.PORT) {
	port = process.env.PORT;
}

mongoose.connect('mongodb+srv://new-user:' + process.env.MONGO_ATLAS_PW + '@cluster0.76fy5.mongodb.net/musicTheoryDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to database!');
	})
	.catch(() => {
		console.log('Connection to database failed!');
	});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'angular')));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
	next();
});

app.use('/api/survey', surveyRoutes);
app.use((req, res, next) => {
	res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});

app.get('/api/survey/ip', (req, res) => {
	const ip = 
		req.headers['cf-connecting-ip'] ||
		req.headers['x-real-ip'] ||
		req.headers['x-forwarded-for'] ||
		req.socket.remoteAddress || '';
	return res.json({
		ip
	})
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
