/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, CalculateAll } from "../redux/cartSlice";
import ItemInTheCart from "../components/ItemInTheCart";
import empty from "/public/emptyCart.png";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Cart = () => {
  const { cartItems, total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CalculateAll());
  }, [cartItems]);

  return (
    <div className="grid grid-cols-6  min-h-[600px] p-3 md:p-7 max-w-7xl mx-auto md:space-x-6">
      <Toaster />
      <div className="col-span-6 md:col-span-4 border shadow-lg p-3 space-y-2">
        <div className="flex items-center justify-between md:px-10 border-b mb-2">
          <h2 className="font-semibold text-lg">Sepetim</h2>
          <h3 className="text-xs md:text-base">
            Sepetinizde{" "}
            <span className="text-red-500">{cartItems.length} </span> adet ürün
            bulunuyor
          </h3>
        </div>
        {cartItems.length > 0 ? (
          cartItems.map((items) => (
            <ItemInTheCart key={items._id} items={items} />
          ))
        ) : (
          <div className="">
            <Image layout="responsive" src={empty} alt="" />
            <h3 className="text-center mt-4 font-semibold text-2xl">
              Olamaz! Alışveriş Sepetinizde Hiç Ürün Yok :/
            </h3>
          </div>
        )}

        <div>
          {!cartItems.length ? (
            ""
          ) : (
            <button
              className="bg-red-500 p-2 rounded-md transition-all duration-200 hover:bg-red-600 text-white"
              onClick={() => dispatch(clearCart())}
            >
              Tüm Ürünleri Sİl
            </button>
          )}
        </div>
      </div>

      <div className="max-h-[450px] space-y-3 col-span-6 md:col-span-2 border shadow-lg p-3 my-6 md:my-0 flex flex-col items-center">
        <div className="">
          <h2 className="font-semibold text-2xl border-b-2 border-b-orange-500">
            Sepet Özeti
          </h2>
        </div>
        <div className="text-right space-y-6">
          <div>
            <h3 className="text-gray-400">Toplam Tutar(KDV Dahil)</h3>
            <h3 className="text-xl font-semibold">
              <p>{total > 0 ? total.toFixed(3) : total} ₺</p>
            </h3>
          </div>
          <div>
            <h3 className="text-gray-400">Kargo</h3>
            <p className="text-2xl text-green-500 font-bold">ÜCRETSİZ</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-400">Ödenecek Tutar</h2>
            <h3 className="text-3xl font-semibold text-orange-500">
              <p>{total > 0 ? total.toFixed(3) : total},00 ₺</p>
            </h3>
          </div>

          <div>
            <button className="bg-blue-400 p-5 px-10 text-white font-semibold rounded-md hover:scale-110 transition-all duration-200">
              DEVAM ET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

export const getServerSideProps = withPageAuthRequired();
