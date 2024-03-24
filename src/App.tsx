import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
  Center,
} from "@chakra-ui/react";

import Workout from "./components/Workout/Workout";
import Routines from "./components/Routines/Routines";
import Profile from "./components/Profile/Profile";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <Flex bg="#1a1a1a" height="100vh">
      <Tabs variant="soft-rounded">
        <TabPanels>
          <TabPanel padding="0">
            <Workout />
          </TabPanel>
          <TabPanel padding="0">
            <Routines />
          </TabPanel>
          <TabPanel padding="0">
            <Profile />
          </TabPanel>
        </TabPanels>
        <TabList position="fixed" bottom="2" width="100%">
          <Flex justify="center" width="100%" gap={5}>
            <Tab sx={{ color: "white" }}>Workouts</Tab>
            <Tab sx={{ color: "white" }}>Routines</Tab>
            <Tab sx={{ color: "white" }}>Profile</Tab>
          </Flex>
        </TabList>
      </Tabs>
    </Flex>
  );
};

export default App;
