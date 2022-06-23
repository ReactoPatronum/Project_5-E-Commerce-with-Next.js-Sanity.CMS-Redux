import React from "react";
import Image from "next/image";
import { PhoneIcon } from "@heroicons/react/solid";
import Card from "/public/card-info.png";

const Footer = () => {
  return (
    <footer className=" w-full text-white">
      <div className="bg-[#3c3b3b] space-y-4 flex flex-col items-center justify-center  p-3">
        <Image alt="" src={Card} />
        <div className="flex">
          <PhoneIcon className="w-6" />
          <span className="text-2xl font-medium">0850 999 99 991</span>
        </div>
        <div>
          <p>
            Çağrı Merkezimize hafta içi her gün sabah 9:00 ila akşam 18:00 arası
            ulaşabilirsiniz.
          </p>
        </div>
      </div>

      <div className="bg-[#3c3b3b] w-full h-16 flex items-center justify-center">
        <div className="flex items-center justify-center space-x-6 px-2">
          <div className="flex flex-col items-center">
            <p className=" font-bold tracking-wider text-xl">Ütopya</p>
          </div>
        </div>
      </div>
      <div className="flex items-center bg-[#1E1E1E] justify-around w-full h-20">
        <p className="font-semibold ">&copy;Ütopya 2022 </p>
        <p className="font-semibold">Made By EmOn</p>
      </div>
    </footer>
  );
};

export default Footer;
