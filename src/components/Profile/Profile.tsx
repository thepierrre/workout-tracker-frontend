import { Flex, Text } from "@chakra-ui/react";

const Profile = () => {
  return (
    <Flex
      align="center"
      w="100vw"
      color="white"
      direction="column"
      gap={7}
      padding={2}
    >
      <Text fontSize="xl" w="100%" textAlign="center" p={3}>
        Profile
      </Text>
    </Flex>
  );
};

export default Profile;
