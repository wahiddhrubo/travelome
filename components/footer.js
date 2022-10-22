import { primaryColor } from "../lib/constants.js";
import Link from "next/link";
import logo from "../assets/logo.png";
import Image from "next/image";

export default function Footer({}) {
	const Locationoptions = [
		"United States",
		"United Kingdom",
		"Canada",
		"Southern Asia",
		"Europe",
	];
	const Roomoptions = ["Entire place", "Private room", "Shared room"];
	const Propertyoptions = ["House", "Apartment", "Guesthouse", "Hotel"];

	return (
		<div className={`w-full relative mt-[210px] bg-[#000f0e]`}>
			<svg
				className={`absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-[#000f0e]`}
				preserveAspectRatio="none"
				viewBox="0 0 1440 54"
			>
				<path
					fill="currentColor"
					d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
				/>
			</svg>
			<div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
				<div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-5">
					<div className="md:max-w-md lg:col-span-2">
						<Link href="/">
							<div className="relative w-[150px] lg:w-full top-1/4 left-1/4 cursor-pointer m-auto">
								<Image
									src={logo}
									alt="Travel Home"
									height={100}
									width={150}
								/>
							</div>
						</Link>
					</div>
					<div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-3 md:grid-cols-3">
						<div>
							<p
								className={`font-semibold tracking-wide text-[${primaryColor}]`}
							>
								Locations
							</p>
							<ul className="mt-2 space-y-2">
								{Locationoptions.map((l) => (
									<li key={l}>
										<p className="transition-colors duration-300 text-white hover:text-teal-accent-400">
											<Link
												href={`/rooms/categories/${l}`}
											>
												{l}
											</Link>
										</p>
									</li>
								))}
							</ul>
						</div>
						<div>
							<p
								className={`font-semibold tracking-wide text-[${primaryColor}]`}
							>
								Room Category
							</p>
							<ul className="mt-2 space-y-2">
								{Roomoptions.map((l) => (
									<li key={l}>
										<p className="transition-colors duration-300 text-white hover:text-teal-accent-400">
											<Link
												href={`/rooms/categories/${l}`}
											>
												{l}
											</Link>
										</p>
									</li>
								))}
							</ul>
						</div>
						<div>
							<p
								className={`font-semibold tracking-wide text-[${primaryColor}]`}
							>
								Property
							</p>
							<ul className="mt-2 space-y-2">
								{Propertyoptions.map((l) => (
									<li key={l}>
										<p className="transition-colors duration-300 text-white hover:text-teal-accent-400">
											<Link
												href={`/rooms/categories/${l}`}
											>
												{l}
											</Link>
										</p>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<div className="text-center justify-between pt-5 pb-10 border-t border-deep-purple-accent-200 sm:flex-row">
					<p className="text-sm text-gray-100">
						© Copyright 2020 Lorem Inc. All rights reserved.
					</p>
				</div>
			</div>
		</div>
	);
}
