import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";

function AdminProductList({ refreshTrigger }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    api.get("/products", { signal: controller.signal })
      .then((response) => {
        setProducts(response.data.products);
        setError(null);
      })
      .catch((error) => {
        if (error.name !== "CanceledError") {
          setError("Failed to load products.");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [refreshTrigger]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.title} — ${product.price} — {product.category} — Stock: {product.stock}
        </li>
      ))}
    </ul>
  );
}

export default AdminProductList;