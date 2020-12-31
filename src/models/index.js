const Sequelize = require('sequelize');
import { applyRelation } from './apply-relation';

export const sequelize = new Sequelize('db', 'postgres', 'postgres', {
    dialect: 'postgres',
	host: '127.0.0.1',
	port: 5432
})

const modelDefiners = [
	require('./user'),
	require('./entry'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

applyRelation(sequelize);

