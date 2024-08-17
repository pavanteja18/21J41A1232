import "./Products.css";
import { useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [loading, setLoading] = useState(false);

  const handleAPI = () => {
    setLoading(true);

    const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=10&minPrice=1&maxPrice=10000`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer Token-entered-here",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && Array.isArray(data)) {
          setProducts(data); // Set the products data
          console.log(data);
        } else {
          console.log("Unexpected response data format:", data);
        }
      })
      .catch((err) => {
        console.log("Fetch error:", err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="input-wrapper">
        <p>Company Name:</p>
        <input
          type="text"
          placeholder="Enter Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <p>Product Category:</p>
        <input
          type="text"
          placeholder="Enter Product Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <p>Min Price:</p>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <p>Max Price:</p>
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <br />
        <br />
        <button onClick={handleAPI} className="btn">
          Search for Products
        </button>
      </div>
      <div className="product-wrapper">
        {loading && <p>Loading...</p>}
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.productName}>
              <h2 className="product-title">{product.productName}</h2>
              <p className="product-price">Price: {product.price}₹</p>
              <p className="product-rating">Rating: {product.rating}</p>
              <p className="product-discount">Discount: {product.discount}%</p>
              <p className="product-available">
                Availability: {product.availability}
              </p>
              <button>Buy</button>
            </div>
          ))
        ) : (
          <p className="alt-text">No products available.</p>
        )}
      </div>
    </>
  );
};

export default Products;
