import { Button } from "@mui/material";
import { FiCamera } from "react-icons/fi";
import Dropzone from "./dropzone.js";
import { useState, useEffect } from "react";
import Image from "next/image";
import storage from "../Firebase/firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function ImageUpload({ img, setImg, errors }) {
	const [imgFiles, setImgFiles] = useState([]);

	useEffect(() => {
		setImg([]);
		if (imgFiles == "") {
			return;
		}
		const handleUpload = () => {
			const promises = [];
			const file = imgFiles[0];
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

			Promise.all(promises)
				.then(() => alert("All images uploaded"))
				.catch((err) => console.log(err));
		};
		handleUpload();
	}, [imgFiles]);

	const [preview, setPreview] = useState([]);
	const onDrop = (files) => {
		setImgFiles(files);
		console.log(img);
		setPreview(
			files.map((file) =>
				Object.assign(file, { preview: URL.createObjectURL(file) })
			)
		);
	};

	const acceptedFiles = {
		"image/jpeg": ["jpeg"],
		"image/png": ["png"],
		"image/jpg": ["jpg"],
	};
	const previews = preview.slice(0, 1).map((file) => (
		<div key={file.name} className="m-5">
			<div>
				<div>
					<Image
						src={file.preview}
						alt={file.name}
						width={600}
						height={500}
						className="object-cover"
					/>
				</div>
			</div>
		</div>
	));
	return (
		<div className="w-full p-10">
			<h1 className="text-center m-5"> Upload Profile Image </h1>
			<Dropzone onDrop={onDrop} accept={acceptedFiles} />
			<div className="flex shrink gap-2 justify-center">{previews}</div>
			<div className="text-red-700 font-semi-bold text-center">
				{errors.includes("img") && "Please Upload Image Field"}
				{img}
			</div>
		</div>
	);
}
