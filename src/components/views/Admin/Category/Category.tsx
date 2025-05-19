import DataTable from "@/src/components/ui/DataTable";
import { Button } from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react";
import { DropdownItem } from "@nextui-org/react";
import { DropdownMenu } from "@nextui-org/react";
import { DropdownTrigger } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMNS_LIST_CATEGORY } from "./Category.constants";
import { LIMIT_LIST } from "@/src/constants/List.constants";

const Category = () => {
  const { push } = useRouter();
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
      <DataTable
        buttonTopContentLabel="Create Category"
        columns={COLUMNS_LIST_CATEGORY}
        currentPage={1}
        data={[
          {
            _id: "123",
            name: "category-1",
            description: "description-1",
            icon: "/images/general/logo.png",
          },
        ]}
        emptyContent="Category not found"
        limit={LIMIT_LIST[0].label}
        onChangeLimit={() => {}}
        onChangePage={() => {}}
        onClearSearch={() => {}}
        onClickButtonTopContent={() => {}}
        onChangeSearch={() => {}}
        renderCell={renderCell}
        totalPages={5}
      />
    </section>
  );
};

export default Category;
