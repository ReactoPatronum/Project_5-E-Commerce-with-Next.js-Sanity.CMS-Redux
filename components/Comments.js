import { StarIcon } from "@heroicons/react/solid";
import React  from "react";


const Comments = ({ products }) => {
   let star = 0;
   let reversedComments=[...products].reverse()
  return (
    <main className="max-w-5xl mx-auto">
      <div className=" mt-4 border p-3">
        <h2 className="text-2xl font-semibold">Değerlendirmeler</h2>
        <div className="flex items-center mt-2 space-x-4">
          <div className="flex">
            {products.map((item, i) => {
              star += item.rating;
              if (products.length === i + 1) {
                return (
                  <div key={i} className="flex">
                    <p className="text-2xl font-bold ">
                      {(star / products.length).toFixed(1)}
                    </p>
                    <div className="flex ml-2">
                      {Array(Math.floor(star / products.length))
                        .fill()
                        .map((_, i) => (
                          <StarIcon
                            key={i}
                            className="w-8 text-yellow-400 transition-all duration-300"
                          />
                        ))}
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <p>
            Toplam{" "}
            <span className="text-red-500 font-semibold">
              {products.length}
            </span>{" "}
            değerlendirme
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        {products.length > 0 ? (
          reversedComments.map((item) => (
            <div className="bg-slate-200 rounded-lg p-2 "  key={item._id}>
              <div className="flex  items-center">
              {Array(item.rating)
                .fill()
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-8 text-yellow-400 transition-all duration-300"
                  />
                ))}
              <h3 className="font-semibold">{item.name}</h3>
              
            </div>
            <h3 className="mt-2 not-italic"><span className="italic text-red-400">Müşteri Yorumu</span> :&nbsp;&nbsp;{item.comment}</h3>
            </div>
          ))
        ) : (
          <p className="p-2">
            Bu ürüne hiç yorum yapılmadı ilk yapan{" "}
            <span className="text-red-500">siz</span> olun.
          </p>
        )}
      </div>
    </main>
  );
};

export default Comments;
