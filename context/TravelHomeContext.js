import {
	useMoralis,
	useMoralisQuery,
	useWeb3ExecuteFunction,
} from "react-moralis";
import { createContext, useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import toast from "react-hot-toast";
import { primaryColor } from "../lib/constants.js";

export const TravelHomeContext = createContext();

export function TravelHomeContextProvider({ children }) {
	const [currentAccount, setCurrentAccount] = useState("");
	const [formattedAccount, setFormattedAccount] = useState("");
	const [balance, setBalance] = useState(0);
	const [isLoading, setIsLoading] = useState("");
	const [polygonscanLink, setPolygonscanLink] = useState("");
	const [nickname, setNickname] = useState("");
	const [profileImg, setProfileImg] = useState("");
	const [username, setUsername] = useState("");
	const [rooms, setRooms] = useState([]);
	const [recentTransactions, setRecentTransactions] = useState([]);
	const [bookedRooms, setBookedRooms] = useState([]);
	const [completed, setCompleted] = useState();

	const travelHomeAddress = "0x2503E21f01787cDab5C2A7Cd81D4993266C24169";
	const contractProcessor = useWeb3ExecuteFunction();

	const weiToEth = (wei) => {
		return Moralis.Units.FromWei(wei);
	};

	const handleRoomAdd = (dates) => {
		toast.success(
			`You have Booked the Room for ${dates.length} from ${dates[0]} - ${
				dates[dates.length - 1]
			}`,
			{
				style: {
					border: "1px solid #713200",
					padding: "16px",
					color: "#713200",
				},
				iconTheme: {
					primary: primaryColor,
					secondary: "#FFF",
				},
			}
		);
	};
	const handleRoomBooked = () => {
		toast.success(`Sucessfully Added A New Room`, {
			style: {
				border: "1px solid #713200",
				padding: "16px",
				color: "#713200",
			},
			iconTheme: {
				primary: primaryColor,
				secondary: "#FFF",
			},
		});
	};

	const handleError = (error) => {
		toast.error(error);
	};

	const {
		authenticate,
		isAuthenticated,
		enableWeb3,
		Moralis,
		user,
		isWeb3Enabled,
	} = useMoralis();

	const setAll = async () => {
		if (!isWeb3Enabled) {
			await enableWeb3();
		}
		if (isAuthenticated) {
			const currentUserName = await user?.get("username");
			const currentUserNickName = await user?.get("nickname");
			const currentUserAccount = await user?.get("ethAddress");
			const userProfilePic = await user?.get("profileImg");
			const userComplete = await user?.get("completed");
			const currentFormattedAccount =
				currentUserAccount.slice(0, 4) +
				"..." +
				currentUserAccount.slice(-4);
			setUsername(currentUserName);
			setCurrentAccount(currentUserAccount);
			setFormattedAccount(currentFormattedAccount);
			setProfileImg(userProfilePic);
			setCompleted(userComplete);
			setNickname(currentUserNickName.split(" ")[0]);
		}
	};

	useEffect(() => {
		setAll();
	}, [user]);

	const fetchingRoom = async (id) => {
		if (id) {
			await Moralis.start({
				serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
				appId: process.env.NEXT_PUBLIC_APP_ID,
			});
			const results = Moralis.Object.extend("Rooms");
			const query = new Moralis.Query(results);
			query.equalTo("uid", id);

			const result = await query.find();
			const newRoom = result.map((r) => r.attributes);
			console.log(newRoom, id);
			return newRoom;
		} else {
			return false;
		}
	};

	const sortRoomByPrice = async () => {
		await Moralis.start({
			serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
			appId: process.env.NEXT_PUBLIC_APP_ID,
		});
		const results = Moralis.Object.extend("Rooms");
		const query = new Moralis.Query(results);
		const pipeline = [
			{
				limit: 6,
			},
		];

		const result = await query.aggregate(pipeline);
		const newRoom = result.map((r) => r.attributes);
		console.log(newRoom);
		return newRoom;
	};

	const fetchingRoomByLocationOrType = async (loc) => {
		if (loc) {
			await Moralis.start({
				serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
				appId: process.env.NEXT_PUBLIC_APP_ID,
			});
			const results = Moralis.Object.extend("Rooms");
			const query = new Moralis.Query(results);
			query.equalTo("placeType", loc);

			const result = await query.find();
			const newRoom = result.map((r) => r.attributes);
			console.log(newRoom, loc);
			return newRoom;
		} else {
			return false;
		}
	};
	const fetchingFeaturedRooms = async () => {
		await Moralis.start({
			serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
			appId: process.env.NEXT_PUBLIC_APP_ID,
		});
		const results = Moralis.Object.extend("Rooms");
		const query = new Moralis.Query(results);
		query.equalTo("featured", true);

		const result = await query.find();
		const newRoom = result.map((r) => r.attributes);
		console.log(newRoom);
		return newRoom;
	};

	const fetchRoomsByRenter = async (addr) => {
		if (addr) {
			await Moralis.start({
				serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
				appId: process.env.NEXT_PUBLIC_APP_ID,
			});
			const results = Moralis.Object.extend("Rooms");
			const query = new Moralis.Query(results);
			query.equalTo("renter", addr.toString());
			const result = await query.find();
			const dta = result.map((r) => r.attributes);
			let roomsData = [];
			dta.forEach((d) => (roomsData = roomsData.concat(d)));
			return roomsData;
		} else {
			return false;
		}
	};
	const fetchRoomsByGuestNumber = async (num) => {
		if (num) {
			await Moralis.start({
				serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
				appId: process.env.NEXT_PUBLIC_APP_ID,
			});
			const results = Moralis.Object.extend("Rooms");
			const query = new Moralis.Query(results);
			query.greaterThanOrEqualTo("maxNumOfPeople", num);
			const result = await query.find();
			const dta = result.map((r) => r.attributes);
			let roomsData = [];
			dta.forEach((d) => (roomsData = roomsData.concat(d)));
			return roomsData;
		} else {
			return false;
		}
	};

	const fetchBlockedDates = async (id) => {
		if (id) {
			await Moralis.start({
				serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
				appId: process.env.NEXT_PUBLIC_APP_ID,
			});
			const results = Moralis.Object.extend("BookedRooms");
			const query = new Moralis.Query(results);
			query.equalTo("uid", id.toString());

			const result = await query.find();
			const dta = result.map((r) => r.attributes);
			let dates = dta.map((d) => d.datesBooked);
			let blockedDates = [];
			dates.forEach((d) => (blockedDates = blockedDates.concat(d)));
			return blockedDates;
		} else {
			return false;
		}
	};
	const fetchRoomsByBlockedDates = async (dts) => {
		if (dts) {
			await Moralis.start({
				serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
				appId: process.env.NEXT_PUBLIC_APP_ID,
			});
			let alldts = [];
			for (let d of dts) {
				const results = Moralis.Object.extend("BookedRooms");
				const query = new Moralis.Query(results);
				query.equalTo("datesBooked", d);
				const result = await query.find();
				alldts = alldts.concat(result);
			}
			const dta = alldts.map((r) => r.attributes);
			let ids = dta.map((d) => d.uid);
			let blockedIds = [];
			ids.forEach((d) => (blockedIds = blockedIds.concat(d)));

			blockedIds = [...new Set(blockedIds)];
			return blockedIds;
		} else {
			return false;
		}
	};

	const fetchRoomsByBooker = async (addr) => {
		if (addr) {
			await Moralis.start({
				serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
				appId: process.env.NEXT_PUBLIC_APP_ID,
			});
			const results = Moralis.Object.extend("BookedRooms");
			const query = new Moralis.Query(results);
			query.equalTo("booker", addr.toString());
			const result = await query.find();
			const dta = result.map((r) => r.attributes);
			let roomsData = [];
			dta.forEach((d) => (roomsData = roomsData.concat(d)));
			return roomsData;
		} else {
			return false;
		}
	};
	const fetchUserByAcc = async (addr) => {
		console.log(addr);
		if (addr) {
			await Moralis.start({
				serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
				appId: process.env.NEXT_PUBLIC_APP_ID,
			});
			const results = Moralis.Object.extend("_User");
			const query = new Moralis.Query(results);
			query.equalTo("ethAddress", addr.toString);
			const result = await query.find();
			if (result.length === 0) {
				console.log(result);
				return result;
			}
			const userDetails = JSON.parse(JSON.stringify(result))[0];
			return userDetails;
		} else {
			return false;
		}
	};

	const fetchUser = async (id) => {
		if (id) {
			await Moralis.start({
				serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
				appId: process.env.NEXT_PUBLIC_APP_ID,
			});
			const newUser = await Moralis.Cloud.run("getUser", {
				username: id,
			});
			if (newUser.length === 0) {
				console.log(newUser);
				return newUser;
			}
			const userDetails = JSON.parse(JSON.stringify(newUser))[0];
			return userDetails;
		} else {
			return false;
		}
	};
	const getUserByAcc = async (addr) => {
		if (addr) {
			console.log(addr);
			await Moralis.start({
				serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER,
				appId: process.env.NEXT_PUBLIC_APP_ID,
			});
			const newUser = await Moralis.Cloud.run("getUserByAcc", {
				ethAddress: addr.toString(),
			});
			if (newUser.length === 0) {
				console.log(newUser);
				return newUser;
			}
			const userDetails = JSON.parse(JSON.stringify(newUser))[0];
			return userDetails;
		} else {
			return false;
		}
	};

	const completeUserProfile = async (
		nickname,
		bio,
		location,
		img,
		phoneNumber,
		email,
		languages
	) => {
		if (user) {
			if (
				nickname &&
				bio &&
				location &&
				img &&
				phoneNumber &&
				email &&
				languages
			) {
				user.set("nickname", nickname);
				user.set("bio", bio);
				user.set("location", location);
				user.set("profileImg", img);
				user.set("phoneNumber", phoneNumber);
				user.set("email", email);
				user.set("languages", languages);
				user.set("completed", true);
				user.save();
			} else {
				console.log({
					nickname: nickname,
					bio: bio,
					location: location,
					img: img,
					phoneNumber: phoneNumber,
					email: email,
					languages: languages,
				});
			}
		} else {
			console.log("No User");
		}
	};

	const {
		data: userData,
		error: userDataError,
		isLoading: userDataIsLoading,
	} = useMoralisQuery("_User");

	const logOut = async () => {
		await Moralis.User.logOut();
		console.log("logged Out");
	};
	const {
		data: roomsData,
		error: roomsDataError,
		isLoading: roomsDataIsLoading,
	} = useMoralisQuery("Rooms");

	const AddRoom = async (
		name,
		description,
		city,
		location,
		img,
		latitude,
		longitude,
		bed,
		bath,
		price,
		maxNumOfPeople,
		placeType,
		propertyType,
		features
	) => {
		let options = {
			contractAddress: travelHomeAddress,
			functionName: "addRoom",
			abi: [
				{
					inputs: [
						{
							internalType: "string",
							name: "name",
							type: "string",
						},
						{
							internalType: "string",
							name: "description",
							type: "string",
						},
						{
							internalType: "string",
							name: "location",
							type: "string",
						},
						{
							internalType: "string[]",
							name: "img",
							type: "string[]",
						},
						{
							internalType: "string[]",
							name: "latlong",
							type: "string[]",
						},
						{
							internalType: "uint256[]",
							name: "bedbath",
							type: "uint256[]",
						},
						{
							internalType: "string[]",
							name: "placeType",
							type: "string[]",
						},
						{
							internalType: "uint256",
							name: "price",
							type: "uint256",
						},
						{
							internalType: "uint256",
							name: "maxNumOfPeople",
							type: "uint256",
						},
						{
							internalType: "string[]",
							name: "features",
							type: "string[]",
						},
					],
					name: "addRoom",
					outputs: [],
					stateMutability: "nonpayable",
					type: "function",
				},
			],

			params: {
				name: name,
				description: description,
				location: location,
				img: img,
				latlong: [latitude, longitude],
				bedbath: [bed, bath],
				placeType: [city, placeType, propertyType],
				price: Moralis.Units.ETH(price),
				maxNumOfPeople: maxNumOfPeople,
				features: features,
			},
		};
		await contractProcessor.fetch({
			params: options,
			onSuccess: () => {
				handleRoomAdd();
			},
			onError: (error) => {
				handleError(error.data.message);
			},
		});
	};

	const BookRoom = async (newDate, id, price) => {
		let options = {
			contractAddress: travelHomeAddress,
			functionName: "bookRoom",
			abi: [
				{
					inputs: [
						{
							internalType: "uint256",
							name: "id",
							type: "uint256",
						},
						{
							internalType: "string[]",
							name: "newDate",
							type: "string[]",
						},
					],
					name: "bookRoom",
					outputs: [],
					stateMutability: "payable",
					type: "function",
					payable: true,
				},
			],

			params: {
				newDate: newDate,
				id: id,
			},
			msgValue: price,
		};
		await contractProcessor.fetch({
			params: options,
			onSuccess: () => {
				handleRoomBooked(newDate);
			},
			onError: (error) => {
				handleError(error.data.message);
			},
		});
	};

	const getUser = async (id) => {
		if (!isWeb3Enabled) {
			await enableWeb3();
		}
		let query = new Moralis.Query("_User");
		const user = query.equalTo("objectId", id);
		let results = await query.find();
		return results;
	};

	const getBalance = async () => {
		if (!isWeb3Enabled) {
			await enableWeb3();
		}
		let options = {
			contractAddress: travelHomeAddress,
			functionName: "balanceOf",
			abi: [
				{
					inputs: [
						{
							internalType: "address",
							name: "",
							type: "address",
						},
					],
					name: "balanceOf",
					outputs: [
						{
							internalType: "uint256",
							name: "",
							type: "uint256",
						},
					],
					stateMutability: "view",
					type: "function",
					constant: true,
				},
			],

			params: {
				"": currentAccount,
			},
		};

		await contractProcessor.fetch({
			params: options,
			onSuccess: (msg) => {
				const newBalance = ethers.utils.formatEther(msg);
				setBalance(newBalance);
			},
			onError: (error) => {
				setBalance(false);
				console.log(error);
			},
		});
	};

	useEffect(() => {
		if (!isWeb3Enabled) {
			enableWeb3();
		}
		getBalance();
		console.log(isWeb3Enabled, isAuthenticated);
	}, [currentAccount]);

	const connectWallet = async () => {
		await enableWeb3();
		await Moralis.authenticate({
			signingMessage: "Travel Home Authentication",
		}).then(console.log("login complete"));
	};

	return (
		<TravelHomeContext.Provider
			value={{
				formattedAccount,
				isAuthenticated,
				balance,
				isLoading,
				setIsLoading,
				setPolygonscanLink,
				polygonscanLink,
				currentAccount,
				nickname,
				setNickname,
				username,
				setUsername,
				rooms,
				bookedRooms,
				logOut,
				connectWallet,
				AddRoom,
				getUser,
				completeUserProfile,
				weiToEth,
				BookRoom,
				fetchingRoom,
				fetchBlockedDates,
				fetchUser,
				fetchRoomsByBooker,
				fetchRoomsByRenter,
				fetchRoomsByBlockedDates,
				fetchRoomsByGuestNumber,
				profileImg,
				fetchingRoomByLocationOrType,
				completed,
				sortRoomByPrice,
				fetchingFeaturedRooms,
				fetchUserByAcc,
				getUserByAcc,
			}}
		>
			{children}
		</TravelHomeContext.Provider>
	);
}
