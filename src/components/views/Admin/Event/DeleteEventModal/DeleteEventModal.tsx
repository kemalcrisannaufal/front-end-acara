import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect } from "react";
import useDeleteEventModal from "./useDeleteEventModal";

interface Proptypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  selectedId: string;
  refetchEvents: () => void;
}

const DeleteCategoryModal = (props: Proptypes) => {
  const { isOpen, onClose, onOpenChange, selectedId, refetchEvents } = props;
  const {
    isPendingMutateDeleteEvent,
    handleDeleteEvent,
    isSuccessMutateDeleteEvent,
  } = useDeleteEventModal();

  useEffect(() => {
    if (isSuccessMutateDeleteEvent) {
      onClose();
      refetchEvents();
    }
  }, [isSuccessMutateDeleteEvent]);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Delete Event</ModalHeader>
        <ModalBody>
          <p className="text-default-600 text-sm">
            Are you sure want to delete this event?
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
            onPress={() => handleDeleteEvent(selectedId)}
            disabled={isPendingMutateDeleteEvent}
          >
            Delete Event
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCategoryModal;
