import { sequelize } from '../../sequelize';

const User = sequelize.models.user;

async function getList(req, res) {
	const students = await User.findAll({
		where: { isSuperuser: false, isAdmin: false, isStudent: true, },
		attributes: ['id', 'username'],
		order: [
			['id', 'DESC'],
		],
	});
	res.status(200).send(students);
};

module.exports = {
	getList,
}