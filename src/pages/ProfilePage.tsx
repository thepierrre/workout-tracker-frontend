import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { Flex, Button, Heading } from "@chakra-ui/react";

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.authenticatedUser.user);

  const handleLogout = () => {
    console.log("logging out...");
  };

  return (
    <Flex
      align="center"
      w="100vw"
      color="white"
      direction="column"
      gap={7}
      padding={2}
      marginTop={5}
    >
      <Heading fontSize="2xl">Hello, {user.username}</Heading>
      <Button
        w="95vw"
        bg="lightblue"
        textColor="#353935"
        type="submit"
        mt={3}
        onClick={() => handleLogout()}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default ProfilePage;

// add statistics (how many workouts, routines, exercises etc.)
// add history (e.g. display workouts for month and year)
