import { Tabs, TabList, Tab, Flex } from "@chakra-ui/react";

import { useEffect, useMemo, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

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
        <Outlet />
      </Tabs>
    </Flex>
  );
};

export default App;
