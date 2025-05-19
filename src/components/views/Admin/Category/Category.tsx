import DataTable from "@/src/components/ui/DataTable";
import { Button } from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react";
import { DropdownItem } from "@nextui-org/react";
import { DropdownMenu } from "@nextui-org/react";
import { DropdownTrigger } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMNS_LIST_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";
import InputFile from "@/src/components/ui/InputFile";

const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    currentLimit,
    dataCategory,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
    isLoadingCategory,
    isRefetchingCategory,
  } = useCategory();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        // case "icon":
        //   return (
        //     <Image
        //       src={`${cellValue}` as string}
        //       alt="icon"
        //       width={100}
        //       height={1000}
        //     />
        //   );

        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key={"detail-category-btn"}
                  onPress={() => push(`/admin/category/${category._id}`)}
                >
                  Detail Category
                </DropdownItem>
                <DropdownItem
                  key={"detail-category-btn"}
                  className="text-danger-500"
                >
                  Delete Category
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
          currentPage={Number(dataCategory?.pagination.current)}
          data={dataCategory?.data || []}
          emptyContent="Category not found"
          isLoading={isLoadingCategory || isRefetchingCategory}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          onChangePage={(page: number) => handleChangePage(page)}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={() => {}}
          onChangeSearch={handleSearch}
          renderCell={renderCell}
          totalPages={dataCategory?.pagination.totalPages}
        />
      )}
      <InputFile name="da" isDropable />
    </section>
  );
};

export default Category;
