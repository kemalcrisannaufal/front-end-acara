import HomeList from "./HomeList";
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
  } = useHome();

  return (
    <div>
      <HomeSlider banners={dataBanners} isLoadingBanners={isLoadingBanners} />
      <HomeList
        title="Featured Event"
        events={dataFeaturedEvents}
        isLoading={isLoadingFeaturedEvents}
      />
      <HomeSlider banners={dataBanners} isLoadingBanners={isLoadingBanners} />
      <HomeList
        title="Latest Event"
        events={dataLatestEvents}
        isLoading={isLoadingLatestEvents}
      />
    </div>
  );
};

export default Home;
