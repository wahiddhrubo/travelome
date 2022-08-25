import { useContext } from "react";
import Slider from "react-slick";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Divs from "./headerDiv.js";
import { TravelHomeContext } from "../context/TravelHomeContext.js";

export default function Header({ divs }) {
	const { weiToEth } = useContext(TravelHomeContext);
	const styles = {
		icondiv:
			"transition-all z-10 bg-white ease-in h-[50px] m-10 absolute top-[600px] w-[50px] cursor-pointer hover:!bg-black hover:!text-white text-black my-5 rounded-full border-[2px] border-black",
		icons: " slick-arrow !left-[0px] top-[20%]   !relative  m-auto   !h-[30px] !w-[30px]",
		leftIcon: "",
	};
	const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
		<div>
			<div className={styles.icondiv}>
				<AiOutlineLeft
					{...props}
					className={
						styles.icons +
						(currentSlide === 0 ? " slick-disabled" : "")
					}
					aria-disabled={currentSlide === 0 ? true : false}
					type="button"
				/>
			</div>
		</div>
	);
	const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
		<div className="float-right z-10 mr-[125px]">
			<div className={styles.icondiv}>
				<AiOutlineRight
					{...props}
					size={50}
					className={
						styles.icons +
						(currentSlide === slideCount - 1
							? " slick-disabled"
							: "")
					}
					aria-disabled={
						currentSlide === slideCount - 1 ? true : false
					}
					type="button"
				/>
			</div>
		</div>
	);

	const settings = {
		dots: false,
		arrow: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: <SlickArrowLeft />,
		nextArrow: <SlickArrowRight />,
	};

	return (
		<div className="relative w-screen left-[calc(-50vw+50%)] h-[850px]">
			<Slider {...settings} className="w-screen h-screen">
				{divs &&
					divs.map((b) => (
						<div key={b.uid}>
							<Divs
								img={b.img}
								title={b.name}
								price={weiToEth(b.price)}
								description={b.description}
								id={b.uid}
							/>
						</div>
					))}
			</Slider>
		</div>
	);
}
