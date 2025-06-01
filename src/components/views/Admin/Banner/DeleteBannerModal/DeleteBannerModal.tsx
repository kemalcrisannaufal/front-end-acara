import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";

import { useEffect } from "react";
import useDeleteBannerModal from "./useDeleteBannerModal";

interface Proptypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  selectedId: string;
  refetchBanners: () => void;
}

const DeleteBannerModal = (props: Proptypes) => {
  const { isOpen, onClose, onOpenChange, selectedId, refetchBanners } = props;
  const { handleDeleteBanner, isPendingDeleteBanner, isSuccessDeleteBanner } =
    useDeleteBannerModal();

  useEffect(() => {
    if (isSuccessDeleteBanner) {
      onClose();
      refetchBanners();
    }
  }, [isSuccessDeleteBanner]);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Delete Banner</ModalHeader>
        <ModalBody>
          <p className="text-sm text-default-600">
            Are you sure want to delete this banner?
          </p>
        </ModalBody>
        <ModalFooter className="flex flex-row items-center justify-end gap-2">
          <Button size="sm" variant="flat" color="danger" onPress={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            variant="solid"
            color="danger"
            onPress={() => handleDeleteBanner(selectedId)}
            disabled={isPendingDeleteBanner}
          >
            {isPendingDeleteBanner ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Banner"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBannerModal;
