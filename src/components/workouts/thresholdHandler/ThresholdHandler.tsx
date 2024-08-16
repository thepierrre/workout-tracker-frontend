import { Flex, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../../app/store";
import { UserSettings } from "../../../interfaces/userSettings.interface";
import { updateUserSettings } from "../../../store/settings/userSettingsSlice";
import ThresholdStepButton from "./ThresholdStepButton";

interface Props {
  userSettings?: UserSettings;
  threshold?: number | undefined;
  setThreshold: (value: number) => void;
}

const defaultUserSettings: UserSettings = {
  changeThreshold: 1,
  weightUnit: "kgs",
};

const ThresholdHandler: React.FC<Props> = ({
  userSettings,
  threshold,
  setThreshold,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleThresholdButtonClick = async (value: number) => {
    setThreshold(value);

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

  const thresholdValues = [
    { valueInKgs: 0.25, valueInLbs: 0.5 },
    { valueInKgs: 0.5, valueInLbs: 1 },
    { valueInKgs: 1, valueInLbs: 5 },
    { valueInKgs: 5, valueInLbs: 10 },
    { valueInKgs: 10, valueInLbs: 50 },
    { valueInKgs: 50, valueInLbs: 100 },
    { valueInKgs: 100, valueInLbs: 200 },
  ];

  return (
    <Flex gap={3} align="center" direction="column">
      <Text fontSize="sm">THRESHOLD</Text>
      <Flex gap={3}>
        {thresholdValues.map(({ valueInKgs, valueInLbs }) => (
          <ThresholdStepButton
            key={`${valueInKgs}-${valueInLbs}`}
            userSettings={userSettings || defaultUserSettings}
            threshold={threshold || 1}
            handleClick={handleThresholdButtonClick}
            valueInKgs={valueInKgs}
            valueInLbs={valueInLbs}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default ThresholdHandler;
