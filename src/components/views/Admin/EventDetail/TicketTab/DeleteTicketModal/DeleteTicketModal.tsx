import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import useDeleteTicketModal from "./useDeleteTicketModal";
import { useEffect } from "react";

interface Proptypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchTickets: () => void;
  selectedId: string;
}

const DeleteTicketModal = (props: Proptypes) => {
  const { isOpen, onOpenChange, onClose, refetchTickets, selectedId } = props;
  const {
    handleDeleteTicket,
    isPendingMutateDeleteTicket,
    isSuccessMutateDeleteTicket,
  } = useDeleteTicketModal();

  useEffect(() => {
    if (isSuccessMutateDeleteTicket) {
      onClose();
      refetchTickets();
    }
  }, [isSuccessMutateDeleteTicket]);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Delete Ticket</ModalHeader>
        <ModalBody>
          <p className="text-default-600 text-sm">
            Are you sure want to delete this ticket?
          </p>
        </ModalBody>
        <ModalFooter className="flex flex-row justify-end items-center gap-2">
          <Button size="sm" variant="flat" color="danger" onPress={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            variant="solid"
            color="danger"
            onPress={() => handleDeleteTicket(selectedId)}
            disabled={isPendingMutateDeleteTicket}
          >
            Delete Ticket
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTicketModal;
