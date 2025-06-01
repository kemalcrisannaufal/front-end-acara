import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import useUpdateTicketModal from "./useUpdateTicketModal";
import { ITicket } from "@/src/types/Event";

interface Proptypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchTickets: () => void;
  selectedTicket: ITicket | undefined;
  setSelectedTicket: Dispatch<SetStateAction<ITicket | undefined>>;
}

const UpdateTicketModal = (props: Proptypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchTickets,
    selectedTicket,
    setSelectedTicket,
  } = props;
  const {
    controlUpdateTicket,
    errorsUpdateTicket,
    handleSubmitUpdateTicket,
    setValueUpdateTicket,

    isPendingUpdateTicket,
    isSuccessUpdateTicket,
    handleUpdateTicket,
  } = useUpdateTicketModal(selectedTicket?._id!);

  useEffect(() => {
    if (isSuccessUpdateTicket) {
      setSelectedTicket(undefined);
      onClose();
      refetchTickets();
    }
  }, [isSuccessUpdateTicket]);

  useEffect(() => {
    if (selectedTicket) {
      setValueUpdateTicket("name", selectedTicket.name);
      setValueUpdateTicket("price", `${selectedTicket.price}`);
      setValueUpdateTicket("quantity", `${selectedTicket.quantity}`);
      setValueUpdateTicket("description", selectedTicket.description);
    }
  }, [selectedTicket]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmitUpdateTicket(handleUpdateTicket)}>
        <ModalContent className="m-4">
          <>
            <ModalHeader>Update Ticket</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <p className="font-bold text-md">Information</p>
                <Controller
                  control={controlUpdateTicket}
                  name="name"
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Name"
                      type="text"
                      variant="bordered"
                      isInvalid={errorsUpdateTicket.name !== undefined}
                      errorMessage={errorsUpdateTicket.name?.message}
                    />
                  )}
                />
                <Controller
                  control={controlUpdateTicket}
                  name="price"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Price"
                      type="text"
                      variant="bordered"
                      isInvalid={errorsUpdateTicket.price !== undefined}
                      errorMessage={errorsUpdateTicket.price?.message}
                    />
                  )}
                />
                <Controller
                  control={controlUpdateTicket}
                  name="quantity"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Quantity"
                      type="text"
                      variant="bordered"
                      isInvalid={errorsUpdateTicket.quantity !== undefined}
                      errorMessage={errorsUpdateTicket.quantity?.message}
                    />
                  )}
                />
                <Controller
                  control={controlUpdateTicket}
                  name="description"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Description"
                      type="text"
                      variant="bordered"
                      isInvalid={errorsUpdateTicket.description !== undefined}
                      errorMessage={errorsUpdateTicket.description?.message}
                    />
                  )}
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-row justify-end items-center">
              <Button
                color="danger"
                variant="flat"
                type="button"
                onPress={onClose}
              >
                Cancel
              </Button>

              <Button color="danger" variant="solid" type="submit">
                {isPendingUpdateTicket ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Update Ticket"
                )}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateTicketModal;
