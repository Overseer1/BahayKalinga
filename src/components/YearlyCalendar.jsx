import Calendar from "rc-year-calendar";
import {useEffect, useState} from "react";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";

/**
 * A component that displays a yearly calendar with marked dates and tooltips.
 * @param {Object[]} markedDates - An array of objects representing the marked dates on the calendar.
 * @param {Date} markedDates[].date - The date to be marked on the calendar.
 * @param {Object} markedDates[].occupied - An object representing the occupancy status of the date.
 * @param {string} markedDates[].occupied.morning - The name of the person occupying the morning slot on the date.
 * @param {string} markedDates[].occupied.afternoon - The name of the person occupying the afternoon slot on the date.
 * @param {Function} onDatePicked - A function to be called when a date is clicked on the calendar.
 * @param isMonthlyView
 * @returns {JSX.Element} - A JSX element representing the yearly calendar.
 */
const YearlyCalendar = ({
                            markedDates, onDatePicked, isMonthlyView = false,
                        }) => {
    const [activeMonth, setActiveMonth] = useState(new Date().getMonth());

    useEffect(() => {
        document.getElementsByClassName("calendar-header")[0].style.display = isMonthlyView ? "none" : "block";
    }, [isMonthlyView]);

    useEffect(() => {
        if (isMonthlyView) {
            Array.from(document.getElementsByClassName("month-container")).forEach((monthContainer) => {
                if (Number(activeMonth) === Number(monthContainer.getAttribute("data-month-id"))) {
                    monthContainer.style.display = "block";
                } else {
                    monthContainer.style.display = "none";
                }
            });
        }
    }, [activeMonth, isMonthlyView]);

    // hide all previous dates opacity hide only
    useEffect(() => {
        const today = new Date();
        Array.from(document.getElementsByClassName("month-container")).forEach((monthContainer) => {
            Array.from(monthContainer.getElementsByClassName("day")).forEach((day) => {
                if (day.getElementsByClassName("day-content")[0]) {
                    const dayNumber = Number(day.getElementsByClassName("day-content")[0].innerHTML);
                    if (!isNaN(dayNumber)) {
                        const calendarDate = new Date(`${Number(monthContainer.getAttribute("data-month-id")) + 1}/${dayNumber}/${today.getFullYear()}`);
                        if (calendarDate < today) {
                            day.style.opacity = "0.3";
                            // unclickable
                            day.style.pointerEvents = "none";
                        } else {
                            day.style.opacity = "1";
                        }
                    }
                }
            });
        });
    }, []);

    return (<>
            {isMonthlyView && (<div
                    onClick={() => {
                        if (activeMonth >= 1) setActiveMonth(activeMonth - 1);
                    }}
                    className="cursor-pointer"
                >
                    <AiOutlineArrowLeft/>
                </div>)}
            <Calendar
                onDayClick={onDatePicked}
                dataSource={markedDates}
                customDayRenderer={(html, date) => {
                    const markDate = markedDates.find((markedDate) => {
                        return (markedDate.date.getFullYear() === date.getFullYear() && markedDate.date.getMonth() === date.getMonth() && markedDate.date.getDate() === date.getDate());
                    });
                    if (markDate) {
                        html.innerHTML = `<div date="${date.toDateString()}" class="tooltip" style="position: relative;">
            <div>${html.innerHTML}</div>
            ${markDate.occupied.morning ? '<div class="square morning" style="position: absolute; bottom: 0; left: -2.5px; right: 0; top: -1px; opacity: 0.5; width: 20px; height: 20px;"></div>' : ""}
            ${markDate.occupied.afternoon ? '<div class="square afternoon" style="position: absolute; bottom: 0; left: -2.5px; right: 0; top: -1px; opacity: 0.5; width: 20px; height: 20px;"></div>' : ""}
            <div class="tooltiptext">
            <div>Morning: ${markDate.occupied.morning || "None"}</div>
            <div>Afternoon: ${markDate.occupied.afternoon || "None"}</div>
            </div>
        </div>`;
                    }
                }}
            />
            {isMonthlyView && (<div
                    onClick={() => {
                        if (activeMonth < 11) setActiveMonth(activeMonth + 1);
                    }}
                    className="cursor-pointer"
                >
                    <AiOutlineArrowRight/>
                </div>)}
        </>);
};

export default YearlyCalendar;
