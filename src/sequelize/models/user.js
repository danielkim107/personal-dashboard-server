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
			},
			isSuperuser: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			isAdmin: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			isStudent: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			timeTotal: {
				allowNull: true,
				type: DataTypes.INTEGER,
			},
			timeUsed: {
				allowNull: true,
				type: DataTypes.INTEGER,
			},
		}
	);
	return user;
}