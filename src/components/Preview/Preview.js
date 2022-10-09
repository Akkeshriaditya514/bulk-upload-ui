import React, { useState, useRef, useCallback } from "react";
import Search from "./search";
import Card from "./Card";
import "./style.css";
export const Preview = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, product, hasMore } = Search(pageNumber);
  const observer = useRef();
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(pageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore,pageNumber]
  );

  return (
    <div className="products-center">
      {product.map((el, index) => {
        let img = "";
        if (el.ProductImage) {
          img = el.ProductImage.split(",")[0];
        }
        if (product.length === index + 1) {
          return (
            <div className="col-md-4" ref={lastProductElementRef} key={el._id}>
              <Card
                ProductName={el.ProductName}
                Description={el.Description}
                ProductImage={img}
                RegularPrice={el.RegularPrice}
                SellingPrice={el.SellingPrice}
                Category={el.Category}
              />
            </div>
          );
        }
        return (
          <div className="col-md-4" key={el._id}>
            <Card
              ProductName={el.ProductName}
              Description={el.Description}
              ProductImage={img}
              RegularPrice={el.RegularPrice}
              SellingPrice={el.SellingPrice}
              Category={el.Category}
            />
          </div>
        );
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "error..."}</div>
    </div>
  );
};
