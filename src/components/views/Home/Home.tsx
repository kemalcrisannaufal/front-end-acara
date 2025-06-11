import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/src/constants/list.constants";
import HomeCategoryList from "./HomeCategoryList";
import HomeEventList from "./HomeEventList";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import HomeAnnouncement from "./HomeAnnouncement";

const Home = () => {
  const {
    dataBanners,
    isLoadingBanners,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    dataLatestEvents,
    isLoadingLatestEvents,
    dataCategory,
    isLoadingCategories,
  } = useHome();

  return (
    <div>
      <HomeAnnouncement />
      <HomeEventList
        title="Featured Event"
        href={`/event?event?limit=${LIMIT_DEFAULT}&isFeatured=true`}
        events={dataFeaturedEvents}
        isLoading={isLoadingFeaturedEvents}
      />
      <HomeSlider banners={dataBanners} isLoadingBanners={isLoadingBanners} />
      <HomeEventList
        title="Latest Event"
        events={dataLatestEvents}
        isLoading={isLoadingLatestEvents}
      />
      <HomeCategoryList
        title="Event By Category"
        categories={dataCategory}
        isLoading={isLoadingCategories}
      />
    </div>
  );
};

export default Home;
