import DashboardLayout from "@/src/components/layouts/DashboardLayout";
import CategoryDetail from "@/src/components/views/Admin/CategoryDetail";
import { useRouter } from "next/router";

const CategoryDetailPage = () => {
  const id = useRouter().query.id as string;
  return (
    <DashboardLayout
      title="Category"
      type="admin"
      description="Manage information for this category"
    >
      <CategoryDetail id={id} />
    </DashboardLayout>
  );
};

export default CategoryDetailPage;
