import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { ICategory } from "@/src/types/Category";
import useEventFilter from "./useEventFilter";
import { Controller } from "react-hook-form";
import useChangeUrl from "@/src/hooks/useChangeUrl";
import { useEffect } from "react";
import { useRouter } from "next/router";

const EventFilter = () => {
  const { isReady } = useRouter();
  const { dataCategory, controlFilter, setValueFilter } = useEventFilter();
  const {
    handleChangeCategory,
    handleChangeIsOnline,
    handleChangeIsFeatured,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
  } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setValueFilter("category", `${currentCategory}`);
      setValueFilter("isOnline", `${currentIsOnline}`);
      setValueFilter("isFeatured", `${currentIsFeatured}`);
    }
  }, [isReady, currentIsOnline, currentIsFeatured]);

  return (
    <Card className="h-max w-full p-5 lg:max-w-sm">
      <CardHeader>
        <h2 className="font-bold">Filter</h2>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Controller
          control={controlFilter}
          name="category"
          render={({ field: { onChange, ...field } }) => (
            <Autocomplete
              {...field}
              defaultItems={dataCategory || []}
              label="Category"
              labelPlacement="outside"
              placeholder="Search Category Here..."
              variant="bordered"
              defaultSelectedKey={`${currentCategory}`}
              onSelectionChange={(value) => {
                onChange(value);
                handleChangeCategory(value);
              }}
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
          control={controlFilter}
          name="isOnline"
          render={({ field }) => (
            <Select
              {...field}
              label="Online/Offline"
              labelPlacement="outside"
              placeholder="Select Online/Offline"
              onChange={(e) => {
                handleChangeIsOnline(e);
              }}
              defaultSelectedKeys={[`${currentIsOnline}`]}
            >
              <SelectItem key={"true"} value={"true"}>
                Online
              </SelectItem>
              <SelectItem key={"false"} value={"false"}>
                Offline
              </SelectItem>
            </Select>
          )}
        />

        <Controller
          control={controlFilter}
          name="isFeatured"
          render={({ field }) => (
            <Select
              {...field}
              label="Featured"
              labelPlacement="outside"
              placeholder="Select Featured"
              onChange={(e) => {
                handleChangeIsFeatured(e);
              }}
              defaultSelectedKeys={[`${currentIsFeatured}`]}
            >
              <SelectItem key={"true"} value={"true"}>
                Featured
              </SelectItem>
              <SelectItem key={"false"} value={"false"}>
                Not Featured
              </SelectItem>
            </Select>
          )}
        />
      </CardBody>
    </Card>
  );
};

export default EventFilter;
