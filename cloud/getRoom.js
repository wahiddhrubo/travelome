Moralis.Cloud.define("getRoom", async (req) => {
	const id = req.params.id;
	const rooms = Moralis.Object.extend("Rooms");
	const query = new Moralis.Query(rooms);
	query.equalTo("objectId", id);

	const data = await query.find();

	return data;
});
