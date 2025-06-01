import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import useAddBannerModal from "./useAddBanerModal";
import { Controller } from "react-hook-form";
import InputFile from "@/src/components/ui/InputFile";
import { useEffect } from "react";

interface Proptypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchBanners: () => void;
}

const AddBannerModal = (props: Proptypes) => {
  const { isOpen, onOpenChange, onClose, refetchBanners } = props;
  const {
    controlAddBanner,
    handleSubmitAddBanner,
    errorsAddBanner,

    preview,
    handleUploadImage,
    handleDeleteImage,
    handleOnClose,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    isPendingAddBanner,
    isSuccessAddBanner,
    handleAddBanner,
  } = useAddBannerModal();

  useEffect(() => {
    if (isSuccessAddBanner) {
      refetchBanners();
      onClose();
    }
  }, [isSuccessAddBanner]);

  const disabledAddBanner =
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile ||
    isPendingAddBanner;
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitAddBanner(handleAddBanner)}>
        <ModalContent>
          <ModalHeader>Add Banner</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-md font-bold">Information</p>
              <Controller
                control={controlAddBanner}
                name="title"
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    isInvalid={errorsAddBanner.title !== undefined}
                    errorMessage={errorsAddBanner.title?.message}
                  />
                )}
              />
              <Controller
                control={controlAddBanner}
                name="isShow"
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    variant="bordered"
                    isInvalid={errorsAddBanner.isShow !== undefined}
                    errorMessage={errorsAddBanner.isShow?.message}
                  >
                    <SelectItem key={"true"} value={"true"}>
                      Show
                    </SelectItem>
                    <SelectItem key={"false"} value={"false"}>
                      Hide
                    </SelectItem>
                  </Select>
                )}
              />
            </div>

            <div>
              <Controller
                control={controlAddBanner}
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteImage(onChange)}
                    onUpload={(files) => handleUploadImage(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    preview={typeof preview === "string" ? preview : ""}
                    isDeleting={isPendingMutateDeleteFile}
                    isDropable
                    label={<p>Upload Icon</p>}
                    isInvalid={errorsAddBanner.image !== undefined}
                    errorMessage={errorsAddBanner.image?.message}
                  />
                )}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button size="sm" variant="flat" color="danger" onPress={onClose}>
              Cancel
            </Button>
            <Button
              size="sm"
              variant="solid"
              color="danger"
              type="submit"
              disabled={disabledAddBanner}
            >
              {disabledAddBanner ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Banner"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddBannerModal;
