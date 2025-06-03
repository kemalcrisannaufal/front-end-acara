import { LIMIT_LIST } from "@/src/constants/list.constants";
import useChangeUrl from "@/src/hooks/useChangeUrl";
import { Pagination, Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent, Key } from "react";

interface Proptypes {
  totalPages: number;
}

const EventFooter = (props: Proptypes) => {
  const { totalPages } = props;
  const { currentLimit, currentPage, handleChangeLimit, handleChangePage } =
    useChangeUrl();
  return (
    <div className="mt-5 flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
      <Select
        className="w-full max-w-36"
        size="md"
        selectionMode="single"
        startContent={<p className="text-small">Show:</p>}
        selectedKeys={new Set([`${currentLimit}`])}
        onChange={handleChangeLimit}
        disallowEmptySelection
      >
        {LIMIT_LIST.map((limit) => (
          <SelectItem key={limit.value as Key} value={limit.value}>
            {limit.label}
          </SelectItem>
        ))}
      </Select>
      {totalPages > 1 && (
        <Pagination
          color="danger"
          isCompact
          onChange={handleChangePage}
          page={Number(currentPage)}
          showControls
          size="md"
          total={totalPages}
        />
      )}
    </div>
  );
};

export default EventFooter;
