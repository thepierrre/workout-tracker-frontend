import { Button } from "@chakra-ui/react";
import { format, getDate, getYear } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../app/store";
import Container from "../../components/UI/Container";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import MainHeading from "../../components/UI/text/MainHeading.tsx";
import Weight from "../../components/profile/Weight";
import Statistics from "../../components/profile/statistics/Statistics.tsx";
import {
  clearUser,
  setLoggedOut,
} from "../../store/auth/authenticatedUserSlice";
import { fetchUserSettings } from "../../store/settings/userSettingsSlice";
import { fetchWorkouts } from "../../store/workout/workoutSessionsSlice";
import axiosInstance from "../../util/axiosInstance.ts";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authenticatedUser.user);
  const { workouts, loading: loadingWorkouts } = useSelector(
    (state: RootState) => state.workoutSessions,
  );
  const { userSettings, loading: loadingUserSettings } = useSelector(
    (state: RootState) => state.userSettings,
  );

  useEffect(() => {
    dispatch(fetchWorkouts());
    dispatch(fetchUserSettings());
  }, [dispatch]);

  const days: number[] = [];
  for (let i = 0; i < workouts.length; i++) {
    const day = getDate(workouts[i].creationDate);
    if (!days.includes(day)) {
      days.push(day);
    }
    days.sort((a, b) => a - b);
  }

  const months: string[] = [];
  for (let i = 0; i < workouts.length; i++) {
    const month = format(workouts[i].creationDate, "LLLL");
    if (!months.includes(month)) {
      months.push(month);
    }
    months.sort((a, b) => {
      const monthOrder = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    });
  }

  const years: number[] = [];
  for (let i = 0; i < workouts.length; i++) {
    const year = getYear(workouts[i].creationDate);
    if (!years.includes(year)) {
      years.push(year);
    }
    years.sort((a, b) => b - a);
  }

  const handleLogout = async () => {
    try {
      await axiosInstance.post("auth/logout");

      dispatch(clearUser());

      navigate("/", { state: { logout: true } });

      dispatch(setLoggedOut(true));
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Container>
      <>
        <MainHeading
          text={`Hello${user?.username ? `, ${user.username}` : ""}`}
          mb={0}
        />

        {loadingWorkouts && loadingUserSettings && workouts.length === 0 ? (
          <SpinnerComponent mt={2} text="Loading statistics..." />
        ) : (
          <>
            <Statistics
              workouts={workouts}
              weightUnit={userSettings?.weightUnit || "kgs"}
            />
            {userSettings && <Weight userSettings={userSettings} />}
          </>
        )}

        <Button
          w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
          bg="lightblue"
          textColor="#353935"
          type="submit"
          mt={3}
          onClick={() => handleLogout()}
        >
          Log out
        </Button>
      </>
    </Container>
  );
};

export default ProfilePage;
