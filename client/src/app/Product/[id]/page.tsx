"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { products, assets } from "@/assets/frontend_assets/assets";
import Guarantee from "@/components/guest/Guarantee";
import AddToCart from "@/components/guest/AddToCart";
import ProductDesAndReview from "@/components/guest/ProductDesAndReview";
import RelatedProduct from "@/components/guest/RelatedProduct";
import ProductInfo from "@/components/guest/ProductInfo";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchGetProductById } from "@/slice/ProductSlice";
import { toast } from "react-toastify";
import Loading from "@/components/ui/Loading";
import { fetchReviewsByProductId } from "@/slice/ReviewSlice";

const page = () => {
  // TODO: fetch product by id
  const { Product, loading, error } = useAppSelector(
    (state) => state.ProductSlice
  );
  const  {Reviews,errorReview,loadingReview} = useAppSelector(state=>state.ReviewSlice); 
  const dispatch = useAppDispatch();
  const { id }: { id: string } = useParams();
  useEffect(() => {
    if (id !== undefined) dispatch(fetchGetProductById(id));
    dispatch(fetchReviewsByProductId(id));
  }, []);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      {loading && <Loading />}
      <div className="container mx-auto pt-14 md:px-0 px-3">
        <ProductInfo
          tryon={Product?.tryon}
          description={Product?.description}
          id={Product?.id}
          imageUrl={Product?.imageUrl}
          price={Product?.price}
          title={Product?.title}
          size={Product?.size}
        />
        <ProductDesAndReview productId={Product?.id || ''} description={Product?.description || "No description for this product"} reviews={Reviews} />
        <RelatedProduct />
      </div>
    </>
  );
};

export default page;
