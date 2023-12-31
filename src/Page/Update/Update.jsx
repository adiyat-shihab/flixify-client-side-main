import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Rate } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

export const Update = () => {
  const params = useParams();
  console.log(params);
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    fetch(
      `https://b8a10-brandshop-server-side-adiyat-shihab.vercel.app/${params.brand}/${params.id}`,
    )
      .then((data) => data.json())
      .then((result) => {
        setData(result);
      });
  }, []);
  const { brand, name, image, price, type, description } = data;

  const [rating, setRating] = useState(data.rating);

  const handleFind = (e) => {
    e.preventDefault();
    const form = e.target;
    const brand = form.brand.value;
    const name = form.name.value;
    const image = form.image.value;
    const price = form.price.value;
    const type = form.type.value;
    const description = form.description.value;
    console.log(brand, name, image, price, type, description, rating);
    const product = { brand, name, image, price, type, description, rating };

    return fetch(
      `https://b8a10-brandshop-server-side-adiyat-shihab.vercel.app/${brand}put/${data._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(product),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.modifiedCount) {
          toast.success("Product Update  Successfully");
        }
      });
  };
  return (
    <div
      className="bg-[#050a0e] pt-20 pb-20 "
      style={{
        backgroundImage: `url("https://i.ibb.co/kms41V4/Untitled-design-2.png")`,
      }}
    >
      <div className="gradientBackground p-[3px]">
        <section className="max-w-4xl p-6 mx-auto bg-[#FD003C] text-[#050a0e]  shadow-md dark:bg-gray-800 pt-20 pb-20">
          <h1 className="text-xl font-bold   capitalize dark:text-white fontButton text-[#050a0e] ">
            Add Product
          </h1>
          <form onSubmit={handleFind}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className=" fontButton font-bold dark:text-gray-200 text-[#050a0e]">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  defaultValue={name}
                  placeholder="Name"
                  className="block w-full px-4 py-2 mt-2 text-[#1D1E22] font-bold  outline-none  placeholder-[#1D1E22] border-b-2 placeholder:font-bold  bg-[#ff003c] border-[#1D1E22]"
                  name="name"
                  required
                />
              </div>

              <div>
                <label className="text-[#050a0e] fontButton font-bold dark:text-gray-200">
                  Image URL
                </label>
                <input
                  id="image"
                  placeholder="Image URL"
                  defaultValue={image}
                  type="text"
                  className="block w-full px-4 py-2 mt-2  font-bold  outline-none  placeholder-[#1D1E22] border-b-2 placeholder:font-bold  bg-[#ff003c] border-[#1D1E22] text-[#1D1E22]"
                  name="image"
                  required
                />
              </div>

              <div>
                <label className="text-[#050a0e] fontButton font-bold dark:text-gray-200">
                  Price
                </label>
                <input
                  placeholder="Price"
                  id="price"
                  type="number"
                  defaultValue={price}
                  className="block w-full px-4 py-2 mt-2  font-bold  outline-none  placeholder-[#1D1E22] border-b-2 placeholder:font-bold  bg-[#ff003c] border-[#1D1E22] text-[#1D1E22]"
                  name="price"
                  required
                />
              </div>

              <div>
                <label className="text-[#050a0e] fontButton font-bold dark:text-gray-200">
                  Brand Name
                </label>
                <select
                  className="block w-full px-4 py-2 mt-2   outline-none  placeholder-[#1D1E22] border-b-2 placeholder:font-bold  bg-[#ff003c] border-[#1D1E22] text-[#1D1E22] fontButton font-bold"
                  name="brand"
                  defaultValue={`${brand}`}
                  required
                >
                  <option value={brand}>{brand}</option>
                </select>
              </div>
              <div>
                <label className="text-[#050a0e] fontButton font-bold dark:text-gray-200">
                  Type
                </label>
                <select
                  className="block w-full px-4 py-2 mt-2   outline-none  placeholder-[#1D1E22] border-b-2 placeholder:font-bold  bg-[#ff003c] border-[#1D1E22] text-[#1D1E22] fontButton font-bold"
                  name="type"
                  defaultValue={type}
                  required
                >
                  <option value="movie">Movie</option>
                  <option value="gaming">Gaming</option>
                  <option value="web series">Web Series</option>
                  <option value="music">Music</option>
                  <option value="cartoon">Cartoon</option>
                  <option value="toys">Toys</option>
                </select>
              </div>
              <div>
                <label className="text-[#050a0e] fontButton font-bold dark:text-gray-200">
                  Rating
                </label>
                <div className="block w-full px-4 py-2 mt-2   outline-none  placeholder-[#1D1E22] border-b-2 placeholder:font-bold  bg-[#ff003c] border-[#1D1E22] text-[#1D1E22] fontButton font-bold">
                  <Rate
                    required
                    defaultValue={data.rating}
                    onChange={(value) => setRating(value)}
                    character={({ index, value }) => {
                      if (value >= index + 1) {
                        return <StarFilled style={{ color: "#1D1E22" }} />;
                      }
                      return <StarOutlined style={{ color: "#000000" }} />;
                    }}
                  />
                </div>
              </div>
            </div>
            <div className=" mt-6">
              <label className="text-[#050a0e] fontButton font-bold dark:text-gray-200 w=">
                Short Description
              </label>
              <textarea
                id="description"
                defaultValue={description}
                required
                name="description"
                placeholder="Description"
                className="block w-full px-4 py-2 mt-2   outline-none  placeholder-[#1D1E22] border-2 placeholder:font-bold  bg-[#ff003c] border-[#1D1E22] text-[#1D1E22] fontButton font-bold"
              />
            </div>

            <div className="flex justify-end mt-6">
              <button className="btn btn--secondary ">
                <span className="btn__content ">Update</span>
                <span className="btn__glitch"></span>
                <span className="btn__label"></span>
                <input type="submit" />
              </button>
            </div>
          </form>
        </section>
      </div>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};
