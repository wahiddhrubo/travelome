import Image from "next/image";
import Link from "next/link";
export default function UserBio({
	name,
	username,
	joinedDate,
	details,
	profileImg,
}) {
	const styles = {
		name: `text-3xl font-semibold`,
		joined: `font-medium mt-2 mb-2`,
		desciption: `my-5 pr-20 leading-7 font-normal text-base`,
		divider: `border-[#ffd6d1] my-20 border-0 w-2/3 border-b-[2px]`,
		img: `rounded-full h-[150px] w-[150px] object-cover object-top`,
	};
	return (
		<Link href={`/user/${username}`}>
			<div>
				<div className="flex shrink">
					<div className="w-3/4 my-auto">
						<div className={styles.name}>Hi, I&apos;m {name}</div>
						<div className={styles.joined}>
							Joined in {joinedDate}
						</div>
						<div className={styles.desciption}>
							{details.split(0, 150)}
						</div>
					</div>
					<div>
						<Image
							alt=""
							src={profileImg}
							className={styles.img}
							height={250}
							width={250}
						/>
					</div>
				</div>
			</div>
		</Link>
	);
}
