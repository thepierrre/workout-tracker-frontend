import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { Tabs, TabList, Tab, Flex } from "@chakra-ui/react";
import { initializeUser } from "../features/auth/authenticatedUserSlice";
import { useEffect, useMemo, useState } from "react";
import { AppDispatch } from "./store";
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");
  const user = useSelector((state: RootState) => state.authenticatedUser.user);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  user ? Navigate({ to: "/workouts" }) : Navigate({ to: "/profile" });

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

  const defaultIndex = useMemo(() => {
    return tabs.findIndex((tab) => location.pathname.startsWith(tab.url));
  }, [activeTab]);

  return (
    <Flex bg="#1a1a1a" minH="100vh" paddingTop={3}>
      <Tabs variant="soft-rounded" defaultIndex={defaultIndex}>
        {user && (
          <TabList width="100%">
            <Flex justify="center" width="100%" gap={0.5}>
              {tabs.map((tab) => (
                <Tab
                  sx={{ color: "white" }}
                  fontSize="sm"
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
