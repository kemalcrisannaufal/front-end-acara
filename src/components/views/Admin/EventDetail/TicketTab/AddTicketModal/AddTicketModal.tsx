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
import { useEffect } from "react";
import useAddTicketModal from "./useAddTicketModal";

interface Proptypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchTickets: () => void;
  eventId: string;
}

const AddTicketModal = (props: Proptypes) => {
  const { isOpen, onOpenChange, onClose, refetchTickets, eventId } = props;
  const {
    controlAddTicket,
    errorsAddTicket,
    handleSubmitAddTicket,
    resetAddTicket,
    handleAddTicket,
    isPendingAddTicket,
    isSuccessAddTicket,
  } = useAddTicketModal(eventId);

  useEffect(() => {
    if (isSuccessAddTicket) {
      onClose();
      refetchTickets();
    }
  }, [isSuccessAddTicket]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmitAddTicket(handleAddTicket)}>
        <ModalContent className="m-4">
          <>
            <ModalHeader>Add Ticket</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <p className="font-bold text-md">Information</p>
                <Controller
                  control={controlAddTicket}
                  name="name"
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Name"
                      type="text"
                      variant="bordered"
                      isInvalid={errorsAddTicket.name !== undefined}
                      errorMessage={errorsAddTicket.name?.message}
                    />
                  )}
                />
                <Controller
                  control={controlAddTicket}
                  name="price"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Price"
                      type="text"
                      variant="bordered"
                      isInvalid={errorsAddTicket.price !== undefined}
                      errorMessage={errorsAddTicket.price?.message}
                    />
                  )}
                />
                <Controller
                  control={controlAddTicket}
                  name="quantity"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Quantity"
                      type="text"
                      variant="bordered"
                      isInvalid={errorsAddTicket.quantity !== undefined}
                      errorMessage={errorsAddTicket.quantity?.message}
                    />
                  )}
                />
                <Controller
                  control={controlAddTicket}
                  name="description"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Description"
                      type="text"
                      variant="bordered"
                      isInvalid={errorsAddTicket.description !== undefined}
                      errorMessage={errorsAddTicket.description?.message}
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
                {isPendingAddTicket ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Create Ticket"
                )}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddTicketModal;
