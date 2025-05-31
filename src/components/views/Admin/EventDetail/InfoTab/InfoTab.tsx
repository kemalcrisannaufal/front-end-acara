import { IEvent, IEventForm } from "@/src/types/Event";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import useInfoTab from "./useInfoTab";
import { useEffect } from "react";
import { ICategory } from "@/src/types/Category";
import { toInputDate } from "@/src/utils/date";

interface Proptypes {
  dataEvent: IEvent;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  onUpdate: (payload: IEventForm) => void;
}

const InfoTab = (props: Proptypes) => {
  const { dataEvent, isPendingUpdate, isSuccessUpdate, onUpdate } = props;
  const {
    controlInfoUpdate,
    dataCategory,
    infoUpdateErrors,
    handleSubmitInfoUpdate,
    setValueInfoUpdate,
    resetInfoUpdate,
  } = useInfoTab();

  useEffect(() => {
    if (isSuccessUpdate) resetInfoUpdate();
  }, [isSuccessUpdate]);

  useEffect(() => {
    if (dataEvent) {
      setValueInfoUpdate("name", `${dataEvent?.name}`);
      setValueInfoUpdate("description", `${dataEvent?.description}`);
      setValueInfoUpdate("slug", `${dataEvent?.slug}`);
      setValueInfoUpdate("category", `${dataEvent?.category}`);
      setValueInfoUpdate("startDate", toInputDate(`${dataEvent?.startDate}`));
      setValueInfoUpdate("endDate", toInputDate(`${dataEvent?.endDate}`));
      setValueInfoUpdate("isPublish", `${dataEvent?.isPublish}`);
      setValueInfoUpdate("isFeatured", `${dataEvent?.isFeatured}`);
    }
  }, [dataEvent, isSuccessUpdate]);

  return (
    <Card className="w-full p-2 lg:max-w-xl">
      <CardHeader className="flex flex-col items-start">
        <h2 className="font-semibold">Event Information</h2>
        <p className="text-small text-default-400">
          Manage information of this event
        </p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmitInfoUpdate(onUpdate)}>
          <div className="flex flex-col gap-4">
            <Controller
              control={controlInfoUpdate}
              name="name"
              render={({ field }) => (
                <Skeleton isLoaded={!!dataEvent}>
                  <Input
                    {...field}
                    label="Name"
                    labelPlacement="outside"
                    type="text"
                    isInvalid={infoUpdateErrors.name !== undefined}
                    errorMessage={infoUpdateErrors.name?.message || ""}
                  />
                </Skeleton>
              )}
            />
            <Controller
              control={controlInfoUpdate}
              name="slug"
              render={({ field }) => (
                <Skeleton isLoaded={!!dataEvent}>
                  <Input
                    {...field}
                    label="Slug"
                    labelPlacement="outside"
                    type="text"
                    isInvalid={infoUpdateErrors.slug !== undefined}
                    errorMessage={infoUpdateErrors.slug?.message || ""}
                  />
                </Skeleton>
              )}
            />
            <Controller
              control={controlInfoUpdate}
              name="category"
              render={({ field: { onChange, ...field } }) => (
                <Skeleton isLoaded={!!dataEvent}>
                  <Autocomplete
                    {...field}
                    defaultItems={dataCategory?.data.data || []}
                    label="Category"
                    labelPlacement="outside"
                    variant="bordered"
                    placeholder="Select Category here..."
                    onSelectionChange={(value) => onChange(value)}
                    isInvalid={infoUpdateErrors.category !== undefined}
                    defaultSelectedKey={dataEvent?.category}
                    errorMessage={infoUpdateErrors.category?.message || ""}
                  >
                    {(category: ICategory) => (
                      <AutocompleteItem key={category._id}>
                        {category.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </Skeleton>
              )}
            />
            <Controller
              control={controlInfoUpdate}
              name="startDate"
              render={({ field }) => (
                <Skeleton isLoaded={!!dataEvent}>
                  <DatePicker
                    {...field}
                    label="Start Date"
                    variant="bordered"
                    isInvalid={infoUpdateErrors.startDate !== undefined}
                    errorMessage={infoUpdateErrors.startDate?.message}
                    showMonthAndYearPickers
                    hideTimeZone
                    defaultValue={toInputDate(`${dataEvent?.startDate}`)}
                  />
                </Skeleton>
              )}
            />
            <Controller
              control={controlInfoUpdate}
              name="endDate"
              render={({ field }) => (
                <Skeleton isLoaded={!!dataEvent}>
                  <DatePicker
                    {...field}
                    label="End Date"
                    variant="bordered"
                    isInvalid={infoUpdateErrors.endDate !== undefined}
                    errorMessage={infoUpdateErrors.endDate?.message}
                    showMonthAndYearPickers
                    hideTimeZone
                    defaultValue={toInputDate(`${dataEvent?.endDate}`)}
                  />
                </Skeleton>
              )}
            />

            <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
              <Controller
                name="isPublish"
                control={controlInfoUpdate}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    variant="bordered"
                    isInvalid={infoUpdateErrors.isPublish !== undefined}
                    errorMessage={infoUpdateErrors.isPublish?.message}
                    disallowEmptySelection
                    defaultSelectedKeys={[
                      dataEvent?.isPublish ? "true" : "false",
                    ]}
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
            </Skeleton>

            <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
              <Controller
                name="isFeatured"
                control={controlInfoUpdate}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Featured"
                    variant="bordered"
                    isInvalid={infoUpdateErrors.isFeatured !== undefined}
                    errorMessage={infoUpdateErrors.isFeatured?.message}
                    disallowEmptySelection
                    defaultSelectedKeys={[
                      dataEvent?.isFeatured ? "true" : "false",
                    ]}
                  >
                    <SelectItem key="true" value="true">
                      Yes
                    </SelectItem>
                    <SelectItem key="false" value="false">
                      No
                    </SelectItem>
                  </Select>
                )}
              />
            </Skeleton>

            <Controller
              control={controlInfoUpdate}
              name="description"
              render={({ field }) => (
                <Skeleton isLoaded={!!dataEvent}>
                  <Textarea
                    {...field}
                    label="Description"
                    labelPlacement="outside"
                    type="text"
                    isInvalid={infoUpdateErrors.description !== undefined}
                    errorMessage={infoUpdateErrors.description?.message || ""}
                  />
                </Skeleton>
              )}
            />

            <Button
              size="sm"
              color="danger"
              className="disabled:bg-default-500"
              disabled={isPendingUpdate}
              type="submit"
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

export default InfoTab;
