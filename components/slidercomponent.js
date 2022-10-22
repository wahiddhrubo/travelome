import { useContext } from "react";
import Slider from "react-slick";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Cards from "./card.js";
import { TravelHomeContext } from "../context/TravelHomeContext.js";

export default function SliderComponent({ divs }) {
  const { weiToEth } = useContext(TravelHomeContext);
  const styles = {
    icondiv:
      "transition-all my-10 ease-in h-[50px]  w-[50px] cursor-pointer hover:!bg-black hover:!text-white text-black my-5 rounded-full border-[2px] border-black",
    icons:
      " slick-arrow !left-[0px] top-[20%]   !relative  m-auto   !h-[30px] !w-[30px]",
  };
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div>
      <div className={styles.icondiv}>
        <AiOutlineLeft
          {...props}
          className={
            styles.icons + (currentSlide === 0 ? " slick-disabled" : "")
          }
          aria-disabled={currentSlide === 0 ? true : false}
          type="button"
        />
      </div>
    </div>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div className={styles.icondiv}>
      <AiOutlineRight
        {...props}
        size={50}
        className={
          styles.icons +
          (currentSlide === slideCount - 1 ? " slick-disabled" : "")
        }
        aria-disabled={currentSlide === slideCount - 1 ? true : false}
        type="button"
      />
    </div>
  );

  const settings = {
    dots: true,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {divs &&
          divs.map((b) => (
            <div key={b.uid}>
              <Cards
                img={b.img}
                title={b.name}
                price={weiToEth(b.price)}
                location={b.location}
                description={b.description}
                id={b.uid}
              />
            </div>
          ))}
      </Slider>
    </div>
  );
}
