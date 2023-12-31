import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "/src/Page/Add Product/Border/Border.css";
import { toast, Toaster } from "react-hot-toast";

export const ProductDetails = () => {
  const params = useParams();
  console.log(params);
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    fetch(
      `https://b8a10-brandshop-server-side-adiyat-shihab.vercel.app/${params.brand}/${params.id}`,
    )
      .then((data) => data.json())
      .then((result) => setData(result));
  }, []);
  const { brand, name, image, price, type, description, rating } = data;
  const products = { brand, name, image, price, type, description, rating };
  const handleStore = () => {
    fetch(
      "https://b8a10-brandshop-server-side-adiyat-shihab.vercel.app/product",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(products),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.insertedId) {
          toast.success("Cart Added Successfully");
        }
      });
  };
  return (
    <>
      {" "}
      <div
        className={
          "bg-black flex flex-col-reverse  xl:flex-row justify-between px-4 xl:px-[15.5rem] items-center py-[4.38rem] xl:h-screen "
        }
      >
        <div className={"text-white mt-10 xl:mt-20"}>
          <h1 className={"font-bold text-[3.25rem] mb-[1.25rem]"}>
            {data.name}
          </h1>
          <p className={" xl:w-[32.0625rem] "}>{data.description}</p>
          <button className="btn btn--secondary my-5" onClick={handleStore}>
            <span className="btn__content ">Add To Cart</span>
            <span className="btn__glitch"></span>
            <span className="btn__label"></span>
          </button>
        </div>
        <div>
          <div
            className={
              "bg-gradient-to-tl from-violet-900 via-fuchsia-600 to-red-600 p-[2px] hover:bg-gradient-to-tl hover:from-red-900 hover:via-fuchsia-600 hover:to-violet-600 gradientbrand mb-20 xl:mb-0 "
            }
          >
            <img
              src={data.image}
              alt="no image"
              className={"max-w-none w-[300px] xl:w-[458px] "}
            />
          </div>
          <div>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </div>
      </div>
    </>
  );
};
