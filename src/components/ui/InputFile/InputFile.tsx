import { cn } from "@/src/utils/cn";
import { Button, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { ChangeEvent, useId, useState } from "react";
import { CiSaveUp2, CiTrash } from "react-icons/ci";

interface Proptypes {
  classname?: string;
  errorMessage?: string;
  name: string;
  isDropable?: boolean;
  isDeleting?: boolean;
  isInvalid?: boolean;
  isUploading?: boolean;
  onDelete?: () => void;
  onUpload?: (files: FileList) => void;
  preview?: string;
}

const InputFile = (props: Proptypes) => {
  const {
    classname,
    errorMessage,
    name,
    isDropable = false,
    isDeleting,
    isInvalid,
    isUploading,
    onDelete,
    onUpload,
    preview,
  } = props;
  const dropzoneId = useId();

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
      const files = e.dataTransfer.files;
      if (files && onUpload) {
        onUpload(files);
      }
    }
  };

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  return (
    <div>
      <label
        htmlFor={`dropzone-file-${dropzoneId}`}
        className={cn(
          `flex min-h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100`,
          classname,
          { "border-danger-500": isInvalid },
        )}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {preview && (
          <div className="relative flex flex-col items-center justify-center">
            <div className="mb-2 w-1/2 overflow-hidden">
              <Image
                src={preview}
                alt={"preview"}
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
            <Button
              className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-danger-100"
              disabled={isDeleting}
              isIconOnly
              onPress={onDelete}
            >
              {isDeleting ? (
                <Spinner size="sm" color="danger" />
              ) : (
                <CiTrash className="h-5 w-5 text-danger-500" />
              )}
            </Button>
          </div>
        )}

        {!preview && !isUploading && (
          <div className="flex flex-col items-center justify-center">
            <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-500" />
            <p className="mb-2 text-center text-sm font-semibold text-gray-500">
              {isDropable
                ? "Drag and drop or click to upload file here"
                : "Click to upload file here"}
            </p>
          </div>
        )}

        {isUploading && (
          <div className="items-centre flex flex-col justify-center p-5">
            <Spinner color="danger" />
          </div>
        )}

        <input
          name={name}
          id={`dropzone-file-${dropzoneId}`}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleOnUpload}
          disabled={preview !== ""}
          onClick={(e) => {
            e.currentTarget.value = "";
            e.target.dispatchEvent(new Event("change", { bubbles: true }));
          }}
        />
      </label>
      {errorMessage && (
        <p className="mt-1 text-sm text-danger-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
