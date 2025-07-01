import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { CiMenuKebab } from "react-icons/ci";

interface Proptypes {
  hideButtonDelete?: boolean;
  onPressButtonDetail: () => void;
  onPressButtonDelete?: () => void;
  textButtonDetail?: string;
  textButtonDelete?: string;
}

const DropdownActions = (props: Proptypes) => {
  const {
    hideButtonDelete = false,
    onPressButtonDetail,
    onPressButtonDelete,
    textButtonDetail,
    textButtonDelete,
  } = props;
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key={`detail-event-btn`} onPress={onPressButtonDetail}>
          {textButtonDetail ? textButtonDetail : "Detail"}
        </DropdownItem>

        {!hideButtonDelete ? (
          <DropdownItem
            key={`delete-event-btn`}
            className="text-danger-500"
            onPress={onPressButtonDelete}
          >
            {textButtonDelete ? textButtonDelete : "Delete"}
          </DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownActions;
