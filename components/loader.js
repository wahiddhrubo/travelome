import HashLoader from "react-spinners/HashLoader";
import { primaryColor } from "../lib/constants.js";

export default function Loader() {
	return (
		<div
			className={` relative text-center align-middle h-[calc(100vh-150px)] left-[calc(-50vw+50%)] w-screen text-center text-lg font-semibold text-[${primaryColor}]`}
		>
			{" "}
			<div className=" relative top-1/2 my-auto">
				<HashLoader size={100} color={primaryColor} />
			</div>
		</div>
	);
}
