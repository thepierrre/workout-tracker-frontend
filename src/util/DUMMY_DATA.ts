type Exercise = {
  name: String;
  categories: String[];
};

export const exercises: Exercise[] = [
  { name: "Barbell bench press", categories: ["upper body", "chest"] },
  { name: "Barbell rows", categories: ["upper body", "back"] },
  { name: "Dumbbell lateral raise", categories: ["upper body", "shoulders"] },
  { name: "Barbell squats", categories: ["lower body", "glutes", "quads"] },
  {
    name: "Barbell deadlifts",
    categories: ["lower body", "glutes", "hamstrings", "lower back"],
  },
  { name: "Pulldowns", categories: ["upper body", "back"] },
  { name: "Abs candles", categories: ["upper body", "abs"] },
];

type Routine = {
  name: String;
  exercises: Exercise[];
};

export const routines: Routine[] = [
  {
    name: "Full Body 1",
    exercises: [exercises[0], exercises[1], exercises[2]],
  },
  {
    name: "Full Body 2",
    exercises: [exercises[3], exercises[4], exercises[5], exercises[6]],
  },
];
