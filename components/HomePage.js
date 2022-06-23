/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import Image from "next/image";
import asusBanner from "/public/asus banner.jpg";
import { urlFor } from "../lib/client";
import Link from "next/link";
import spinner from "/public/load-loading-spinner-icon-934428.png";

const HomePage = ({ res }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loading]);

  return loading ? (
    <main className="px-5 sm:p-5 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-5 ">
        <div className="col-span-5 sm:col-span-3 p-1 ">
          <Image priority alt="" layout="responsive" src={asusBanner} />
        </div>
        <Slider />
      </div>
      <div>
        <h2 className="text-2xl  font-semibold">Ekran Kartları</h2>
        <div className="grid grid-cols-4 font-semibold mt-5">
          {res?.map(({ name, price, image, _id, slug }) => (
            <Link href={`/products/${slug.current}`} key={_id}>
              <div
                onClick={() => setLoading(false)}
                className="hover:scale-105 hover:border-none transition-all duration-200 cursor-pointer flex flex-col items-center justify-center border p-3 col-span-4 sm:col-span-2 lg:col-span-1 space-y-10"
              >
                <img height={200} width={300} src={urlFor(image[0])} alt="" />
                <h2>{name}</h2>
                <h2 className="text-2xl font-bold">{price}₺</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  ) : (
    <div className="relative top-1/2 min-h-screen flex flex-col items-center justify-center">
      <Image
        width={100}
        height={100}
        className="animate-spin"
        src={spinner}
        alt=""
      />

      <h3 className="text-2xl animate-pulse text-red-500 mt-6">
        Yükleniyor...
      </h3>
    </div>
  );
};

export default HomePage;
