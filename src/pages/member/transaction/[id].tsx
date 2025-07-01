import DashboardLayout from "@/src/components/layouts/DashboardLayout";
import DetailTransaction from "@/src/components/views/Member/DetailTransaction";

const DashboardMemberPage = () => {
  return (
    <DashboardLayout
      title="Detail Transaction"
      type="member"
      description="Information for specific transaction"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
};

export default DashboardMemberPage;
