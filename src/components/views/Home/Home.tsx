import HomeList from "./HomeList";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";

const Home = () => {
  const {
    dataBanners,
    isLoadingBanners,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
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
    </div>
  );
};

export default Home;
