import { sequelize } from '../../models';

const User = sequelize.models.user;

async function login(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	if (username && password) {
		const user = await User.findOne({ 
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
			res.status(400).send({ message: 'Incorrect username and/or password!' });
		} else {
			res.status(200).send({ message: 'User has been authenticated.', user: user });
		}
	} else {
		res.status(400).send({ message: 'Incorrect username and/or password!' });
	}
};

module.exports = {
	login,
};