const CONST = require('../../const.js');
module.exports = {
	getFacutlyList: function (req, res) {
		Facutly.find()
			.then(function(facutlys){
				return res.json({
					facutlys: facutlys
				});
			})

			.catch(function(e){
				return Service.catch(req, res, e, "getFacutlyList");
			});
	}
};