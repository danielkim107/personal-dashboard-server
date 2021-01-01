function getPaginationData(query) {
	let data = {};
	if (query) {
		data.limit = query.limit;
		data.page = query.page;
	} else {
		data.limit = 10;
		data.page = 1;
	}
	data.offset = data.limit * (query.page - 1);
	return data;
}

async function getModelCount(model) {
	let data = await model.findAndCountAll();
	return data.count;
}

module.exports = {
	getPaginationData,
	getModelCount,
}