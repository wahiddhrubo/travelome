Moralis.Cloud.define("getUserByAcc", async (req) => {
	const ethAddress = req.params.address;
	const query = new Moralis.Query("_User");
	query.equalTo("ethAddress", ethAddress);

	const data = await query.find({ useMasterKey: true });

	return data;
});
