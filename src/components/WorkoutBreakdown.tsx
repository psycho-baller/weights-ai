import { getWorkoutInfo } from "@/lib/db/helper";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";

type WorkoutBreakdownProps = {
  workoutInfo: {
    date: Date;
    id: string;
    location: string;
    name: string;
    inProgress: boolean;
    userId: string;
    sets: {
      id: string;
      lift: string;
      weight: number;
      reps: number;
      workoutId: string;
    }[];
  };
};

export async function WorkoutBreakdown(props: WorkoutBreakdownProps) {
  const { workoutInfo } = props;

  return (
    <Card>
      <CardContent>
        <h2 className="text-lg text-slate-800 font-bold">{workoutInfo.name}</h2>
        <h4 className="text-slate-600 font-light">
          {workoutInfo.date.toLocaleDateString()} -{" "}
          <span className="italic">{workoutInfo.location}</span>
        </h4>
        <Separator />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lift</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Reps</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workoutInfo.sets.map((set) => {
              return (
                <TableRow key={set.id}>
                  <TableCell className="font-semibold">{set.lift}</TableCell>
                  <TableCell>{set.weight}</TableCell>
                  <TableCell>{set.reps}</TableCell>
                  <TableCell>
                    <Button>Remove</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}