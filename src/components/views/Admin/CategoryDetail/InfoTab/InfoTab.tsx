import { ICategory } from "@/src/types/Category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import useInfoTab from "./useInfoTab";
import { use, useEffect } from "react";

type Proptypes = {
  category: ICategory;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  onUpdate: (payload: ICategory) => void;
};

const InfoTab = (props: Proptypes) => {
  const { category, isPendingUpdate, isSuccessUpdate, onUpdate } = props;
  const {
    controlInfoUpdate,
    handleSubmitInfoUpdate,
    infoUpdateErrors,
    resetInfoUpdate,
    setValueInfoUpdate,
  } = useInfoTab();

  useEffect(() => {
    setValueInfoUpdate("name", category.name || "");
    setValueInfoUpdate("description", category.description || "");
  }, [isSuccessUpdate, category]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetInfoUpdate();
    }
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full p-2 lg:max-w-xl">
      <CardHeader className="flex flex-col items-start">
        <h2 className="font-semibold">Category Information</h2>
        <p className="text-small text-default-400">
          Manage information of this category
        </p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmitInfoUpdate(onUpdate)}>
          <div className="mt-5 flex flex-col gap-4">
            <Controller
              control={controlInfoUpdate}
              name="name"
              render={({ field }) => (
                <Skeleton isLoaded={!!category.name}>
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
              name="description"
              render={({ field }) => (
                <Skeleton isLoaded={!!category.description}>
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
