import DashboardLayout from "@/src/components/layouts/DashboardLayout";
import Category from "@/src/components/views/Admin/Category";
import DashboardAdmin from "@/src/components/views/Admin/Dashboard";

const AdminCategoryPage = () => {
  return (
    <DashboardLayout
      title="Category"
      type="admin"
      description="List of all Categories, create new category, edit category, delete category"
    >
      <Category />
    </DashboardLayout>
  );
};

export default AdminCategoryPage;
