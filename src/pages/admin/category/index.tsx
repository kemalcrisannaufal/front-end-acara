import DashboardLayout from "@/src/components/layouts/DashboardLayout";
import Category from "@/src/components/views/Admin/Category";

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
