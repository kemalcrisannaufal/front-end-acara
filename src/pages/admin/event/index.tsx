import DashboardLayout from "@/src/components/layouts/DashboardLayout";
import Event from "@/src/components/views/Admin/Event";

const AdminEventPage = () => {
  return (
    <DashboardLayout
      title="Event"
      type="admin"
      description="List of all Events, create new event, edit event, delete event"
    >
      <Event />
    </DashboardLayout>
  );
};

export default AdminEventPage;
