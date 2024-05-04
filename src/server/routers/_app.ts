import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { exerciseRouter } from "./exercise";
import { scheduleRouter } from "./schedule";
import { setsRouter } from "./sets";
import { workoutRouter } from "./workout";

export const appRouter = createTRPCRouter({
  workout: workoutRouter,
  sets: setsRouter,
  exercise: exerciseRouter,
  schedule: scheduleRouter,
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;