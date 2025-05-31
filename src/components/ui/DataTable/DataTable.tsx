import { LIMIT_LIST } from "@/src/constants/list.constants";
import useChangeUrl from "@/src/hooks/useChangeUrl";
import { cn } from "@/src/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

interface Proptypes {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  onClickButtonTopContent?: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  totalPages: number;
  showSearch?: boolean;
  showLimit?: boolean;
}

const DataTable = (props: Proptypes) => {
  const {
    buttonTopContentLabel,
    columns,
    data,
    emptyContent,
    isLoading,
    onClickButtonTopContent,
    renderCell,
    totalPages,
    showSearch = true,
    showLimit = true,
  } = props;

  const {
    currentLimit,
    currentPage,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
  } = useChangeUrl();

  const topContent = useMemo(() => {
    return showSearch ? (
      <div
        className={
          "flex flex-col justify-between gap-y-4 lg:flex-row lg:items-center"
        }
      >
        <Input
          className="w-full max-w-52 lg:max-w-[25%]"
          isClearable
          onChange={handleSearch}
          onClear={handleClearSearch}
          placeholder="Search by Name"
          startContent={<CiSearch />}
        />

        {buttonTopContentLabel && (
          <Button
            className="w-max"
            color="danger"
            onPress={onClickButtonTopContent}
          >
            <p className="text-small">{buttonTopContentLabel}</p>
          </Button>
        )}
      </div>
    ) : null;
  }, [
    buttonTopContentLabel,
    handleClearSearch,
    handleSearch,
    onClickButtonTopContent,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex flex-row items-center justify-center lg:justify-between">
        {showLimit && (
          <Select
            className="hidden w-full max-w-36 lg:block"
            onChange={handleChangeLimit}
            selectedKeys={new Set([`${currentLimit}`])}
            selectionMode="single"
            startContent={<p className="text-small">Show:</p>}
            size="md"
            disallowEmptySelection
          >
            {LIMIT_LIST.map((item) => (
              <SelectItem key={item.value as Key} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
        )}

        {totalPages > 1 && (
          <Pagination
            color="danger"
            isCompact
            onChange={handleChangePage}
            page={Number(currentPage)}
            showControls
            size="md"
            total={totalPages}
            loop
          />
        )}
      </div>
    );
  }, [
    currentLimit,
    currentPage,
    totalPages,
    handleChangeLimit,
    handleChangePage,
  ]);
  return (
    <Table
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        emptyContent={emptyContent}
        isLoading={isLoading}
        items={data}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur">
            <Spinner color="danger" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
export default DataTable;
