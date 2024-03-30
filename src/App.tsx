import { Tabs, TabList, Tab, Flex } from "@chakra-ui/react";

import { Outlet, NavLink } from "react-router-dom";

const App = () => {
  return (
    <Flex bg="#1a1a1a" height="100vh" paddingTop={3}>
      <Tabs variant="soft-rounded">
        <TabList width="100%">
          <Flex justify="center" width="100%" gap={0.5}>
            <Tab sx={{ color: "white" }} fontSize="sm">
              <NavLink to="/workouts">Workouts</NavLink>
            </Tab>
            <Tab sx={{ color: "white" }} fontSize="sm">
              <NavLink to="/routines">Routines</NavLink>
            </Tab>
            <Tab sx={{ color: "white" }} fontSize="sm">
              <NavLink to="/exercises">Exercises</NavLink>
            </Tab>
            <Tab sx={{ color: "white" }} fontSize="sm">
              <NavLink to="/profile">Profile</NavLink>
            </Tab>
          </Flex>
        </TabList>
        <Outlet />
      </Tabs>
    </Flex>
  );
};

export default App;

{
  /* <TabPanels>
          <TabPanel padding="0">
            <Workout />
          </TabPanel>
          <TabPanel padding="0">
            <Routines />
          </TabPanel>
          <TabPanel padding="0">
            <Profile />
          </TabPanel>
        </TabPanels> */
}
