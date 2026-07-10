import { useState } from "react";
import api from "../../api/axiosInstance";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "./adminProductSchema";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function AdminProductForm({ onProductAdded }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: { title: "", price: "", category: "" },
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

async function submitWithRetry(data, retriesLeft) {
  try {
    const response = await api.post("/products/add", data);
    return response.data;
  } catch (error) {
    if (retriesLeft > 0) {
      await delay(1000);
      return submitWithRetry(data, retriesLeft - 1);
    }
    throw error;
  }
}

async function onSubmit(data) {
  setSubmitting(true);
  setError(null);

  try {
    await submitWithRetry(data, 2);
    reset();
    onProductAdded();
  } catch (error) {
    setError("Failed to add product after multiple attempts.");
  } finally {
    setSubmitting(false);
  }
}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Product Title"
        {...register("title")}
      />
      {errors.title && <p className="field-error">{errors.title.message}</p>}
      <input
        type="text"
        placeholder="Price"
        {...register("price")}
      />
      {errors.price && <p className="field-error">{errors.price.message}</p>}
      <input
        type="text"
        placeholder="Category"
        {...register("category")}
      />
      {errors.category && <p className="field-error">{errors.category.message}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Product"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default AdminProductForm;