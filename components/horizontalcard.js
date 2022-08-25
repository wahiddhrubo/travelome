import Image from "next/image";
import { primaryColor } from "../lib/constants.js";
import { FaEthereum } from "react-icons/fa";

export default function HorizontalCard({ title, description, img, price }) {
  return (
    <div className="max-w-md mx-auto px-4">
      <div className="relative m-0 shadow-lg flex bg-white">
        <div className="flex-no-shrink">
          <Image
            alt=""
            className="w-64 h-64 block mx-auto"
            src={img}
            height={350}
            width={350}
          />
        </div>
        <div className="flex-1 card-block relative">
          <div className="p-6">
            <h4 className="font-medium text-2xl mb-3">{title}</h4>
            <p className="leading-normal">{description}</p>
            <div
              className={` border-black  text-lg font-semibold my-5 px-[16px] text-[${primaryColor}]`}
            >
              <FaEthereum size={25} className="inline" />
              {price}
            </div>
            <a
              className="-m-4 w-12 h-12 bg-blue-dark flex items-center justify-center text-center no-underline rounded-full text-white hover:bg-blue-darker absolute pin-t pin-r"
              href="#"
            >
              <i className="text-xl fa fa-plus"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
