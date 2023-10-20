import Calendar from "rc-year-calendar";

const YearlyCalendar = ({ markedDates, onDatePicked }) => {
  return (
    <Calendar
      onDayClick={onDatePicked}
      dataSource={markedDates}
      customDayRenderer={(html, date) => {
        const markDate = markedDates.find((markedDate) => {
          return (
            markedDate.date.getFullYear() === date.getFullYear() &&
            markedDate.date.getMonth() === date.getMonth() &&
            markedDate.date.getDate() === date.getDate()
          );
        });
        if (markDate) {
          html.innerHTML = `<div date="${date.toDateString()}" class="tooltip" style="position: relative;">
            <div>${html.innerHTML}</div>
            ${
              markDate.occupied.morning
                ? '<div class="square morning" style="position: absolute; bottom: 0; left: -2.5px; right: 0; top: -1px; opacity: 0.5; width: 20px; height: 20px;"></div>'
                : ""
            }
            ${
              markDate.occupied.afternoon
                ? '<div class="square afternoon" style="position: absolute; bottom: 0; left: -2.5px; right: 0; top: -1px; opacity: 0.5; width: 20px; height: 20px;"></div>'
                : ""
            }
            <div class="tooltiptext">
            <div>Morning: ${markDate.occupied.morning || "None"}</div>
            <div>Afternoon: ${markDate.occupied.afternoon || "None"}</div>
            </div>
        </div>`;
        }
      }}
    />
  );
};

export default YearlyCalendar;
