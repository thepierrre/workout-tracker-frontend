import { Box, Text, ToastId, ToastPosition, useToast } from "@chakra-ui/react";
import { useRef } from "react";

interface ToastOptions {
  message?: string;
  bg: string;
  duration?: number | null;
  position?: ToastPosition;
  color?: string;
  render?: () => JSX.Element;
}

const useCustomToast = () => {
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);

  const addToast = ({
    message,
    bg,
    duration = 2500,
    position = "bottom",
    color = "white",
    render,
  }: ToastOptions) => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }

    toastIdRef.current = toast({
      position,
      duration,
      render: render
        ? render
        : () => (
            <Box
              color={color}
              bg={bg}
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

  const closeToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
      toastIdRef.current = undefined;
    }
  };

  return { addToast, toastIdRef, closeToast };
};

export default useCustomToast;
