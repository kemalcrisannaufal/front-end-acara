import DashboardLayout from "@/src/components/layouts/DashboardLayout";
import DashboardMember from "@/src/components/views/Member/Dashboard";

const DashboardMemberPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      type="member"
      description="Member Dashboard"
    >
      <DashboardMember />
    </DashboardLayout>
  );
};

export default DashboardMemberPage;
