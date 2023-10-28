import React, { useEffect, useState } from "react";
import YearlyCalendar from "../../components/YearlyCalendar";

const AdminDashboard = () => {
  const [markedDates, setMarkedDates] = useState(null);

  useEffect(() => {
    // TODO: set marked dates from database
    const currentYear = new Date().getFullYear();
    setMarkedDates([
      {
        date: new Date(currentYear, 4, 28),
        occupied: {
          morning: null,
          afternoon: "Edward Guevarra",
        },
      },
      {
        date: new Date(currentYear, 5, 20),
        occupied: {
          morning: "Lloyd Badillo",
          afternoon: "Lloyd Badillo",
        },
      },
      {
        date: new Date(currentYear, 5, 23),
        occupied: {
          morning: "Lloyd Badillo",
          afternoon: null,
        },
      },
    ]);
  }, []);

  return (
    <div className="bg-white mx-4 rounded-md">
      {markedDates && (
        <YearlyCalendar markedDates={markedDates} onDatePicked={() => {}} />
      )}
    </div>
  );
};

export default AdminDashboard;
