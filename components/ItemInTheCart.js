/* eslint-disable @next/next/no-img-element */
import React from "react";
import { urlFor } from "../lib/client";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { decrease, increase, removeItem } from "../redux/cartSlice";

const ItemInTheCart = ({ items }) => {
  const dispatch = useDispatch();

  
  return (
    <div>
      <div className="border-b flex items-center justify-between">
        <div>
          <img className="w-40" src={urlFor(items.image[0])} alt="" />
          <p>{items.name}</p>
        </div>
        <div className=" ">
          <div className="flex items-center justify-around p-4 space-x-2">
            <button onClick={() => dispatch(decrease(items))}>
              <MinusCircleIcon className="w-7 hover:text-orange-500 transition-all duration-200 ease-in-out hover:scale-110" />
            </button>
            <div className="font-bold text-green-600">{items.amount}</div>
            <button onClick={() => dispatch(increase(items))}>
              <PlusCircleIcon className="w-7 hover:text-orange-500 transition-all duration-200 ease-in-out hover:scale-110" />
            </button>
            <button onClick={() => dispatch(removeItem(items))}>
              <TrashIcon className="w-7 hover:text-orange-500 transition-all duration-200 ease-in-out hover:scale-110" />{" "}
            </button>
          </div>

          <div>
            <h2 className="text-center text-2xl font-bold text-orange-500">
              {(items.price * items.amount).toFixed(3)} ₺
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemInTheCart;
