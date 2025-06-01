import {
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
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { IBanner, IBannerForm } from "@/src/types/Banner";
import { useEffect } from "react";

interface Proptypes {
  dataBanner: IBanner;
  onUpdate: (payload: IBannerForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: Proptypes) => {
  const { dataBanner, isPendingUpdate, isSuccessUpdate, onUpdate } = props;
  const { controlInfo, handleSubmitInfo, infoErrors, resetInfo, setValueInfo } =
    useInfoTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetInfo();
    }
  }, [isSuccessUpdate]);

  useEffect(() => {
    if (dataBanner) {
      setValueInfo("title", `${dataBanner.title}`);
      setValueInfo("isShow", `${dataBanner.isShow}`);
    }
  }, [dataBanner]);

  return (
    <Card className="w-full p-2 lg:max-w-xl">
      <CardHeader className="flex flex-col items-start">
        <h2 className="font-semibold">Banner Details</h2>
        <p className="text-small text-default-400">
          Manage information of this banner
        </p>
      </CardHeader>

      <CardBody>
        <form
          onSubmit={handleSubmitInfo(onUpdate)}
          className="flex flex-col gap-4"
        >
          <Skeleton isLoaded={!!dataBanner}>
            <Controller
              control={controlInfo}
              name="title"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Title"
                  labelPlacement="outside"
                  isInvalid={infoErrors.title !== undefined}
                  errorMessage={infoErrors.title?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataBanner}>
            <Controller
              control={controlInfo}
              name="isShow"
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status"
                  variant="bordered"
                  isInvalid={infoErrors.isShow !== undefined}
                  errorMessage={infoErrors.isShow?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[dataBanner?.isShow ? "true" : "false"]}
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
          </Skeleton>
          <Button
            type="submit"
            color="danger"
            fullWidth
            disabled={isPendingUpdate}
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

export default InfoTab;
