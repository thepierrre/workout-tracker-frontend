import { Button, Flex } from "@chakra-ui/react";
import { UserSettings } from "interfaces/userSettings.interface";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../app/store";
import SecondaryHeading from "../../components/UI/text/SecondaryHeading";
import { updateUserSettings } from "../../store/settings/userSettingsSlice";

interface Props {
  userSettings: UserSettings;
}

const Weight: React.FC<Props> = ({ userSettings }) => {
  const dispatch = useDispatch<AppDispatch>();
  // Local state to render the changed button for the new weight unit faster in slow networks.
  const [localWeightUnit, setLocalWeightUnit] = useState(
    userSettings.weightUnit,
  );

  const handleWeightUnit = async (unit: string) => {
    setLocalWeightUnit(unit);

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
      <SecondaryHeading text="Weight units" />
      <Flex gap={3}>
        <Button
          bg={localWeightUnit === "kgs" ? "lightblue" : "#404040"}
          textColor={localWeightUnit === "kgs" ? "#404040" : "white"}
          fontSize="lg"
          _focus={{ bg: "lightblue" }}
          onClick={() => handleWeightUnit("kgs")}
        >
          KGS
        </Button>
        <Button
          bg={localWeightUnit === "lbs" ? "lightblue" : "#404040"}
          textColor={localWeightUnit === "lbs" ? "#404040" : "white"}
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
