import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getTrainingsWithCustomer } from "../api/trainingApi";
import type { Training } from "../types/training";

// define the event type
type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
};

export default function TrainingCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]); 

  useEffect(() => {
    getTrainingsWithCustomer()
      .then((trainings: Training[]) => {

    // convert trainings to calendar events. map goes through every training and transforms them into a new CalendarEvent object
        const calendarEvents: CalendarEvent[] = trainings.map(t => ({
          id: t.id.toString(), //id has to be string as defined in CalendarEvent type
          title: `${t.activity} / ${t.customer.firstname} ${t.customer.lastname}`,
          start: t.date,
          // training date + duration
          end: new Date(new Date(t.date).setMinutes(new Date(t.date).getMinutes() + t.duration)).toISOString(),
        }));
        setEvents(calendarEvents);
      })
      .catch(err => console.error("Failed to fetch trainings:", err));
  }, []);

  return (
    <div>
      <FullCalendar
      // use plugins for interactions and month/week/day views
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"

        // toolbar 
        headerToolbar={{
          left: "prev,next today",  // buttons on the left
          center: "title",  // title in the center (month and year)
          right: "dayGridMonth,timeGridWeek,timeGridDay",   // different view buttons on the right
        }}
        events={events} // fill calendar with the events
        height="auto"  // adjust height automatically to fit screen
      />
    </div>
  );
}
