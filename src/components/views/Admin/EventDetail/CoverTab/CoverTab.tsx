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

import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useCoverTab from "./useCoverTab";

interface Proptypes {
  currentCover: string;
  onUpdate: (payload: { banner: FileList | string }) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const CoverTab = (props: Proptypes) => {
  const { currentCover, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlCoverUpdate,
    handleSubmitCoverUpdate,
    coverUpdateErrors,

    handleUploadCover,
    isPendingMutateUploadFile,
    handleDeleteCover,
    isPendingMutateDeleteFile,

    resetCoverUpdate,
    preview,
  } = useCoverTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetCoverUpdate();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-2 lg:max-w-xl">
      <CardHeader className="flex flex-col items-start">
        <h2 className="font-semibold">Event Cover</h2>
        <p className="text-small text-default-400">
          Manage cover of this event
        </p>
      </CardHeader>

      <CardBody>
        <form onSubmit={handleSubmitCoverUpdate(onUpdate)}>
          <p className="mt-5 text-small">Current Cover</p>

          <Skeleton
            isLoaded={!!currentCover}
            className="aspect-square rounded-lg"
          >
            <Image src={currentCover} alt={"icon"} width={500} height={500} />
          </Skeleton>

          <div className="flex flex-col gap-4">
            <Controller
              control={controlCoverUpdate}
              name="banner"
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeleteCover(onChange)}
                  onUpload={(files) => handleUploadCover(files, onChange)}
                  isUploading={isPendingMutateUploadFile}
                  preview={typeof preview === "string" ? preview : ""}
                  isDeleting={isPendingMutateDeleteFile}
                  isDropable
                  label={<p className="mt-5 text-small">Upload New Icon</p>}
                  isInvalid={coverUpdateErrors.banner !== undefined}
                  errorMessage={coverUpdateErrors.banner?.message}
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

export default CoverTab;
