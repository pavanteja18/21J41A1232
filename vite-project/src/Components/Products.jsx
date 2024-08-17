import "./Products.css";
import { useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAPI = () => {
    setLoading(true);

    const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=10&minPrice=1&maxPrice=10000`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIzODc3OTIxLCJpYXQiOjE3MjM4Nzc2MjEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImNmM2IyNmE1LWEzMzktNDJlNi04ODQzLTc5NjVjMGRhMjRjZiIsInN1YiI6InBhdmFudGVqYW1hZGhAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiJjZjNiMjZhNS1hMzM5LTQyZTYtODg0My03OTY1YzBkYTI0Y2YiLCJjbGllbnRTZWNyZXQiOiJDZWdpYmF6R2JuWmZ5bnp2Iiwib3duZXJOYW1lIjoiUGF2YW4iLCJvd25lckVtYWlsIjoicGF2YW50ZWphbWFkaEBnbWFpbC5jb20iLCJyb2xsTm8iOiIyMUo0MUExMjMyIn0.ITLJUQt1-xkhVRGWU6s_SiHLjOf6aKp-58o6rQxHUT0",
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
