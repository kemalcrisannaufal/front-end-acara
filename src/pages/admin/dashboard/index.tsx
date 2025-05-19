import DashboardLayout from "@/src/components/layouts/DashboardLayout";
import DashboardAdmin from "@/src/components/views/Admin/Dashboard";

const AdminDashboardPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      type="admin"
      description="Admin dashboard"
    >
      <DashboardAdmin />
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
