import React, { useState, useRef } from "react";
import moment from "moment-timezone";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DayPickerRangeController } from "react-dates";
moment.updateLocale("en", {
	week: {
		dow: 1
	}
});

// const DATE_FORMAT = "DD/MM/YYYY";

const DatePicker = () => {
	const monthController = useRef();
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [focusedInput, setFocusedInput] = useState("startDate");
	const [displayDatePicker, setDisplayDatePicker] = useState(false);
	const onDatesChange = ({ startDate, endDate }) => {
		if (focusedInput === "startDate" || endDate === null) {
			return setStartDate(startDate);
		}

		setEndDate(endDate);
	};
	const togglePicker = () => {
		return setDisplayDatePicker(!displayDatePicker);
	};
	return (
		<>
			<button onClick={() => togglePicker()}>{`${
				!displayDatePicker ? "DISPLAY" : "HIDE"
			} DATE PICKER`}</button>
			{displayDatePicker && (
				<DayPickerRangeController
					onDatesChange={onDatesChange}
					focusedInput={focusedInput}
					numberOfMonths={2}
					startDate={startDate}
					endDate={focusedInput === "endDate" ? null : endDate}
					renderMonthElement={(...args) => {
						monthController.current = {
							month: args[0].month,
							onMonthSelect: args[0].onMonthSelect
						};
						return args[0].month.format("MMMM YYYY");
					}}
					// navPrev={
					// 	<NavButtonLeft>
					// 		<i className="icon-down-arrow" />
					// 	</NavButtonLeft>
					// }
					// navNext={
					// 	<NavButtonRight>
					// 		<i className="icon-down-arrow" />
					// 	</NavButtonRight>
					// }
					onFocusChange={(focusedInput) =>
						setFocusedInput(!focusedInput ? "startDate" : focusedInput)
					}
				/>
			)}
		</>
	);
};
export default DatePicker;
