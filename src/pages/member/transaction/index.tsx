import DashboardLayout from "@/src/components/layouts/DashboardLayout";
import TransactionMember from "@/src/components/views/Member/Transaction";

const DashboardMemberPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      type="member"
      description="List of Transaction"
    >
      <TransactionMember />
    </DashboardLayout>
  );
};

export default DashboardMemberPage;
