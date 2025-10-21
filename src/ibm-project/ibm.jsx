import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaShoppingCart, FaRegEye } from "react-icons/fa";
import "./ibm.css";

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filters, setFilters] = useState({
    category: "all",
    price: "all",
    rating: "all",
    search: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  // Fetch products
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
      setFiltered(res.data);
      setLoading(false);
    });
  }, []);

  // Filter logic
  useEffect(() => {
    let temp = [...products];

    // Category Filter
    if (filters.category !== "all") {
      temp = temp.filter((p) => p.category === filters.category);
    }

    // Price Filter
    if (filters.price !== "all") {
      const [min, max] = filters.price.split("-");
      temp = temp.filter(
        (p) => p.price >= parseFloat(min) && p.price <= parseFloat(max)
      );
    }

    // Rating Filter
    if (filters.rating !== "all") {
      temp = temp.filter((p) => Math.round(p.rating.rate) >= parseInt(filters.rating));
    }

    // Search Filter
    if (filters.search.trim() !== "") {
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFiltered(temp);
  }, [filters, products]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-danger" role="status"></div>
        <p className="mt-3 text-muted">Loading products...</p>
      </div>
    );
  }

  return (
    <section className="container my-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h6 className="text-danger fw-bold">Our Products</h6>
        <h2 className="fw-bold">Explore Our Products</h2>
      </div>

      {/* Filters Section */}
      <div className="row mb-5 g-3">
        {/* Search */}
        <div className="col-12 col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="col-6 col-md-3">
          <select
            className="form-select"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="col-6 col-md-3">
          <select
            className="form-select"
            value={filters.price}
            onChange={(e) => handleFilterChange("price", e.target.value)}
          >
            <option value="all">Any Price</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200-1000">$200+</option>
          </select>
        </div>

        {/* Rating */}
        <div className="col-12 col-md-3">
          <select
            className="form-select"
            value={filters.rating}
            onChange={(e) => handleFilterChange("rating", e.target.value)}
          >
            <option value="all">Any Rating</option>
            <option value="4">4★ & above</option>
            <option value="3">3★ & above</option>
            <option value="2">2★ & above</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="row g-4">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div key={p.id} className="col-6 col-md-4 col-lg-3">
              <div className="card border-0 shadow-sm h-100 position-relative product-card">
                <div className="position-relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="card-img-top"
                    style={{
                      objectFit: "contain",
                      height: "220px",
                      padding: "15px",
                    }}
                  />
                  <div className="overlay-buttons position-absolute top-50 start-50 translate-middle d-flex gap-2">
                    <button className="btn btn-dark btn-sm">
                      <FaShoppingCart className="me-1" />
                      Add to Cart
                    </button>
                    <button className="btn btn-outline-dark btn-sm">
                      <FaRegEye />
                    </button>
                  </div>
                </div>

                <div className="card-body text-center">
                  <h6
                    className="fw-semibold mt-2 text-truncate"
                    title={p.title}
                    style={{ maxWidth: "200px", margin: "0 auto" }}
                  >
                    {p.title}
                  </h6>
                  <p className="text-danger fw-bold">${p.price}</p>
                  <div className="d-flex justify-content-center align-items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < Math.round(p.rating?.rate) ? "#FFD700" : "#ddd"}
                        size={14}
                      />
                    ))}
                    <span
                      className="ms-2 text-muted"
                      style={{ fontSize: "0.8rem" }}
                    >
                      ({p.rating?.count})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted">No products found.</div>
        )}
      </div>

      {/* Button */}
      <div className="text-center mt-5">
        <button className="btn btn-danger px-4 py-2 rounded-pill">
          View All Products
        </button>
      </div>
    </section>
  );
};

export default ProductCatalog;
