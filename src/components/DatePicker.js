import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { updateDateRange } from "../services/general/actions";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import nl from "date-fns/locale/nl";
// zie https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md

function DatePickerComponent(props) {
  const [startDate, setStartDate] = useState(new Date(Date.now()));

  //const [endDate, setEndDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 6.048e8));

  const onChangeStart = (date) => {
    setStartDate(date);
  };
  const onChangeEnd = (date) => {
    setEndDate(date);
  };

  registerLocale("nl", nl);

  useEffect(() => {
    props.updateDateRange([startDate, endDate]);
    // console.log([startDate, endDate]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  return (
    // <div className="react-datepicker-containers">
    <>
      <DatePicker
        selected={startDate}
        onChange={onChangeStart}
        startDate={startDate}
        dateFormat="dd.MM.yyyy"
        showWeekNumbers
        locale="nl"
        maxDate={endDate}
        popperModifiers={{
          preventOverflow: {
            enabled: true,
          },
        }}
      />

      <>{"   -   "}</>

      <DatePicker
        popperPlacement="bottom-end"
        selected={endDate}
        onChange={onChangeEnd}
        endDate={endDate}
        minDate={startDate}
        dateFormat="dd.MM.yyyy"
        showWeekNumbers
        locale="nl"
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    chosenDateRange: state.general.currentDateRange,
  };
}

export default connect(mapStateToProps, {
  updateDateRange,
})(DatePickerComponent);
