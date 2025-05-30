import DashboardLayout from "@/src/components/layouts/DashboardLayout";
import CategoryDetail from "@/src/components/views/Admin/CategoryDetail";

const CategoryDetailPage = () => {
  return (
    <DashboardLayout
      title="Category"
      type="admin"
      description="Manage information for this category"
    >
      <CategoryDetail />
    </DashboardLayout>
  );
};

export default CategoryDetailPage;
