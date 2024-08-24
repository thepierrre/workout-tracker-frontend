import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface DeletionModalProps {
  deletionInProgress: boolean;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  elementType: string;
  text?: string;
}

const DeletionModal: React.FC<DeletionModalProps> = ({
  deletionInProgress,
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
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onDelete}
            w={20}
            isDisabled={deletionInProgress}
          >
            {deletionInProgress ? <Spinner size="xs" /> : "Delete"}
          </Button>
          <Button variant="ghost" onClick={onClose} w={20}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeletionModal;
