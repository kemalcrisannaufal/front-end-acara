import { Tab, Tabs } from "@nextui-org/react";
import useCategoryDetail from "./useCategoryDetail";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";

const CategoryDetail = () => {
  const {
    dataCategory,
    handleUpdateCategory,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  } = useCategoryDetail();

  return (
    <div>
      <Tabs aria-label="Options">
        <Tab key={"icon"} title="Icon">
          <IconTab
            currentIcon={dataCategory?.icon}
            isPendingUpdate={isPendingMutateUpdateCategory}
            onUpdate={handleUpdateCategory}
            isSuccessUpdate={isSuccessMutateUpdateCategory}
          />
        </Tab>
        <Tab key={"info"} title="Info">
          <InfoTab
            category={dataCategory}
            isPendingUpdate={isPendingMutateUpdateCategory}
            onUpdate={handleUpdateCategory}
            isSuccessUpdate={isSuccessMutateUpdateCategory}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default CategoryDetail;
