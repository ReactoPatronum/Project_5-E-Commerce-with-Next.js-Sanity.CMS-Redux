/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { client, urlFor } from "../../lib/client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import PortableText from "react-portable-text";
import { StarIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { useUser } from "@auth0/nextjs-auth0/";
import Comments from "../../components/Comments";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const Slug = ({ products }) => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useUser();
  const [rating, setRating] = useState(1);
  const [sendComment, setSendComment] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.rating = rating;

    try {
      fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify(data),
      });
      toast.success("Yorum Gönderildi!");
      setSendComment(false);
    } catch (err) {
      console.log(err);
      setSendComment(true);
      toast.error("Bir Hata Meydana Geldi.");
    }
  };
  return (
    <main className="min-h-screen px-5 p-5 max-w-[1400px] mx-auto">
      <div></div>
      <div className="grid grid-cols-5 space-x-8">
        <div className="col-span-5 md:col-span-3 lg:col-span-2 ">
          <div>
            <Carousel
              autoPlay
              infiniteLoop
              showArrows={true}
              showIndicators={true}
              showThumbs={false}
              interval={3000}
            >
              {products?.image.map((image, i) => (
                <div key={i}>
                  <img alt="" src={urlFor(products?.image[i])} />
                </div>
              ))}
            </Carousel>
          </div>

          {/* <div className="flex">
            {products.image.map((image, i) => (
              <img width={85} key={i} alt="" src={urlFor(image)}></img>
            ))}
          </div> */}
        </div>
        <div className=" md:col-span-2 col-span-5 lg:col-span-3 ">
          <div className="md:space-y-4 space-y-2">
            <h2 className="text-sm text-gray-400">{products?.details}</h2>
            <h1 className="font-bold lg:text-2xl text-lg">{products?.name}</h1>
            <hr />
            <p className="font-bold text-3xl">{products?.price}₺</p>
            <hr />
          </div>
          <div className="space-x-4 mt-5 flex text-white font-semibold">
            <span className="bg-green-500 p-3">Hızlı Gönderi</span>
            <span className="bg-orange-500 p-3">Taksit İmkanı</span>
            <span className="bg-red-500 p-3">Kargo Bedava</span>
          </div>
          <div className="mt-10 space-y-2">
            <div>
              <span className="font-bold">Üretici:</span>&nbsp;&nbsp;
              <span>{products?.manufacturer}</span>
            </div>
            <div>
              <span className="font-bold">GPU Model:</span>&nbsp;&nbsp;
              <span>{products?.model}</span>
            </div>
            <div>
              <span className="font-bold">Bellek Tipi:</span>&nbsp;&nbsp;
              <span>{products?.memoryType}</span>
            </div>
            <div className="w-full md:w-fit  flex items-center justify-center">
              <button
                onClick={() => dispatch(addItem(products))}
                className="rounded-md hover:bg-yellow-500 transition-all duration-200 mt-10 md:mt-4 lg:mt-10 bg-yellow-400 px-10  md:px-16 text-2xl font-semibold py-4 border active:border-yellow-600 active:scale-110"
              >
                SEPETE EKLE
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2">
        <h3 className="text-xl text-gray-500 my-4">Ürün Açıklaması</h3>
        <div className=" max-w-5xl mx-auto flex flex-col items-center">
          <h1 className="lg:text-2xl text-xl font-semibold my-6">
            {products?.title}
          </h1>
          <PortableText
            projectId="1yczdm57"
            dataset="production"
            content={products?.body}
            serializers={{
              h1: (props) => (
                <h1
                  style={{
                    color: "black",
                    fontSize: "28px",
                    marginBlock: "12px",
                  }}
                  {...props}
                />
              ),
              li: ({ children }) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              h4: (props) => (
                <h1
                  style={{ fontSizeAdjust: "18px", marginBlock: "24px" }}
                  {...props}
                />
              ),
            }}
          />
        </div>
      </div>

      <div className=" max-w-5xl mx-auto border p-6">
        <h2 className="text-2xl font-semibold mb-4">Ürünü Değerlendir</h2>
        {sendComment ? (
          <div className=" md:flex md:space-x-20">
            <div>
              <img className="w-96" src={urlFor(products?.image[0])} alt="" />
              <p>{products?.name}</p>
            </div>

            <div className="w-full  ">
              <h3 className="text-lg font-semibold animate-pulse text-red-500">
                {!user && "Yorum Yapmak İçin Üye Girişi Yapınız"}
              </h3>
              <h2 className="text-2xl font-semibold ">Ürüne Puanınız?</h2>
              <div className="sm:flex items-center justify-between">
                <div className="flex items-center cursor-pointer max-w-fit mt-3">
                  {Array(5)
                    .fill()
                    .map((_, i) =>
                      rating >= i + 1 ? (
                        <StarIcon
                          key={i}
                          onClick={() => setRating(i + 1)}
                          className="w-8 text-yellow-400 transition-all duration-300"
                        />
                      ) : (
                        <StarIcon
                          key={i}
                          onClick={() => setRating(i + 1)}
                          className="w-7 text-gray-400 transition-all duration-300"
                        />
                      )
                    )}
                </div>
                <div className="my-6"></div>
              </div>
              {user ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    {...register("_id")}
                    type="hidden"
                    name="id"
                    value={products?._id}
                  />

                  <input
                    hidden
                    {...register("name")}
                    value={user.given_name ? user.given_name : user.nickname}
                  />

                  <input hidden {...register("email")} value={user?.email} />

                  <h2>Ürün hakkındaki düşünceleriniz:</h2>
                  <textarea
                    disabled={!user}
                    {...register("comment", { required: true })}
                    rows={7}
                    className={`w-full outline-none bg-gray-200 rounded-md resize-none p-2 focus-within:bg-white border-2 focus-within:border-orange-300 ${
                      !user && "cursor-not-allowed"
                    }`}
                  ></textarea>
                  <button
                    disabled={!user}
                    className={` text-white text-xl font-semibold bg-blue-500 transition-all duration-300 ${
                      user && "hover:bg-green-500"
                    } py-3 px-10 ${!user && "cursor-not-allowed"}`}
                    type="submit"
                  >
                    Gönder
                  </button>
                </form>
              ) : (
                <form>
                  <h2>Ürün hakkındaki düşünceleriniz:</h2>
                  <textarea
                    disabled={!user}
                    rows={7}
                    className={`w-full outline-none bg-gray-200 rounded-md resize-none p-2 focus-within:bg-white border-2 focus-within:border-orange-300 ${
                      !user && "cursor-not-allowed"
                    }`}
                  ></textarea>
                  <button
                    disabled={!user}
                    className={` text-white text-xl font-semibold bg-blue-500 transition-all duration-300 ${
                      user && "hover:bg-green-500"
                    } py-3 px-10 ${!user && "cursor-not-allowed"}`}
                    type="submit"
                  >
                    Gönder
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <p className="text-xl text-green-500">
            Yorumunuz Gönderildi. Değerli Görüşünüz İçin Teşekkür Ederiz!
          </p>
        )}
      </div>
      <Comments products={products.comments} />
    </main>
  );
};

export default Slug;

export const getStaticPaths = async () => {
  const query = `*[_type=="product"]{
    _id,
    slug{
        current
    }
}`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const query = `
    *[_type=="product"&&slug.current=="${params.slug}"][0]{
        _id,
        details,
        image,
        manufacturer,
        memoryType,
        model,
        name,
        body,
        "comments":*[
          _type=="comment"&& product._ref==^._id
        ],
        title,
        price,
        amount,
        }
    `;

  const products = await client.fetch(query);

  if (!products) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      products,
    },
    revalidate: 600,
  };
};
