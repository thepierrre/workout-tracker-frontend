import { UserSettings } from "interfaces/userSettings.interface";

import SmallButton from "../../UI/buttons/SmallButton";

interface Props {
  userSettings: UserSettings;
  threshold: number;
  handleClick: (threshold: number) => void;
  valueInKgs: number;
  valueInLbs: number;
}

const ThresholdStepButton: React.FC<Props> = ({
  userSettings,
  threshold,
  handleClick,
  valueInKgs,
  valueInLbs,
}) => {
  const isKgs = userSettings.weightUnit === "kgs";

  const currentValue = isKgs
    ? valueInKgs === 0.25
      ? ".25"
      : valueInKgs === 0.5
        ? ".5"
        : valueInKgs.toString()
    : valueInLbs === 0.5
      ? ".5"
      : valueInLbs.toString();

  return (
    <SmallButton
      bg={threshold === parseFloat(currentValue) ? "lightblue" : "#404040"}
      textColor={threshold === parseFloat(currentValue) ? "#404040" : "white"}
      fontSize="lg"
      _focus={{ bg: "lightblue" }}
      onClick={() => handleClick(parseFloat(currentValue))}
    >
      {currentValue}
    </SmallButton>
  );
};

export default ThresholdStepButton;
