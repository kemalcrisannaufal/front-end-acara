import DataTable from "@/src/components/ui/DataTable";
import { Chip, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/src/hooks/useChangeUrl";
import { DropdownActions } from "@/src/components/common/DropdownActions";
import useBanner from "./useBanner";
import { COLUMNS_LIST_BANNER } from "./Banner.constants";
import AddBannerModal from "./AddBannerModal";
import DeleteBannerModal from "./DeleteBannerModal";

const Banner = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataBanner,
    isLoadingBanner,
    isRefetchingBanner,
    refetchBanner,

    selectedId,
    setSelectedId,
  } = useBanner();
  const { setURL } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const addBanner = useDisclosure();
  const deleteBanner = useDisclosure();

  const renderCell = useCallback(
    (banner: Record<string, unknown>, columnKey: Key) => {
      const cellValue = banner[columnKey as keyof typeof banner];

      switch (columnKey) {
        case "image":
          return (
            <Image
              src={`${cellValue}` as string}
              alt="image"
              width={500}
              height={1000}
            />
          );

        case "isShow":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              variant="flat"
              size="sm"
            >
              {cellValue ? "Published" : "Not Published"}
            </Chip>
          );

        case "actions":
          return (
            <DropdownActions
              onPressButtonDetail={() => push(`/admin/banner/${banner._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(banner._id as string);
                deleteBanner.onOpen();
              }}
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Banner"
          columns={COLUMNS_LIST_BANNER}
          data={dataBanner?.data || []}
          emptyContent="Banner not found"
          isLoading={isLoadingBanner || isRefetchingBanner}
          onClickButtonTopContent={addBanner.onOpen}
          renderCell={renderCell}
          totalPages={dataBanner?.pagination.totalPage}
        />
      )}

      <AddBannerModal {...addBanner} refetchBanners={refetchBanner} />
      <DeleteBannerModal
        {...deleteBanner}
        refetchBanners={refetchBanner}
        selectedId={selectedId}
      />
    </section>
  );
};

export default Banner;
