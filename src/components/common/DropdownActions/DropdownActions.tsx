import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { CiMenuKebab } from "react-icons/ci";

interface Proptypes {
  onPressButtonDetail: () => void;
  onPressButtonDelete: () => void;
}

const DropdownActions = (props: Proptypes) => {
  const { onPressButtonDetail, onPressButtonDelete } = props;
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key={`detail-event-btn`} onPress={onPressButtonDetail}>
          Detail
        </DropdownItem>
        <DropdownItem
          key={`delete-event-btn`}
          className="text-danger-500"
          onPress={onPressButtonDelete}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownActions;
