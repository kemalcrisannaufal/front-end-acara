import { LIMIT_LIST } from "@/src/constants/List.constants";
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

import { ChangeEvent, Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

interface Proptypes {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  currentPage: number;
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  limit: string;
  onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangePage: (page: number) => void;
  onClearSearch: () => void;
  onClickButtonTopContent?: () => void;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  totalPages: number;
}

const DataTable = (props: Proptypes) => {
  const {
    buttonTopContentLabel,
    columns,
    currentPage,
    data,
    emptyContent,
    isLoading,
    limit,
    onChangeLimit,
    onClearSearch,
    onClickButtonTopContent,
    onChangePage,
    onChangeSearch,
    renderCell,
    totalPages,
  } = props;
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col justify-between gap-y-4 lg:flex-row lg:items-center">
        <Input
          className="w-full max-w-52 lg:max-w-[25%]"
          isClearable
          onChange={onChangeSearch}
          onClear={onClearSearch}
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
    );
  }, [buttonTopContentLabel, onClearSearch, onClickButtonTopContent]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex flex-row items-center justify-center lg:justify-between">
        <Select
          className="hidden w-full max-w-36 lg:block"
          onChange={onChangeLimit}
          selectedKeys={limit}
          selectionMode="single"
          startContent={<p className="text-small">Show:</p>}
          size="md"
        >
          {LIMIT_LIST.map((item) => (
            <SelectItem key={item.label as Key}>{item.value}</SelectItem>
          ))}
        </Select>

        <Pagination
          color="danger"
          isCompact
          onChange={onChangePage}
          page={currentPage}
          showControls
          size="md"
          total={totalPages}
        />
      </div>
    );
  }, [limit, currentPage, totalPages, onChangePage, onChangeLimit]);
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
