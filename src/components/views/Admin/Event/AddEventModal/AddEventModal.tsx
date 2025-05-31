import InputFile from "@/src/components/ui/InputFile";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import useAddEventModal from "./useAddEventModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/src/types/Category";
import { IRegency } from "@/src/types/Event";
import { getLocalTimeZone, now } from "@internationalized/date";

interface Proptypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchEvents: () => void;
}

const AddEventModal = (props: Proptypes) => {
  const { isOpen, onOpenChange, onClose, refetchEvents } = props;

  const {
    control,
    errors,
    handleAddEvent,
    handleSubmitForm,
    isPendingMutateAddEvent,
    isSuccessAddEvent,

    handleUploadBanner,
    handleDeleteBanner,
    handleOnClose,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    preview,

    dataCategory,

    dataRegency,
    handleSearchRegion,
  } = useAddEventModal();

  const disabledSubmit =
    isPendingMutateAddEvent ||
    isPendingMutateDeleteFile ||
    isPendingMutateUploadFile;

  useEffect(() => {
    if (isSuccessAddEvent) {
      onClose();
      refetchEvents();
    }
  }, [isSuccessAddEvent]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddEvent)}>
        <ModalContent className="m-4">
          <>
            <ModalHeader>Add Event</ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4">
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
                        variant="bordered"
                        isInvalid={errors.name !== undefined}
                        errorMessage={errors.name?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="slug"
                    render={({ field }) => (
                      <Input
                        {...field}
                        autoFocus
                        label="Slug"
                        type="text"
                        variant="bordered"
                        isInvalid={errors.slug !== undefined}
                        errorMessage={errors.slug?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="category"
                    render={({ field: { onChange, ...field } }) => (
                      <Autocomplete
                        {...field}
                        defaultItems={dataCategory?.data.data || []}
                        label="Category"
                        variant="bordered"
                        isInvalid={errors.category !== undefined}
                        errorMessage={errors.category?.message}
                        onSelectionChange={(value) => onChange(value)}
                        placeholder="Select Category here..."
                      >
                        {(category: ICategory) => (
                          <AutocompleteItem key={category._id}>
                            {category.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    )}
                  />
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label="Start Date"
                        variant="bordered"
                        isInvalid={errors.startDate !== undefined}
                        errorMessage={errors.startDate?.message}
                        showMonthAndYearPickers
                        hideTimeZone
                        defaultValue={now(getLocalTimeZone())}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label="End Date"
                        variant="bordered"
                        isInvalid={errors.endDate !== undefined}
                        errorMessage={errors.endDate?.message}
                        showMonthAndYearPickers
                        hideTimeZone
                        defaultValue={now(getLocalTimeZone())}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="isPublish"
                    render={({ field }) => (
                      <Select
                        {...field}
                        autoFocus
                        label="Status"
                        variant="bordered"
                        isInvalid={errors.isPublish !== undefined}
                        errorMessage={errors.isPublish?.message}
                      >
                        <SelectItem key="true" value="true">
                          Publish
                        </SelectItem>
                        <SelectItem key="false" value="false">
                          Draft
                        </SelectItem>
                      </Select>
                    )}
                  />

                  <Controller
                    control={control}
                    name="isFeatured"
                    render={({ field }) => (
                      <Select
                        {...field}
                        autoFocus
                        label="Featured"
                        variant="bordered"
                        isInvalid={errors.isFeatured !== undefined}
                        errorMessage={errors.isFeatured?.message}
                      >
                        <SelectItem key="true" value="true">
                          Featured
                        </SelectItem>
                        <SelectItem key="false" value="false">
                          Not Featured
                        </SelectItem>
                      </Select>
                    )}
                  />

                  <Controller
                    control={control}
                    name="isOnline"
                    render={({ field }) => (
                      <Select
                        {...field}
                        autoFocus
                        label="Online/Offline"
                        variant="bordered"
                        isInvalid={errors.isOnline !== undefined}
                        errorMessage={errors.isOnline?.message}
                      >
                        <SelectItem key="true" value="true">
                          Online
                        </SelectItem>
                        <SelectItem key="false" value="false">
                          Offline
                        </SelectItem>
                      </Select>
                    )}
                  />

                  <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Description"
                        variant="bordered"
                        isInvalid={errors.description !== undefined}
                        errorMessage={errors.description?.message}
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <p className="text-md font-bold">Location</p>
                  <Controller
                    control={control}
                    name="region"
                    render={({ field: { onChange, ...field } }) => (
                      <Autocomplete
                        {...field}
                        defaultItems={dataRegency?.data.data || []}
                        label="City"
                        variant="bordered"
                        isInvalid={errors.region !== undefined}
                        errorMessage={errors.region?.message}
                        onSelectionChange={(value) => onChange(value)}
                        onInputChange={(value) => handleSearchRegion(value)}
                        placeholder="Select Location here..."
                      >
                        {(regency: IRegency) => (
                          <AutocompleteItem key={regency.id}>
                            {regency.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    )}
                  />
                  <Controller
                    control={control}
                    name="latitude"
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Latitude"
                        variant="bordered"
                        isInvalid={errors.latitude !== undefined}
                        errorMessage={errors.latitude?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="longitude"
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Longitude"
                        variant="bordered"
                        isInvalid={errors.longitude !== undefined}
                        errorMessage={errors.longitude?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="address"
                    render={({ field }) => (
                      <Input
                        {...field}
                        autoFocus
                        label="Address"
                        variant="bordered"
                        isInvalid={errors.address !== undefined}
                        errorMessage={errors.address?.message}
                      />
                    )}
                  />
                </div>

                <div>
                  <p className="text-md font-bold">Cover</p>
                  <Controller
                    control={control}
                    name="banner"
                    render={({ field: { onChange, value, ...field } }) => (
                      <InputFile
                        {...field}
                        onDelete={() => handleDeleteBanner(onChange)}
                        onUpload={(files) =>
                          handleUploadBanner(files, onChange)
                        }
                        isUploading={isPendingMutateUploadFile}
                        preview={typeof preview === "string" ? preview : ""}
                        isDeleting={isPendingMutateDeleteFile}
                        isDropable
                        isInvalid={errors.banner !== undefined}
                        errorMessage={errors.banner?.message}
                      />
                    )}
                  />
                </div>
              </form>
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
                {isPendingMutateAddEvent ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Create Event"
                )}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddEventModal;
