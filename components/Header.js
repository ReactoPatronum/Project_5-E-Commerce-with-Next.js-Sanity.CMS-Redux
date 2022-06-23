/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import {
  ShoppingBagIcon,
  SearchIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/nightSlice";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { addItems } from "../redux/querySlice";

const Header = () => {
  const [inputQ, setInputQ] = useState("");
  const router = useRouter();
  const { user, isLoading, error } = useUser();
  const dispatch = useDispatch();
  const [dayOrNight, setDayOrNight] = useState(false);
  const { dark } = useSelector((store) => store.dark);

  const NightMode = () => {
    setDayOrNight(!dayOrNight);
    dispatch(update((dark = { dark: dayOrNight })));
  };
  const { cartItems } = useSelector((store) => store.cart);
  const goToCart = () => {
    if (user) {
      router.push("/cart");
    } else {
      toast.error("Sepeti Görüntülemek İçin Giriş Yapınız!");
    }
  };
  useEffect(() => {
    dispatch(addItems(inputQ));
  }, [inputQ]);
  return (
    <header className="sm:shadow-purple-600 sm:shadow-lg py-3 px-7 ">
      <div className="max-w-7xl mx-auto flex items-center justify-around md:space-x-8 ">
        <Link href="/">
          <h1 className="font cursor-pointer text-5xl lg:text-6xl text-orange-600 tracking-wide">
            Ütopya
          </h1>
        </Link>
        <div className=" hidden sm:flex border-2 border-orange-400 h-10 rounded-md flex-1">
          <SearchIcon className="w-6 ml-3" />
          <input
            placeholder="Ürün veya marka ara (Ör:rtx 3090...)."
            className="outline-none ml-4 flex-1"
            type="text"
            onChange={(e) => setInputQ(e.target.value)}
          />
          <button
            onClick={() => inputQ && router.push("/sonuclar")}
            className="bg-orange-400 py-2 px-4 transition-all duration-200 hover:bg-orange-500"
          >
            ARA
          </button>
        </div>
        <div className="flex items-center space-x-2 md:space-x-8">
          {user ? (
            <a href="/api/auth/logout">
              <div className="ml-2 flex items-center  cursor-pointer space-x-3">
                <UserIcon className="sm:flex w-7 text-green-600 relative bottom-0.5" />
                <div className=" hidden md:flex flex-col items-center justify-center">
                  <p className="hidden lg:block text-sm">Merhaba,</p>
                  <span className=" font-medium relative bottom-1.5">
                    {user?.given_name || user.nickname}
                  </span>
                </div>
              </div>
            </a>
          ) : (
            <div>
              <a href="/api/auth/login">
                <div className="ml-2 flex items-center  cursor-pointer space-x-3">
                  <UserIcon className="sm:flex w-7 text-red-600 relative bottom-0.5" />
                  <div className=" hidden md:flex flex-col items-center justify-center">
                    <p className="hidden lg:block text-sm">Merhaba,</p>
                    <span className=" font-medium relative bottom-1.5">
                      Giriş Yapın
                    </span>
                  </div>
                </div>
              </a>
            </div>
          )}

          <div
            onClick={() => goToCart()}
            className="flex items-center relative  p-1 cursor-pointer hover:scale-125 transition-all duration-200 ease-in-out"
          >
            <ShoppingBagIcon className="w-7" />
            <p className="absolute left-3.5 top-[12px] text-sm text-red-700 font-bold">
              {cartItems.length}
            </p>
          </div>

          <div
            onClick={NightMode}
            className="w-12 h-6 bg-slate-700 rounded-xl flex items-center cursor-pointer"
          >
            <div className="flex">
              <SunIcon className="w-6 text-yellow-400" />
              <MoonIcon className="w-6 text-white " />
              <motion.div
                animate={!dayOrNight ? { x: 0 } : { x: 24 }}
                className="h-6 w-6 rounded-full bg-gray-200 absolute"
              ></motion.div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-sm mx-auto sm:hidden flex border-2 border-orange-400 h-10  flex-1 m-6">
        <SearchIcon className="w-6 ml-1" />
        <input
          onChange={(e) => setInputQ(e.target.value)}
          className="outline-none ml-4 flex-1"
          type="text"
          placeholder="Ürün veya marka ara (Ör:rtx 3090...)."
        />
        <button
            onClick={() => inputQ && router.push("/sonuclar")}
          className="bg-orange-400 p-2 transition-all duration-200 hover:bg-orange-500"
        >
          ARA
        </button>
      </div>
    </header>
  );
};

export default Header;
