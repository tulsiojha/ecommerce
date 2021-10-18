/** @format */
import { useRef } from "react";
import Slider from "react-slick";

export default function Carousel(params) {
  const { setCurrentSlide, images } = params;
  const slider = useRef();

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
  };
  return (
    <div className="relative h-40 z-10">
      <Slider {...settings} ref={slider}>
        {images.map((image, index) => (
          <div className="" key={index}>
            <img className="h-40 object-cover w-full" src={image} />
          </div>
        ))}
      </Slider>
      <button
        className="btn btn-circle btn-sm absolute -mt-4 top-1/2 "
        onClick={() => slider.current.slickPrev()}
      >
        ❮
      </button>
      <button
        className="btn btn-circle btn-sm absolute -mt-4 top-1/2 right-0"
        onClick={() => slider.current.slickNext()}
      >
        ❯
      </button>
    </div>
  );
}
