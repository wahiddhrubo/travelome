import { primaryColor } from "../lib/constants.js";
import Button from "./button.js";
import Link from "next/link";
import Image from "next/image";

export default function Header({ img, id, title, price, description }) {
  const bg = img[0] ? img[0] : img[1];
  return (
    <div
      className={`  w-full h-[750px] p-20 bg-cover bg-center bg-[#333131bd] bg-blend-overlay text-2xl font-semibold text-white`}
      style={{
        backgroundImage: `url(${bg})`,
        height: "750px",
      }}
    >
      {/*			<Image
				alt={1}
				src={img[0]}
				width={1600}
				height={800}
				objectFit="cover"
				quality={100}
				className="relative w-full"
			/>
*/}
      <div className=" relative top-1/4 lg:w-[1180px] text-center lg:text-left m-[auto]  ">
        {title}

        <div
          className={` mx-auto lg:mx-0 lg:mr-auto bg-white border-[${primaryColor}] border-[1px] py-2 rounded-md w-[150px] text-center text-sm text-[${primaryColor}] my-2`}
        >
          {price} Matic
          <span className="text-black text-xs font-black"> / Night</span>
        </div>

        <div className="lg:text-base text-center lg:text-left text-sm font-normal lg:!w-[800px] ">
          {description.slice(0, 150)}
          {description.length > 150 ? "..." : ""}
        </div>
        <Link href={`/rooms/${id}`}>
          <div className="lg:w-[175px] h-[40px] !text-lg">
            <Button type="DefaultButton" text="See Room" className="my-10" />
          </div>
        </Link>
      </div>
    </div>
  );
}
