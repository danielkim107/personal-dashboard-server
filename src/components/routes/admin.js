import { sequelize } from '../../sequelize';

const User = sequelize.models.user;

async function getList(req, res) {
	const admins = await User.findAll({
		where: { isSuperuser: false, isAdmin: true, isStudent: true, },
		attributes: ['id', 'username'],
		order: [
			['id', 'DESC'],
		],
	});
	res.status(200).send(admins);
};

module.exports = {
	getList,
}