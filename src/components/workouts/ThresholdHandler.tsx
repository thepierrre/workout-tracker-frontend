import { Flex, Text } from "@chakra-ui/react";
import { UserSettings } from "../../interfaces/userSettings.interface";
import SmallButton from "../../components/UI/SmallButton";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { updateUserSettings } from "../../features/settings/userSettingsSlice";

interface Props {
  userSettings?: UserSettings;
  threshold?: number | undefined;
}

const ThresholdHandler: React.FC<Props> = ({ userSettings, threshold }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleThresholdButtonClick = async (value: number) => {
    const userSettingsToUpdate: Omit<
      UserSettings,
      "id" | "user" | "weightUnit"
    > = {
      changeThreshold: value,
    };
    try {
      await dispatch(updateUserSettings(userSettingsToUpdate));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex gap={3} align="center" direction="column">
      <Text fontSize="sm">THRESHOLD</Text>
      <Flex gap={3}>
        <SmallButton
          bg={
            userSettings?.weightUnit === "kgs"
              ? threshold === 0.25
                ? "lightblue"
                : "#404040"
              : threshold === 0.5
              ? "lightblue"
              : "#404040"
          }
          textColor={
            userSettings?.weightUnit === "kgs"
              ? threshold === 0.25
                ? "#404040"
                : "white"
              : threshold === 0.5
              ? "#404040"
              : "white"
          }
          fontSize="lg"
          _focus={{ bg: "lightblue" }}
          onClick={() =>
            handleThresholdButtonClick(
              userSettings?.weightUnit === "kgs" ? 0.25 : 0.5
            )
          }
        >
          {userSettings?.weightUnit === "kgs" ? ".25" : ".5"}
        </SmallButton>
        <SmallButton
          bg={
            userSettings?.weightUnit === "kgs"
              ? threshold === 0.5
                ? "lightblue"
                : "#404040"
              : threshold === 1
              ? "lightblue"
              : "#404040"
          }
          textColor={
            userSettings?.weightUnit === "kgs"
              ? threshold === 0.5
                ? "#404040"
                : "white"
              : threshold === 1
              ? "#404040"
              : "white"
          }
          fontSize="lg"
          _focus={{ bg: "lightblue" }}
          onClick={() =>
            handleThresholdButtonClick(
              userSettings?.weightUnit === "kgs" ? 0.5 : 1
            )
          }
        >
          {userSettings?.weightUnit === "kgs" ? ".5" : "1"}
        </SmallButton>
        <SmallButton
          bg={
            userSettings?.weightUnit === "kgs"
              ? threshold === 1
                ? "lightblue"
                : "#404040"
              : threshold === 5
              ? "lightblue"
              : "#404040"
          }
          textColor={
            userSettings?.weightUnit === "kgs"
              ? threshold === 1
                ? "#404040"
                : "white"
              : threshold === 5
              ? "#404040"
              : "white"
          }
          fontSize="lg"
          _focus={{ bg: "lightblue" }}
          onClick={() =>
            handleThresholdButtonClick(
              userSettings?.weightUnit === "kgs" ? 1 : 5
            )
          }
        >
          {userSettings?.weightUnit === "kgs" ? "1" : "5"}
        </SmallButton>
        <SmallButton
          bg={
            userSettings?.weightUnit === "kgs"
              ? threshold === 5
                ? "lightblue"
                : "#404040"
              : threshold === 10
              ? "lightblue"
              : "#404040"
          }
          textColor={
            userSettings?.weightUnit === "kgs"
              ? threshold === 5
                ? "#404040"
                : "white"
              : threshold === 10
              ? "#404040"
              : "white"
          }
          fontSize="lg"
          _focus={{ bg: "lightblue" }}
          onClick={() =>
            handleThresholdButtonClick(
              userSettings?.weightUnit === "kgs" ? 5 : 10
            )
          }
        >
          {userSettings?.weightUnit === "kgs" ? "5" : "10"}
        </SmallButton>
        <SmallButton
          bg={
            userSettings?.weightUnit === "kgs"
              ? threshold === 10
                ? "lightblue"
                : "#404040"
              : threshold === 50
              ? "lightblue"
              : "#404040"
          }
          textColor={
            userSettings?.weightUnit === "kgs"
              ? threshold === 10
                ? "#404040"
                : "white"
              : threshold === 50
              ? "#404040"
              : "white"
          }
          fontSize="lg"
          _focus={{ bg: "lightblue" }}
          onClick={() =>
            handleThresholdButtonClick(
              userSettings?.weightUnit === "kgs" ? 10 : 50
            )
          }
        >
          {userSettings?.weightUnit === "kgs" ? "10" : "50"}
        </SmallButton>
        <SmallButton
          bg={
            userSettings?.weightUnit === "kgs"
              ? threshold === 50
                ? "lightblue"
                : "#404040"
              : threshold === 100
              ? "lightblue"
              : "#404040"
          }
          textColor={
            userSettings?.weightUnit === "kgs"
              ? threshold === 50
                ? "#404040"
                : "white"
              : threshold === 100
              ? "#404040"
              : "white"
          }
          fontSize="lg"
          _focus={{ bg: "lightblue" }}
          onClick={() =>
            handleThresholdButtonClick(
              userSettings?.weightUnit === "kgs" ? 50 : 100
            )
          }
        >
          {userSettings?.weightUnit === "kgs" ? "50" : "100"}
        </SmallButton>
        <SmallButton
          bg={
            userSettings?.weightUnit === "kgs"
              ? threshold === 100
                ? "lightblue"
                : "#404040"
              : threshold === 200
              ? "lightblue"
              : "#404040"
          }
          textColor={
            userSettings?.weightUnit === "kgs"
              ? threshold === 100
                ? "#404040"
                : "white"
              : threshold === 200
              ? "#404040"
              : "white"
          }
          fontSize="lg"
          _focus={{ bg: "lightblue" }}
          onClick={() =>
            handleThresholdButtonClick(
              userSettings?.weightUnit === "kgs" ? 100 : 200
            )
          }
        >
          {userSettings?.weightUnit === "kgs" ? "100" : "200"}
        </SmallButton>
      </Flex>
    </Flex>
  );
};

export default ThresholdHandler;
