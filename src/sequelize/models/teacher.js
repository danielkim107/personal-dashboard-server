module.exports = (sequelize, DataTypes) => {
	const teacher = sequelize.define(
		'teacher', {
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			username: {
				allowNull: false,
				type: DataTypes.TEXT
			},
			name: {
				allowNull: false,
				type: DataTypes.TEXT
			},
			password: {
				allowNull: false,
				type: DataTypes.TEXT
			},
		}
	);
	return teacher;
}