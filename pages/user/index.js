import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import { useContext, useEffect, useState } from "react";
import { TravelHomeContext } from "../../context/TravelHomeContext.js";
import UserForm from "../../components/userform.js";
import { primaryColor } from "../../lib/constants.js";
import SubmitButton from "../../components/button.js";
import {
	checkEmptyField,
	isValidEmail,
} from "../../components/formvalidation.js";

export default function User() {
	const { username, completed, completeUserProfile, isAuthenticated } =
		useContext(TravelHomeContext);

	const [nickname, setNickname] = useState();
	const [bio, setBio] = useState();
	const [location, setLocation] = useState();
	const [img, setImg] = useState([]);
	const [phoneNumber, setPhoneNumber] = useState();
	const [email, setEmail] = useState();
	const [languages, setLanguages] = useState([]);
	const [errors, setErrors] = useState([]);
	const router = useRouter();

	const formData = [
		{ nickname: nickname },
		{ bio: bio },
		{ location: location },
		{ img: img },
		{ phoneNumber: phoneNumber },
		{ email: email },
		{ languages: languages },
	];

	const check = () => {
		if (!checkEmptyField(formData)) {
			if (isValidEmail(email)) {
				completeUserProfile(
					nickname,
					bio,
					location,
					img,
					phoneNumber,
					email,
					languages
				);
				router.push(`/user/${username}`);
			} else {
				setErrors((prev) => ["email"]);
			}
		} else {
			const emptyField = checkEmptyField(formData);
			setErrors(emptyField);
		}
	};

	if (isAuthenticated) {
		return (
			<>
				{completed ? (
					<div
						className={`text-center align-middle h-[calc(100vw-300px)] w-screen text-center text-lg font-semibold text-[${primaryColor}]`}
					>
						{" "}
						<div className=" relative top-1/2 my-auto">
							You Have Already Completed Your Profile
						</div>
					</div>
				) : (
					<div className="">
						<div className="text-center text-2xl font-semibold m-5">
							Complete User Profile
						</div>
						<div className="text-center text-lg font-normal text-[#f12711]">
							Remember You Can't Change The Profile Later!!!
						</div>
						<UserForm
							nickname={nickname}
							setNickname={setNickname}
							bio={bio}
							setBio={setBio}
							location={location}
							setLocation={setLocation}
							img={img}
							setImg={setImg}
							phoneNumber={phoneNumber}
							setPhoneNumber={setPhoneNumber}
							email={email}
							setEmail={setEmail}
							languages={languages}
							setLanguages={setLanguages}
							errors={errors}
						/>
						<div className="text-right px-10">
							<SubmitButton
								className="margin-xl-auto"
								onClick={check}
								type="SubmitButton"
								text="Submit"
							/>
						</div>
						{errors}
					</div>
				)}
			</>
		);
	}
}
