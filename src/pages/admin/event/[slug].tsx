import DashboardLayout from "@/src/components/layouts/DashboardLayout";
import EventDetail from "@/src/components/views/Admin/EventDetail";

const EventDetailPage = () => {
  return (
    <DashboardLayout
      title="Event"
      type="admin"
      description="Manage information for this event"
    >
      <EventDetail />
    </DashboardLayout>
  );
};

export default EventDetailPage;
