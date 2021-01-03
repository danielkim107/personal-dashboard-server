module.exports = (sequelize, DataTypes) => {
	const slot = sequelize.define('slot', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		date: {
			allowNull: false,
			type: DataTypes.DATE
		},
		studentHours: {
			allowNull: false,
			type: DataTypes.ARRAY(DataTypes.JSON)
		},
		totalAmount: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
	});
	return slot;
}