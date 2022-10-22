import { useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import SearchModal from "./searchModal.js";

export default function SearchPopUp() {
	const [openModal, setOpenModal] = useState();

	return (
		<>
			<SearchModal openModal={openModal} setOpenModal={setOpenModal} />
			<div
				className="flex gap-5 cursor-pointer w-[350px] shadow-2xl my-5 p-5 rounded-xl lg:hidden"
				onClick={() => setOpenModal(true)}
			>
				<div className="h-[25px] my-auto">
					<AiOutlineSearch className="w-[25px] h-[25px]" />
				</div>
				<div className="font-bold border-l-[1px] border-black px-3">
					Where To?
					<p className="font-normal">Add Dates • Add Guests</p>
				</div>
			</div>
		</>
	);
}
