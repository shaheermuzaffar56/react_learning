import { useState } from "react";
import api from "../../api/axiosInstance";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "./adminProductSchema";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
      <TextField
        label="Product Title"
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <TextField
        label="Price"
        {...register("price")}
        error={!!errors.price}
        helperText={errors.price?.message}
      />
      <TextField
        label="Category"
        {...register("category")}
        error={!!errors.category}
        helperText={errors.category?.message}
      />
      <Button type="submit" variant="contained" disabled={submitting}>
        {submitting ? "Adding..." : "Add Product"}
      </Button>
    </Box>
  );
}

export default AdminProductForm;