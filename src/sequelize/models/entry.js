module.exports = (sequelize, DataTypes) => {
	const entry = sequelize.define('entry', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		title: {
			allowNull: false,
			type: DataTypes.STRING
		},
		content: {
			allowNull: false,
			type: DataTypes.STRING
		}
	});
	return entry;
}