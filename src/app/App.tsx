import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { Tabs, TabList, Tab, Flex, Text, Spinner } from "@chakra-ui/react";
import { initializeUser } from "../features/auth/authenticatedUserSlice";
import { useEffect, useMemo, useState } from "react";
import { AppDispatch } from "./store";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");
  const { user, loading } = useSelector(
    (state: RootState) => state.authenticatedUser
  );

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/workouts");
    } else {
      if (location.pathname !== "/sign-up") {
        navigate("/");
      }
    }
  }, [user, navigate]);

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
  );
};

export default App;
