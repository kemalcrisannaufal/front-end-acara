import { cn } from "@/src/utils/cn";
import Image from "next/image";
import { ChangeEvent, useId, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";

interface Proptypes {
  classname?: string;
  isDropable?: boolean;
  name: string;
}

const InputFile = ({ classname, isDropable = false, name }: Proptypes) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
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
      if (files && files.length > 0) {
        setUploadedImage(files[0]);
      }
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setUploadedImage(files[0]);
    }
  };

  return (
    <label
      htmlFor={`dropzone-file-${dropzoneId}`}
      className={cn(
        `flex min-h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100`,
        classname,
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {uploadedImage ? (
        <div className="flex flex-col items-center justify-center">
          <div className="mb-2 w-1/2 overflow-hidden">
            <Image
              src={URL.createObjectURL(uploadedImage)}
              alt={uploadedImage.name}
              width={200}
              height={200}
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mb-2 text-center text-sm font-semibold text-gray-500">
            {uploadedImage.name}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-500" />
          <p className="mb-2 text-center text-sm font-semibold text-gray-500">
            {isDropable
              ? "Drag and drop or click to upload file here"
              : "Click to upload file here"}
          </p>
        </div>
      )}
      <input
        name={name}
        id={`dropzone-file-${dropzoneId}`}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleOnChange}
      />
    </label>
  );
};

export default InputFile;
