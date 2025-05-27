import InputFile from "@/src/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { boolean } from "yup";

interface Proptypes {
  currentIcon: string;
  onUpdate: (payload: { icon: FileList | string }) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const IconTab = (props: Proptypes) => {
  const { currentIcon, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlIconUpdate,
    handleSubmitIconUpdate,
    iconUpdateErrors,

    handleUploadIcon,
    isPendingMutateUploadFile,
    handleDeleteIcon,
    isPendingMutateDeleteFile,

    resetIconUpdate,
    preview,
  } = useIconTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetIconUpdate();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-2 lg:max-w-xl">
      <CardHeader className="flex flex-col items-start">
        <h2 className="font-semibold">Category Icon</h2>
        <p className="text-small text-default-400">
          Manage icon of this category
        </p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmitIconUpdate(onUpdate)}>
          <p className="mt-5 text-small">Current Icon</p>

          <Skeleton
            isLoaded={!!currentIcon}
            className="aspect-square rounded-lg"
          >
            <Image src={currentIcon} alt={"icon"} width={500} height={500} />
          </Skeleton>

          <div className="flex flex-col gap-4">
            <Controller
              control={controlIconUpdate}
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
                  label={<p className="mt-5 text-small">Upload New Icon</p>}
                  isInvalid={iconUpdateErrors.icon !== undefined}
                  errorMessage={iconUpdateErrors.icon?.message}
                />
              )}
            />

            <Button
              type="submit"
              color="danger"
              className="disabled:bg-default-500"
              disabled={
                isPendingMutateUploadFile ||
                isPendingMutateDeleteFile ||
                isPendingUpdate ||
                !preview
              }
            >
              {isPendingUpdate ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default IconTab;
