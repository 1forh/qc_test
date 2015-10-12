var fortunes = [
	'fortune1',
	'fortune2',
	'fortune3',
	'fortune4',
	'fortune5',

];
exports.getFortune = function() {
	var idx = Math.floor(Math.random() * fortunes.length);
	return fortunes[idx];
};