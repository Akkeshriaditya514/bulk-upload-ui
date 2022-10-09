import React from "react";
import "./style.css";
export default function Card(props) {
  let {
    ProductName,
    Description,
    ProductImage,
    RegularPrice,
    SellingPrice,
    Category,
  } = props;

  return (
    <div className="img-container w3-panel w3-border">
      <img
        src={
          ProductImage
            ? ProductImage
            : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
        }
        className="product-img"
        alt="Product"
      />
      <b className="card__title">{ProductName}</b>
      <p className="card__description">{Description}</p>{" "}
      {RegularPrice && (
        <p className="text-muted">
          <b>Regular Price: $</b> {RegularPrice}
        </p>
      )}
      {!RegularPrice && (
        <p className="text-muted">
          <b>Regular Price: </b> NA
        </p>
      )}
      {SellingPrice && (
        <p className="text-muted">
          <b>Selling Price: $</b> {SellingPrice}
        </p>
      )}
      {!SellingPrice && (
        <p className="text-muted">
          <b>Selling Price: </b> NA
        </p>
      )}
      {Category && (
        <p className="text-muted">
          <b>Category:</b> {Category}
        </p>
      )}
      {!Category && (
        <p className="text-muted">
          <b>Category:</b> NA
        </p>
      )}
    </div>
  );
}
