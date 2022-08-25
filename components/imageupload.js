import { Button } from "@mui/material";
import { FiCamera } from "react-icons/fi";
import Dropzone from "./dropzone.js";
import { useState, useEffect } from "react";
import Image from "next/image";
import storage from "../firebase/firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function ImageUpload({ img, setImg, errors }) {
	const [imgFiles, setImgFiles] = useState([]);

	useEffect(() => {
		if (imgFiles == "") {
			return;
		}
		const handleUpload = () => {
			const promises = [];
			imgFiles.map((file) => {
				const storageRef = ref(storage, `/files/${file.name}`);

				const uploadTask = uploadBytesResumable(storageRef, file);

				uploadTask.on(
					"state_changed",
					(snapshot) => {},
					(err) => console.log(err),
					() => {
						// download url
						getDownloadURL(uploadTask.snapshot.ref).then((url) => {
							setImg((prev) => [...prev, url]);
						});
					}
				);
			});

			Promise.all(promises)
				.then(() => console.log("Image Uploaded"))
				.catch((err) => console.log(err));
		};
		handleUpload();
	}, [imgFiles]);

	const [preview, setPreview] = useState([]);
	const onDrop = (files) => {
		setImgFiles(files);
		console.log(img);
	};

	const acceptedFiles = {
		"image/jpeg": ["jpeg"],
		"image/png": ["png"],
		"image/jpg": ["jpg"],
	};
	const previews = img
		? img.slice(0, 5).map((file) => (
				<div key={file} className="m-5">
					<div>
						<div>
							<Image
								src={file}
								alt="Upload Image"
								width={600}
								height={500}
								className="object-cover"
							/>
						</div>
					</div>
				</div>
		  ))
		: "";
	return (
		<div className="w-full p-10">
			<h1 className="text-center"></h1>
			<Dropzone onDrop={onDrop} accept={acceptedFiles} />
			<div className="flex shrink gap-2 justify-center">{previews}</div>
			{img ? (
				<div
					className="text-right cursor-pointer hover:text-orange-700 "
					onClick={(e) => setImg([])}
				>
					{" "}
					Clear
				</div>
			) : (
				""
			)}
			<div className="text-red-700 font-semi-bold text-center">
				{errors.includes("img") && "Please Upload Image Field"}
			</div>
		</div>
	);
}
