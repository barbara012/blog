
/*
 * GET home page.
 */

module.exports = function (app) {
	app.get('/', function (req, res) {
		res.render('index', { title: 'YoYo'});
	});
	app.get('/niz', function (req, res) {
		res.render('index', {title: 'NiZ'});
	});
};