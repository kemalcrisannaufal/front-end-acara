import { IBanner } from "@/src/types/Banner";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import useImageTab from "./useImageTab";
import InputFile from "@/src/components/ui/InputFile";
import { useEffect } from "react";

interface Proptypes {
  currentBanner: string;
  onUpdate: (payload: IBanner) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ImageTab = (props: Proptypes) => {
  const { currentBanner, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlImageUpdate,
    handleSubmitImageUpdate,
    errorsImageUpdate,
    resetImageUpdate,
    handleUploadImage,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    preview,
  } = useImageTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetImageUpdate();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-2 lg:max-w-xl">
      <CardHeader className="flex flex-col items-start">
        <h2 className="font-semibold">Banner Image</h2>
        <p className="text-small text-default-400">
          Manage image of this banner
        </p>
      </CardHeader>

      <CardBody>
        <div>
          <p className="mt-5 text-small">Current Image</p>
          <Skeleton isLoaded={!!currentBanner}>
            <Image
              src={currentBanner}
              alt="banner"
              width={500}
              height={150}
              className="w-full rounded-lg"
            />
          </Skeleton>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitImageUpdate(onUpdate)}
        >
          <Controller
            control={controlImageUpdate}
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
                label={<p className="mt-5 text-small">Upload New Image</p>}
                isInvalid={errorsImageUpdate.image !== undefined}
                errorMessage={errorsImageUpdate.image?.message}
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
        </form>
      </CardBody>
    </Card>
  );
};

export default ImageTab;
