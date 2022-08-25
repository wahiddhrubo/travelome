Moralis.Cloud.define("getRooms", async (req) => {
	const id = req.params.id;
	const user = Moralis.Object.extend("_User");
	const query = new Moralis.Query(user);
	query.equalTo("objectId", id);

	const data = await query.first({ useMasterKey: true });

	return data.attributes;
});
