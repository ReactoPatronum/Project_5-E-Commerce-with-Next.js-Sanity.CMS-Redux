import React, { useState,useEffect } from "react";
import { client, urlFor } from "../lib/client";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";
import spinner from "/public/load-loading-spinner-icon-934428.png";

const Sonuclar = ({ res }) => {
  const { queryItems } = useSelector((store) => store.query);
  const [loading, setLoading] = useState(true);
  const filtered=res.filter((item)=>item.title.toLowerCase().includes(queryItems.toLowerCase()))

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loading]);
 return queryItems.length>0?loading ? (
  <main className="px-5 sm:p-5 max-w-[1400px] mx-auto">
  <div className="min-h-screen">
    <div>
      <h2 className="text-2xl  font-semibold">Arama Sonucunuz:</h2>
      <div className="grid grid-cols-4 font-semibold mt-5">
        {filtered.length?filtered.map(({ name, price, image, _id, slug }) => (
          <Link href={`/products/${slug.current}`} key={_id}>
            <div  onClick={() => setLoading(false)} className="hover:scale-105 hover:border-none transition-all duration-200 cursor-pointer flex flex-col items-center justify-center border p-3 col-span-4 sm:col-span-2 lg:col-span-1 space-y-10">
              <img height={200} width={300} src={urlFor(image[0])} alt="" />
              <h2>{name}</h2>
              <h2 className="text-2xl font-bold">{price}₺</h2>
            </div>
          </Link>
        )):<div className="col-span-4"><h2 className="italic text-xl text-red-500">OOPPss Buralar Issız Görünüyor!</h2></div>}
      </div>
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
  ):<div className="min-h-screen px-5 sm:p-5 max-w-[1400px] mx-auto text-3xl italic">Arama Yapınız</div>
};

export default Sonuclar;

export const getServerSideProps = async () => {
  const query = "*[_type=='product']";
  const res = await client.fetch(query);

  return {
    props: {
      res: res,
    },
  };
};
