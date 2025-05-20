import InputFile from "@/src/components/ui/InputFile";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface Proptypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchCategory: () => void;
}

const AddCategoryModal = (props: Proptypes) => {
  const { isOpen, onOpenChange, onClose, refetchCategory } = props;
  const {
    control,
    errors,
    handleAddCategory,
    handleSubmitForm,
    isPendingMutateAddCategory,
    isSuccessAddCategory,

    handleUploadIcon,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    preview,

    handleOnClose,
  } = useAddCategoryModal();

  const disabledSubmit =
    isPendingMutateAddCategory ||
    isPendingMutateDeleteFile ||
    isPendingMutateUploadFile;

  useEffect(() => {
    if (isSuccessAddCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessAddCategory]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <>
            <ModalHeader>Add Category</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <p className="text-md font-bold">Information</p>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Name"
                      type="text"
                      variant="bordered"
                      isInvalid={errors.name !== undefined}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Description"
                      type="text"
                      variant="bordered"
                      isInvalid={errors.description !== undefined}
                      errorMessage={errors.description?.message}
                    />
                  )}
                />
              </div>

              <p className="text-md font-bold">Icon</p>
              <Controller
                control={control}
                name="icon"
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteIcon(onChange)}
                    onUpload={(files) => handleUploadIcon(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    preview={typeof preview === "string" ? preview : ""}
                    isDeleting={isPendingMutateDeleteFile}
                    isDropable
                    isInvalid={errors.icon !== undefined}
                    errorMessage={errors.icon?.message}
                  />
                )}
              />
            </ModalBody>
            <ModalFooter className="flex flex-row items-center justify-end">
              <Button
                color="danger"
                onPress={() => handleOnClose(onClose)}
                variant="flat"
                type="button"
              >
                Cancel
              </Button>
              <Button
                color="danger"
                variant="solid"
                type="submit"
                disabled={disabledSubmit}
              >
                {isPendingMutateAddCategory ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Create Category"
                )}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
