import LandingPageLayout from "@/src/components/layouts/LandingPageLayout";
import EventDetail from "@/src/components/views/EventDetail";

const EventDetailPage = () => {
  return (
    <LandingPageLayout title="Event">
      <EventDetail />
    </LandingPageLayout>
  );
};

export default EventDetailPage;
