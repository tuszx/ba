/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const CONST = require('../../const.js');

module.exports = {
	getUserList: function (req, res) {
		
		var positionId = parseInt(req.param('position_id'));
		var departmentId = parseInt(req.param('department_id'));
		var actived = parseInt(req.param('actived'));
		var typing = req.param('typing') ? req.param('typing') : "";
		var skip = parseInt(req.param('skip')) ? parseInt(req.param('skip')) : 0;
		var limit = parseInt(req.param('limit')) ? parseInt(req.param('limit')) : 10;

		// handle data

		var search = {
			where : {
				deleted: CONST.DELETED.NO,
			},
			skip: skip,
			limit: limit
		};

		if(actived <= CONST.ACTIVED.YES) search.where.actived = actived;
		if(positionId) search.where.position_id = positionId;
		if(departmentId) search.where.department_id = departmentId;

		if(typing){
			search.where.or = [
				{ name: {"like": "%" + typing + "%" } },
				{ account: {"like": "%" + typing + "%" } },
				{ mobile: {"like": "%" + typing + "%" } }
			];	
		} 

		User.getUserList(search)
			.then(function(qUser){
				return qUser;
			})

			.then(function(qUser){
				User.countUser(search)
					.then(function(count){
						return res.json({
							error: CONST.ERROR.NO,
							data: qUser,
							count: count
						});
					});
			})

			.catch(function(err){
				console.log("UserController :: getUserList :: ",err);
				return res.json(CONST.CATCH);
			});
	},

	setUserRole: function(req, res){
		// get param from client
		var userId = parseInt(req.param("user_id"));
		var role = parseInt(req.param("role"));

		if(!userId || isNaN(role)){
			return res.json({
				error: CONST.ERROR.OTHER_REQ,
				message: "Thiếu tham số ID user hoặc quyền"
			});
		}

		User.updateUserInfo({ id: userId }, { role: role } )
			.then(function(qUpdate){
				req.session.user.role = role;
				
				if(!qUpdate || qUpdate.length == 0){
					return res.json({
						error: CONST.ERROR.NO_RECORD_UPDATE,
						message: "Không có tài khoản nào được thay đổi quyền"
					});

				} else {
					var updateData = {};

					if(qUpdate[0].role) {
						updateData.is_user = qUpdate[0].id;
					
					} else { // when kick user
						updateData.is_user = 0;
					}

					Reader.findToUpdateOrCreate({
						mobile: qUpdate[0].mobile
					},
					updateData,
					{
        		mobile: qUpdate[0].mobile,
        		name: qUpdate[0].name,
        		is_user: qUpdate[0].id
        	})
        	.then(function(){
        		return res.json({});
        	})
        	.catch(function(err){
        		return Service.catch(req, res, err, "setUserRole");
        	});
				}
			})

			.catch(function(err){
				return Service.catch(req, res, err, "setUserRole");
			});
	},

	saveDepartment: function(req, res){
		// get and handle data
		var id = parseInt(req.param('id')) ? parseInt(req.param('id')) : 0;
		var actived = parseInt(req.param("actived")) ? 1 : 0;
		var name = req.param("name") ? req.param("name") : "";
			name = name.toString().trim();

		Department.findOne({ id: id })
			.then(function(result){
				if(result){ // Update
					Department.update({ id: id },
						{ actived: actived })
					.then(function(result){
						return res.json({
							data: result
						});
					});

				} else { // Create new

					if(!name){
						return res.json({
							error: CONST.ERROR.OTHER_REQ,
							message: "Thiếu tham số"
						});
					}

					Department.create({
						actived: CONST.ACTIVED.YES,
						name: name
					})
					.then(function(result){
						return res.json({
							data: result
						});
					});
				}
			})

			.catch(function(e){
				console.log("PositionController :: savePosition :: ", e);
					return res.json(CONST.CATCH);
			});
	},


	savePosition: function(req, res){
		// get and handle data
		var id = parseInt(req.param('id')) ? parseInt(req.param('id')) : 0;
		var actived = parseInt(req.param("actived")) ? 1 : 0;
		var name = req.param("name") ? req.param("name") : "";
			name = name.toString().trim();

		Position.findOne({ id: id })
			.then(function(result){
				if(result){ // Update
					Position.update({ id: id },
						{ actived: actived })
					.then(function(result){
						return res.json({
							data: result
						});
					});

				} else { // Create new

					if(!name){
						return res.json({
							error: CONST.ERROR.OTHER_REQ,
							message: "Thiếu tham số"
						});
					}

					Position.create({
						actived: CONST.ACTIVED.YES,
						name: name
					})
					.then(function(result){
						return res.json({
							data: result
						});
					});
				}
			})

			.catch(function(e){
				console.log("PositionController :: savePosition :: ", e);
					return res.json(CONST.CATCH);
			});
	},


	saveDeposit: function(req, res){
		// get and handle data
		var id = parseInt(req.param('id')) ? parseInt(req.param('id')) : 0;
		var actived = parseInt(req.param("actived")) ? 1 : 0;
		var name = req.param("name") ? req.param("name") : "";
			name = name.toString().trim();

		Deposit.findOne({ id: id })
			.then(function(result){
				if(result){ // Update
					Deposit.update({ id: id },
						{ actived: actived })
					.then(function(result){
						return res.json({
							data: result
						});
					});

				} else { // Create new

					if(!name){
						return res.json({
							error: CONST.ERROR.OTHER_REQ,
							message: "Thiếu tham số"
						});
					}

					Deposit.create({
						actived: CONST.ACTIVED.YES,
						name: name
					})
					.then(function(result){
						return res.json({
							data: result
						});
					});
				}
			})

			.catch(function(e){
				console.log("DepositController :: saveDeposit :: ", e);
					return res.json(CONST.CATCH);
			});
	}
};

