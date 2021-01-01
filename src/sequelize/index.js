import {Sequelize, DataTypes} from 'sequelize';
import { applyRelation } from './apply-relation';

export const sequelize = new Sequelize('db', 'postgres', 'postgres', {
    dialect: 'postgres',
	host: '127.0.0.1',
	port: 5432
})

const modelDefiners = [
	require('./models/user'),
	require('./models/entry'),
	require('./models/slot'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize, DataTypes);
}

applyRelation(sequelize);

