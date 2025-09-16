import React from "react";
import { products } from "@/assets/frontend_assets/assets";
import Link from "next/link";
import Card from "./Card";

const RelatedProduct = () => {
  return (
    <div className="w-full flex flex-col my-11">
      <div className="flex justify-center items-center gap-4 w-full mb-3">
        <h2 className="text-xl font-semibold text-gray-500 rounded-full uppercase">
          related <span className="text-black">product</span>
        </h2>
        <p className="w-9 h-0.5 rounded-full bg-black"></p>
      </div>
      {/* <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mt-10 gap-5 gap-y-6">
        {products.slice(0,5).map((item) => (
          <Link href={`/Product/${item._id}`}>
            <Card
              image={item.image[0]}
              name={item.name}
              price={item.price}
              key={item._id}
            />
          </Link>
        ))}
      </div> */}
    </div>
  );
};

export default RelatedProduct;
