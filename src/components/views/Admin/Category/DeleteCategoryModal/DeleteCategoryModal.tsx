import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import useDeleteCategoryModal from "./useDeleteCategoryModal";
import { useEffect } from "react";

interface Proptypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  selectedId: string;
  refetchCategory: () => void;
}

const DeleteCategoryModal = (props: Proptypes) => {
  const { isOpen, onClose, onOpenChange, selectedId, refetchCategory } = props;
  const {
    isPendingMutateDeleteCategory,
    handleDeleteCategory,
    isSuccessMutateDeleteCategory,
  } = useDeleteCategoryModal();

  useEffect(() => {
    if (isSuccessMutateDeleteCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessMutateDeleteCategory]);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Delete Category</ModalHeader>
        <ModalBody>
          <p className="text-sm text-default-600">
            Are you sure want to delete this category?
          </p>
        </ModalBody>
        <ModalFooter className="flex flex-row items-center justify-end gap-2">
          <Button size="sm" variant="flat" color="danger">
            Cancel
          </Button>
          <Button
            size="sm"
            variant="solid"
            color="danger"
            onPress={() => handleDeleteCategory(selectedId)}
            disabled={isPendingMutateDeleteCategory}
          >
            Delete Category
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCategoryModal;
