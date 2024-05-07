"use client";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { api } from "@/trpc/react";

type WorkoutPageProps = {
  workoutId: string;
};

export default function WorkoutPage(props: WorkoutPageProps) {
  const { workoutId } = props;
  const workoutDetailsQuery = api.workout.getFullWorkoutDetails.useQuery({
    workoutId,
  });

  if (workoutDetailsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (workoutDetailsQuery.isError) {
    return <div>Error: {workoutDetailsQuery.error.message}</div>;
  }

  if (!workoutDetailsQuery.data) {
    return <div>No workout found</div>;
  }

  return (
    <div key="1" className="flex flex-col">
      <div className="mt-4 mx-4 flex items-center justify-between">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {workoutDetailsQuery.data.workoutName}
                <div className="text-sm font-medium text-gray-500 mt-1">
                  {workoutDetailsQuery.data.location} -{" "}
                  {workoutDetailsQuery.data.date.toLocaleDateString()}
                </div>
              </CardTitle>
              <Button
                className="text-sm font-bold px-6 py-3 bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-colors"
                variant="secondary"
              >
                Finish
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {workoutDetailsQuery.data.exercises.map((e) => (
              <Collapsible className="space-y-3" key={e.name}>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span>{e.name}</span>
                    <div className="flex items-center">
                      <span className="mr-2">{e.keySetInfo}</span>
                      <CollapsibleTrigger asChild>
                        <Button className="ml-auto" size="icon" variant="ghost">
                          <ChevronDownIcon />
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </div>
                  <Separator className="my-2" />
                  <CollapsibleContent>
                    <ul className="space-y-2">
                      {e.sets.map((s, idx) => (
                        <li className="flex justify-between" key={idx}>
                          <span>Set {idx + 1}</span>
                          <span>
                            {s.weight} x {s.reps}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="fixed z-30 bottom-12 md:w-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-3 w-full px-4">
        <form
          className=" bg-black py-2 px-6 rounded-full flex flex-row gap-4 "
          onSubmit={async (e) => {
            // e.preventDefault();
            // setIsLoading(true);
            // // Add user message to UI state
            // setMessages((currentMessages) => [
            //   ...currentMessages,
            //   {
            //     id: Date.now(),
            //     display: <UserMessage message={inputValue} />,
            //   },
            // ]);
            // // Submit and get response message
            // const responseMessage = await submitUserMessage(inputValue);
            // setMessages((currentMessages) => [
            //   ...currentMessages,
            //   responseMessage,
            // ]);
            // setIsLoading(false);
            // setInputValue("");
          }}
        >
          <Input
            placeholder="Manage your workout..."
            className="border-0 text-white"
          />
          <Button
            type="submit"
            className="bg-white text-slate-800 hover:bg-slate-200"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg
      className="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}
