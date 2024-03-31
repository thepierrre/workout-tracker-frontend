import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";

import WorkoutExerciseCard from "./WorkoutExerciseCard";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  Flex,
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Text,
  FormControl,
  Input,
  FormErrorMessage,
  Heading,
  Card,
  CardBody,
} from "@chakra-ui/react";

type Series = {
  reps: number;
  weight: number;
};

type Exercise = Series[];

type FormValues = Exercise[];

const Workout = () => {
  return (
    <>
      <NavLink to="/workouts/exercise">
        <WorkoutExerciseCard />
      </NavLink>
    </>
  );
};

export default Workout;
