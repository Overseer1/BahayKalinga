import React, { useEffect, useState } from "react";
import YearlyCalendar from "../../components/YearlyCalendar";
import supabase from "../../config/supabaseClient";

const AdminDashboard = () => {
  const [markedDates, setMarkedDates] = useState(null);

  useEffect(() => {
    // TODO: set marked dates from database
    const currentYear = new Date().getFullYear();

    const getMarkedDates = async () => {
      // Get all dates from AppointedDates table
      const { data: appointedDates } = await supabase
        .from("AppointedDates")
        .select("*");

      const combinedAppointedDates = [];

      appointedDates.forEach((appointedDate) => {
        const date = appointedDate.date;
        const schedule = appointedDate.schedule;

        const combinedAppointedDate = combinedAppointedDates.find((date) => {
          return appointedDate.date === date.compareDate;
        });

        if (combinedAppointedDate) {
          if (schedule === "morning") {
            combinedAppointedDate.occupied.morning = "occupied";
          } else if (schedule === "afternoon") {
            combinedAppointedDate.occupied.afternoon = "occupied";
          }
        } else {
          combinedAppointedDates.push({
            compareDate: date,
            date: new Date(date),
            occupied: {
              morning: schedule === "morning" ? "occupied" : null,
              afternoon: schedule === "afternoon" ? "occupied" : null,
            },
          });
        }
      });

      setMarkedDates(combinedAppointedDates);
    };

    getMarkedDates();
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
