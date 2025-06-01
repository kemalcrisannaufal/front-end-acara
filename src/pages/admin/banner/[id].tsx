import DashboardLayout from "@/src/components/layouts/DashboardLayout";
import BannerDetail from "@/src/components/views/Admin/BannerDetail";

const BannerDetailPage = () => {
  return (
    <DashboardLayout
      title="Banner"
      type="admin"
      description="Manage information for this banner"
    >
      <BannerDetail />
    </DashboardLayout>
  );
};

export default BannerDetailPage;
