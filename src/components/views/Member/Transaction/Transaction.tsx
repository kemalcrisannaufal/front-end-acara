import DataTable from "@/src/components/ui/DataTable";
import { Chip } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/src/hooks/useChangeUrl";
import { DropdownActions } from "@/src/components/common/DropdownActions";
import { COLUMNS_LIST_BANNER } from "./Transaction.constants";
import useTransaction from "./useTransaction";
import { convertToIDR } from "@/src/utils/currency";

const TransactionMember = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataMemberTransaction,
    isLoadingMemberTransaction,
    isRefetchingMemberTransaction,
  } = useTransaction();
  const { setURL } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction];

      switch (columnKey) {
        case "status":
          return (
            <Chip
              color={cellValue === "completed" ? "success" : "warning"}
              variant="flat"
              size="sm"
            >
              {cellValue as ReactNode}
            </Chip>
          );

        case "total":
          return convertToIDR(Number(cellValue));

        case "actions":
          return (
            <DropdownActions
              onPressButtonDetail={() =>
                push(`/member/transaction/${transaction.orderId}`)
              }
              hideButtonDelete
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
          columns={COLUMNS_LIST_BANNER}
          data={dataMemberTransaction?.data || []}
          emptyContent="Transaction not found"
          isLoading={
            isLoadingMemberTransaction || isRefetchingMemberTransaction
          }
          renderCell={renderCell}
          totalPages={dataMemberTransaction?.pagination.totalPage}
          showSearch={true}
        />
      )}
    </section>
  );
};

export default TransactionMember;
