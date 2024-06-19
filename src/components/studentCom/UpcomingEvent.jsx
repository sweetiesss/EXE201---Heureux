import { format,isPast,isToday,isTomorrow } from "date-fns";
import "../../styles/UpcomingEvent.css";
import "../../styles/Scrollbar.css";

export default function UpcomingEvent({}) {

  const today=new Date();
  

  const events = [
    {
      title: "Event 01",
      task: "Task for event 01",
      date: new Date(2024, 5, 16, 23, 0), // March 4, 2022, 11:00 PM
    },
    {
      title: "Event 02",
      task: "Task for event 02",
      date: new Date(2024, 5, 15, 10, 30), // April 5, 2022, 10:30 AM
    },
    {
      title: "Event 03",
      task: "Task for event 03",
      date: new Date(2022, 4, 6, 14, 45), // May 6, 2022, 2:45 PM
    },
    {
      title: "Event 04",
      task: "Task for event 04",
      date: new Date(2022, 5, 7, 16, 15), // June 7, 2022, 4:15 PM
    },
    {
      title: "Event 05",
      task: "Task for event 05",
      date: new Date(2022, 6, 8, 18, 0), // July 8, 2022, 6:00 PM
    },
    {
      title: "Event 06",
      task: "Task for event 06",
      date: new Date(2022, 7, 9, 20, 30), // August 9, 2022, 8:30 PM
    },
    {
      title: "Event 07",
      task: "Task for event 07",
      date: new Date(2022, 8, 10, 22, 45), // September 10, 2022, 10:45 PM
    },
    {
      title: "Event 08",
      task: "Task for event 08",
      date: new Date(2022, 9, 11, 9, 15), // October 11, 2022, 9:15 AM
    },
    {
      title: "Event 09",
      task: "Task for event 09",
      date: new Date(2022, 10, 12, 11, 0), // November 12, 2022, 11:00 AM
    },
    {
      title: "Event 10",
      task: "Task for event 10",
      date: new Date(2022, 11, 13, 13, 30), // December 13, 2022, 1:30 PM
    },
  ];

  function EventItem({ title, task, logo, date, style }) {
    const dateInfor = date && format(date, "MMM dd-hh:mm a").split("-");
    var isTomorrowed=date&&isTomorrow(date);
    var isPasted=date&&isPast(date);
    var isTodayDate=date&&isToday(date);
    console.log(isTomorrowed);

    return (
      <div className="w-full containerUpcomming flex" style={style}>
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <div className="text-xl font-semibold">{title}</div>
            <div className="text-sm">{task}</div>
          </div>
          {dateInfor && (
            <div className="flex flex-col items-end">
              <div className={`date ${isTodayDate?"warning":isTomorrowed?"tomorrow":""}`}>{dateInfor[0]}</div>
              <div className={`time text-gray-400`}>{dateInfor[1]}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start  w-full h-full">
      <div className="text-[var(--login\_button)] font-[500] text-2xl">
        Upcoming
      </div>
      <div className="w-full px-[1rem] mt-[1rem] max-h-[40%] overflow-y-scroll eventHolder scrollball-hidden">
        {events ? (
          events.map((event, index) => (
            <div key={index}>
              <EventItem
                title={event.title}
                task={event.task}
                date={event.date}
                style={index === events.length-1 ? { borderLeftWidth: 0 } : {}}
              />
            </div>
          ))
        ) : (
          <div>There are not any upcoming event.</div>
        )}
        {/* {events.map((event, index) => (
        <div key={index}>
          <EventItem title={event.title} task={event.task} date={event.date} />
        </div>
      ))} */}
      </div>
    </div>
  );
}
