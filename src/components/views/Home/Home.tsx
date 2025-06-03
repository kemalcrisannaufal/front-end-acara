import HomeCategoryList from "./HomeCategoryList";
import HomeEventList from "./HomeEventList";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";

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
      <HomeSlider banners={dataBanners} isLoadingBanners={isLoadingBanners} />
      <HomeEventList
        title="Featured Event"
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
