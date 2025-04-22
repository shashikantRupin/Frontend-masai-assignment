import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "../styles/ProductComponent.module.css";
const ProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [favs, setFavs] = useState(() => {
    return JSON.parse(localStorage.getItem("productFavs")) || [];
  });
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const fetchData=async()=>{
      try {
         const res = await fetch("/products.json");  
         const jsonData=await res.json(); 
         setProducts(jsonData);
      //    console.log("jsonData",jsonData);
      } catch (error) {
            console.log(error)
      }
  }

  useEffect(() => {
    fetchData();
//     filteredAndSorted();
  }, []);

  useEffect(() => {
    localStorage.setItem("productFavs", JSON.stringify(favs));
  }, [favs]);

  const toggleFav = (id) => {
    setFavs((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredAndSorted = useMemo(() => {
      console.log("products", products)
      let filtered = products?.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, search, sortOrder]);

//   console.log("filteredAndSorted", filteredAndSorted);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.shopContainer}>
        <h1>Shop 🛒</h1>
        <div className={styles.loveLengthContainer}>
          <span className={styles.loveIcon}>❤️</span> {favs.length}
        </div>
      </div>
      <div className={styles.inputSelectContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setSortOrder(e.target.value)} className={styles.select}>
          <option value="">Sort</option>
          <option value="asc">Price Low → High</option>
          <option value="desc">Price High → Low</option>
        </select>
      </div>

      <div className={styles.parentContainer}>
        {filteredAndSorted.map((item, id) => (
          <div key={id} className={styles.card}>
            <ProductCard
              item={item}
              isFav={favs.includes(item.id)}
              onToggleFav={() => toggleFav(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductComponent;
