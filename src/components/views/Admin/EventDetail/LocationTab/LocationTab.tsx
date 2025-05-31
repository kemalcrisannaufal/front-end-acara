import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import useLocationTab from "./useLocationTab";
import { IEvent, IEventForm, IRegency } from "@/src/types/Event";
import { useEffect } from "react";

interface Proptypes {
  dataEvent: IEvent;
  isPendingUpdate: boolean;
  onUpdate: (payload: IEventForm) => void;
  defaultRegion: string;
  isPendingDefaultRegion: boolean;
  isSuccessUpdate: boolean;
  refetchDefaultRegion: () => void;
}

const LocationTab = (props: Proptypes) => {
  const {
    dataEvent,
    isPendingUpdate,
    onUpdate,
    defaultRegion,
    isPendingDefaultRegion,
    isSuccessUpdate,
    refetchDefaultRegion,
  } = props;
  const {
    controlLocationUpdate,
    handleSearchRegion,
    handleSubmitLocationUpdate,
    resetLocationUpdate,
    locationUpdateErrors,
    setValueLocationUpdate,

    dataRegency,
  } = useLocationTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetLocationUpdate();
    }
  }, [isSuccessUpdate]);

  useEffect(() => {
    if (dataEvent) {
      setValueLocationUpdate("isOnline", dataEvent.isOnline ? "true" : "false");
      setValueLocationUpdate(
        "latitude",
        `${dataEvent.location?.coordinates[0]}`,
      );
      setValueLocationUpdate(
        "longitude",
        `${dataEvent.location?.coordinates[1]}`,
      );

      setValueLocationUpdate("region", `${dataEvent.location?.region}`);
      setValueLocationUpdate("address", `${dataEvent.location?.address}`);
    }
  }, [dataEvent, isSuccessUpdate]);

  return (
    <Card className="w-full p-2 lg:max-w-xl">
      <CardHeader className="flex flex-col items-start">
        <h2 className="font-semibold">Event Location</h2>
        <p className="text-small text-default-400">
          Manage location of this event
        </p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmitLocationUpdate(onUpdate)}>
          <div className="flex flex-col gap-4">
            <Controller
              control={controlLocationUpdate}
              name="isOnline"
              render={({ field }) => (
                <Skeleton isLoaded={!!dataEvent}>
                  <Select
                    {...field}
                    label="Online/Offline"
                    variant="bordered"
                    labelPlacement="outside"
                    defaultSelectedKeys={[
                      dataEvent?.isOnline ? "true" : "false",
                    ]}
                    isInvalid={locationUpdateErrors.isOnline !== undefined}
                    errorMessage={locationUpdateErrors.isOnline?.message || ""}
                  >
                    <SelectItem key={"true"} value={"true"}>
                      Online
                    </SelectItem>
                    <SelectItem key={"false"} value={"false"}>
                      Offline
                    </SelectItem>
                  </Select>
                </Skeleton>
              )}
            />

            <Controller
              control={controlLocationUpdate}
              name="latitude"
              render={({ field }) => (
                <Skeleton isLoaded={!!dataEvent}>
                  <Input
                    {...field}
                    label="Latitude"
                    labelPlacement="outside"
                    type="text"
                    isInvalid={locationUpdateErrors.latitude !== undefined}
                    errorMessage={locationUpdateErrors.longitude?.message || ""}
                  />
                </Skeleton>
              )}
            />

            <Controller
              control={controlLocationUpdate}
              name="longitude"
              render={({ field }) => (
                <Skeleton isLoaded={!!dataEvent}>
                  <Input
                    {...field}
                    label="longitude"
                    labelPlacement="outside"
                    type="text"
                    isInvalid={locationUpdateErrors.longitude !== undefined}
                    errorMessage={locationUpdateErrors.longitude?.message || ""}
                  />
                </Skeleton>
              )}
            />

            <Controller
              control={controlLocationUpdate}
              name="region"
              render={({ field: { onChange, ...field } }) => (
                <Skeleton isLoaded={!!dataEvent && !isPendingDefaultRegion}>
                  <Autocomplete
                    {...field}
                    defaultItems={dataRegency?.data.data || []}
                    defaultInputValue={defaultRegion}
                    label="City"
                    variant="bordered"
                    isInvalid={locationUpdateErrors.region !== undefined}
                    errorMessage={locationUpdateErrors.region?.message}
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
                </Skeleton>
              )}
            />

            <Controller
              control={controlLocationUpdate}
              name="address"
              render={({ field }) => (
                <Skeleton isLoaded={!!dataEvent}>
                  <Input
                    {...field}
                    label="Address"
                    labelPlacement="outside"
                    type="text"
                    isInvalid={locationUpdateErrors.longitude !== undefined}
                    errorMessage={locationUpdateErrors.longitude?.message || ""}
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

export default LocationTab;
