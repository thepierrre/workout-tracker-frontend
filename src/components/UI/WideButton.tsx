import { Button, ButtonProps } from "@chakra-ui/react";

interface WideButtonProps extends ButtonProps {
  children: string;
}

const WideButton = ({ children }: WideButtonProps) => {
  return (
    <Button w="95vw" bg="lightblue" textColor="#353935" type="submit" mt={3}>
      {children}
    </Button>
  );
};

export default WideButton;
