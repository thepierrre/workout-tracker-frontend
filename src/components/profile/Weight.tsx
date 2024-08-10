import { Button, Flex, Heading } from "@chakra-ui/react";
import { UserSettings } from "interfaces/userSettings.interface";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../app/store";
import { updateUserSettings } from "../../store/settings/userSettingsSlice";

interface Props {
  userSettings: UserSettings;
}

const Weight: React.FC<Props> = ({ userSettings }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleWeightUnit = async (unit: string) => {
    const userSettingsToUpdate: Omit<UserSettings, "id" | "user"> = {
      weightUnit: unit,
    };
    try {
      await dispatch(updateUserSettings(userSettingsToUpdate));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex direction="column" gap={2} align="center" mb={3}>
      <Heading fontSize="lg" mb={1}>
        Weight units
      </Heading>
      <Flex gap={3}>
        <Button
          bg={userSettings.weightUnit === "kgs" ? "lightblue" : "#404040"}
          textColor={userSettings.weightUnit === "kgs" ? "#404040" : "white"}
          fontSize="lg"
          _focus={{ bg: "lightblue" }}
          onClick={() => handleWeightUnit("kgs")}
        >
          KGS
        </Button>
        <Button
          bg={userSettings.weightUnit === "lbs" ? "lightblue" : "#404040"}
          textColor={userSettings.weightUnit === "lbs" ? "#404040" : "white"}
          fontSize="lg"
          _focus={{ bg: "lightblue" }}
          onClick={() => handleWeightUnit("lbs")}
        >
          LBS
        </Button>
      </Flex>
    </Flex>
  );
};

export default Weight;
