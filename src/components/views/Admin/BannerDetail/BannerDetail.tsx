import { Tab, Tabs } from "@nextui-org/react";
import useBannerDetail from "./useBannerDetail";
import ImageTab from "./ImageTab";
import InfoTab from "./InfoTab";

const BannerDetail = () => {
  const {
    dataBanner,
    isPendingUpdateBanner,
    isSuccessUpdateBanner,
    handleUpdateBannerImage,
    handleUpdateBannerInfo,
  } = useBannerDetail();
  return (
    <div>
      <Tabs>
        <Tab key={"image"} title={"Image"}>
          <ImageTab
            currentBanner={dataBanner?.image}
            isPendingUpdate={isPendingUpdateBanner}
            isSuccessUpdate={isSuccessUpdateBanner}
            onUpdate={handleUpdateBannerImage}
          />
        </Tab>
        <Tab key={"info"} title={"Info"}>
          <InfoTab
            dataBanner={dataBanner}
            isPendingUpdate={isPendingUpdateBanner}
            isSuccessUpdate={isSuccessUpdateBanner}
            onUpdate={handleUpdateBannerInfo}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default BannerDetail;
