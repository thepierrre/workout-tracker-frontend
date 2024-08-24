import { Flex, Spinner, Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import CustomAlert from "../components/UI/CustomAlert";
import { initializeUser } from "../store/auth/authenticatedUserSlice";
import { AppDispatch, RootState } from "./store";

const App = () => {
  const alertState = useSelector((state: RootState) => state.alert);
  const dispatch = useDispatch<AppDispatch>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");
  const { user, loading, loggedOut } = useSelector(
    (state: RootState) => state.authenticatedUser,
  );

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    dispatch(initializeUser()).then(() => {
      setInitialized(true);
    });
  }, [dispatch]);

  useEffect(() => {
    if (initialized) {
      if (user === null && alertState.visible) {
        if (location.pathname !== "/" && location.pathname !== "/sign-up") {
          navigate("/");
          if (!loggedOut) {
            setShowAlert(true);
          }
        }
      } else {
        setShowAlert(false);
        if (location.pathname === "/" || location.pathname === "/sign-up") {
          navigate("/workouts");
        }
      }
    }
  }, [initialized, user, navigate, dispatch, location.pathname]);

  useEffect(() => {
    if (alertState.visible && alertState.message === "Unauthorized access") {
      if (location.pathname !== "/" && location.pathname !== "/sign-up") {
        setShowAlert(true);
      }
    } else if (
      alertState.visible &&
      alertState.message === "Server not available"
    ) {
      setShowAlert(true);
    }
  }, [alertState, dispatch]);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const tabs = [
    {
      url: "/workouts",
      title: "Workouts",
    },
    {
      url: "/routines",
      title: "Routines",
    },
    {
      url: "/exercises",
      title: "Exercises",
    },
    {
      url: "/profile",
      title: "Profile",
    },
  ];

  const activeIndex = useMemo(() => {
    return tabs.findIndex((tab) => location.pathname.startsWith(tab.url));
  }, [activeTab]);

  if (loading) {
    return (
      <Flex
        bg="#1a1a1a"
        minH="100vh"
        paddingTop={3}
        direction="column"
        align="center"
        justify="center"
        gap={2}
      >
        <Spinner color="white" />
        <Text color="white">One moment...</Text>
      </Flex>
    );
  }

  return (
    <>
      {showAlert && alertState.message === "Unauthorized access" && (
        <CustomAlert
          message1="You didn't log in"
          message2="or your session expired."
          message3="Please authenticate to get access."
        />
      )}
      {showAlert && alertState.message === "Server not available" && (
        <CustomAlert
          message1="Oops!"
          message2="Service is not available."
          message3="Please try again later!"
        />
      )}
      <Flex bg="#1a1a1a" minH="100vh" paddingTop={3}>
        <Tabs variant="soft-rounded" index={activeIndex}>
          {user && (
            <TabList width="100%">
              <Flex justify="center" width="100%" gap={0.5}>
                {tabs.map((tab) => (
                  <Tab
                    sx={{
                      color: "white",
                      WebkitTapHighlightColor: "transparent",
                    }}
                    w="23vw"
                    fontSize="md"
                    as={Link}
                    to={tab.url}
                    key={tab.title}
                  >
                    {tab.title}
                  </Tab>
                ))}
              </Flex>
            </TabList>
          )}
          <Outlet />
        </Tabs>
      </Flex>
    </>
  );
};

export default App;
