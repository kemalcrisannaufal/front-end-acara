import DashboardLayout from "@/src/components/layouts/DashboardLayout";
import Banner from "@/src/components/views/Admin/Banner";

const AdminBannerPage = () => {
  return (
    <DashboardLayout
      title="Banner"
      type="admin"
      description="List of all banners, create new banner, edit banner, delete banner"
    >
      <Banner />
    </DashboardLayout>
  );
};

export default AdminBannerPage;
