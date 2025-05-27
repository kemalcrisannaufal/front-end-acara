import DataTable from "@/src/components/ui/DataTable";
import { useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMNS_LIST_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import useChangeUrl from "@/src/hooks/useChangeUrl";
import { DropdownActions } from "@/src/components/common/DropdownActions";
const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory,
    selectedId,
    setSelectedId,
  } = useCategory();
  const { setURL } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const addCategory = useDisclosure();
  const deleteCategory = useDisclosure();

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image
              src={`${cellValue}` as string}
              alt="icon"
              width={100}
              height={1000}
            />
          );

        case "actions":
          return (
            <DropdownActions
              onPressButtonDetail={() =>
                push(`/admin/category/${category._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(category._id as string);
                deleteCategory.onOpen();
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
          buttonTopContentLabel="Create Category"
          columns={COLUMNS_LIST_CATEGORY}
          data={dataCategory?.data || []}
          emptyContent="Category not found"
          isLoading={isLoadingCategory || isRefetchingCategory}
          onClickButtonTopContent={addCategory.onOpen}
          renderCell={renderCell}
          totalPages={dataCategory?.pagination.totalPage}
        />
      )}

      <AddCategoryModal {...addCategory} refetchCategory={refetchCategory} />
      <DeleteCategoryModal
        {...deleteCategory}
        selectedId={selectedId}
        refetchCategory={refetchCategory}
      />
    </section>
  );
};

export default Category;
