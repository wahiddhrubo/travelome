Moralis.Cloud.define("getUser", async (req) => {
	const username = req.params.username;
	const query = new Moralis.Query("_User");
	query.equalTo("username", username);

	const data = await query.find({ useMasterKey: true });

	return data;
});
