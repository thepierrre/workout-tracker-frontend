import { Button, ButtonProps } from "@chakra-ui/react";
import { forwardRef } from "react"; // Import forwardRef

interface WideButtonProps extends ButtonProps {
  children: string;
  ref?: React.Ref<HTMLButtonElement> | undefined;
}

const WideButton = forwardRef<HTMLButtonElement, WideButtonProps>(
  (props, ref) => {
    return (
      <Button
        ref={ref}
        w="95vw"
        bg="lightblue"
        textColor="#353935"
        mt={3}
        {...props}
      >
        {props.children}
      </Button>
    );
  }
);

export default WideButton;
