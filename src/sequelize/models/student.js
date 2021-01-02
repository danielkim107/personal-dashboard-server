module.exports = (sequelize, DataTypes) => {
	const student = sequelize.define(
		'student', {
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			name: {
				allowNull: false,
				type: DataTypes.TEXT
			},
			defaultHour: {
				allowNull: false,
				type: DataTypes.FLOAT
			},
			price: {
				allowNull: false,
				type: DataTypes.INTEGER
			},
			tutorDays: {
				allowNull: true,
				type: DataTypes.ARRAY(DataTypes.INTEGER)
			},
		}
	);
	return student;
}