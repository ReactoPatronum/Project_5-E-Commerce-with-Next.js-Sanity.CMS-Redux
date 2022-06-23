import React from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import banner1 from "/public/banner 7.jpg";
import banner2 from "/public/banner 2.jpg";
import banner3 from "/public/banner 3.jpg";
import banner4 from "/public/banner 4.jpg";
import banner5 from "/public/banner 5.jpg";


const Slider = () => {
  return (
    <div className="p-1 col-span-5 sm:col-span-2 ">
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={true}
        showIndicators={true}
        showThumbs={false}
        interval={3000}
      >
        <div>
          <Image layout="responsive" alt="" src={banner1} />
        </div>
        <div>
          <Image layout="responsive" alt="" src={banner2} />
        </div>
        <div>
          <Image layout="responsive" alt="" src={banner4} />
        </div>
        <div>
          <Image layout="responsive" alt="" src={banner5} />
        </div>
      </Carousel>
      <div className="mt-1">
      <Image height={177} objectFit="cover" layout="responsive" alt="" src={banner3} />
      </div>
    </div>
  );
};

export default Slider;
