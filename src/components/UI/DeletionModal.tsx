import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React from "react";

interface DeletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  elementType: string;
  text?: string;
}

const DeletionModal: React.FC<DeletionModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  elementType,
  text,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent pt={3} pb={3}>
        <ModalHeader textAlign="center">Delete {elementType}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text textAlign="center">
            {text || `Do you really want to delete this ${elementType}?`}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onDelete}>
            Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeletionModal;
