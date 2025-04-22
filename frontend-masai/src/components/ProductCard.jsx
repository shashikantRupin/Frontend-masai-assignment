import React from "react";
const ProductCard = ({ item, isFav, onToggleFav }) => {
  console.log("item", item);
  return (
    <div className="card">
      <img src={item?.image} alt={item?.title} style={{ width: "100%",height:200 }} />
      <h3>{item?.title}</h3>
      <p>{item?.price}</p>
      <button onClick={onToggleFav}>{isFav ? "❤️" : "🤍"}</button>
    </div>
  );
};

export default ProductCard;
