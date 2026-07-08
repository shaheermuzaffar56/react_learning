import { useState } from "react";
import api from "../../api/axiosInstance";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function AdminProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({ title: "", price: "", category: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function submitWithRetry(retriesLeft) {
    try {
      const response = await api.post("/products/add", formData);
      return response.data;
    } catch (error) {
      if (retriesLeft > 0) {
        await delay(1000);
        return submitWithRetry(retriesLeft - 1);
      }
      throw error;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.title.trim()) return; // basic guard, no library needed yet

    setSubmitting(true);
    setError(null);

    try {
      await submitWithRetry(2);
      setFormData({ title: "", price: "", category: "" });
      onProductAdded(); // tells AdminManager to refresh the list
    } catch (error) {
      setError("Failed to add product after multiple attempts.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Product Title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleInputChange}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Product"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default AdminProductForm;