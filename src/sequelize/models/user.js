module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define(
		'user', {
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			username: {
				allowNull: false,
				type: DataTypes.TEXT
			},
			password: {
				allowNull: false,
				type: DataTypes.TEXT
			}
		}
	);
	return user;
}