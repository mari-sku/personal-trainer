import { useEffect, useState } from "react";
import { getTrainingsWithCustomer } from "../api/trainingApi";
import type { Training } from "../types/training";
// Lodash functions (groupBy and sumBy)
import groupBy from "lodash/groupBy";
import sumBy from "lodash/sumBy";
// Recharts components
import { BarChart, Bar, XAxis, YAxis, Tooltip} from "recharts";

// type for chart data. chart needs only activity name and durations sum
type ChartData = {
  activity: string;
  totalMinutes: number;
};

export default function StatisticsPage() {

  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {

    // fetch trainings and calculate total minutes per activity
    getTrainingsWithCustomer()
      .then((trainings: Training[]) => {
        const groupedActivities = groupBy(trainings, "activity"); // group by activity. function from lodash

        // object.entries turns groupedActivities into array of [activityName (key), trainingsForActivity (value)] pairs
        // activivityName is the name of the activity (key), items is array of trainings for that activity (value)
        const summedMinutes = Object.entries(groupedActivities).map(([activityName, trainingsForActivity]) => ({
          activity: activityName,
          totalMinutes: sumBy(trainingsForActivity, "duration"), // sum durations. function from lodash
        }));
        setData(summedMinutes);
      })
      .catch(err => console.error("Failed to fetch trainings:", err));
  }, []);

  return (
    <div>
      <h2>Trainings per activity (total mins)</h2>
      <BarChart width={1200} height={500} data={data}>
        <XAxis dataKey="activity" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalMinutes" fill="#928fdbff" />
      </BarChart>
    </div>
  );
}
