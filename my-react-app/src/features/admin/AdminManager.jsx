import { useState } from "react";
import AdminProductList from "./AdminProductList";
import AdminProductForm from "./AdminProductForm";

function AdminManager() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  function handleProductAdded() {
    setRefreshTrigger((prev) => prev + 1);
  }

  return (
    <div>
      <h1>Admin — Product Management</h1>

      <AdminProductForm onProductAdded={handleProductAdded} />

      <AdminProductList refreshTrigger={refreshTrigger} />
    </div>
  );
}

export default AdminManager;