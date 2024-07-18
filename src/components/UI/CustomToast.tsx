import { useToast, ToastId, Box, Text } from "@chakra-ui/react";
import { useRef } from "react";

interface ToastOptions {
  message: string;
  bgColor: string;
  duration?: number;
  position?:
    | "top"
    | "top-right"
    | "top-left"
    | "bottom"
    | "bottom-right"
    | "bottom-left";
}

const useCustomToast = () => {
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);

  const addToast = ({
    message,
    bgColor = "#2F855A",
    duration = 2500,
    position = "bottom",
  }: ToastOptions) => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
    toastIdRef.current = toast({
      position,
      duration,
      render: () => (
        <Box
          color="white"
          bg={bgColor}
          borderRadius={10}
          p={3}
          fontSize="lg"
          mb={10}
        >
          <Text textAlign="center">{message}</Text>
        </Box>
      ),
    });
  };

  return { addToast };
};

export default useCustomToast;
