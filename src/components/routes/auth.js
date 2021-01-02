import { sequelize } from '../../sequelize';

const Teacher = sequelize.models.teacher;

async function login(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	if (username && password) {
		const user = await Teacher.findOne({ 
			where: { 
				username: username, 
				password: password
			}, 
			attributes: [
				'id', 
				'username'
			] 
		});
		if (user === null) {
			res.status(400).end();
		} else {
			res.status(200).send(user);
		}
	} else {
		res.status(400).end();
	}
};

async function reset(req, res) {
	await sequelize.sync({ force: true });
	res.status(200).send('리셋했습니다');
}

module.exports = {
	login,
	reset,
};