import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { apiHandler } from "../../utils/apiConfig";

const RunCycle = (props) => {
  const [prevEndDate, setPrevEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [runCycleSuccess, setRunCycleSuccess] = useState("");
  useEffect(() => {
    updatePrevDate();
  }, []);
  const updatePrevDate = async () => {
    try {
      const res = await apiHandler.get(`/admin/prev-cycle-end-date`);
      const date = res.data;
      setPrevEndDate(date);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRunCycle = async () => {
    try {
      const cycleEndDate = selectedDate.toISOString().substr(0, 10);
      const res = await apiHandler.post(`/admin/run-cycle`, {
        cycleEndDate,
      });
      if (res.status === 200) {
        setRunCycleSuccess("Success");
        setPrevEndDate(cycleEndDate);
      } else {
        setRunCycleSuccess("Failed");
      }
    } catch (error) {
      setRunCycleSuccess("Failed");
      console.log(error);
    }
  };

  return (
    <div style={container}>
      <div style={alignComponent}>
        <span>Previous Cycle End Date : {prevEndDate}</span>
      </div>
      <div style={alignComponent}>
        <span> Run Cycle till :&nbsp;</span>
        <TextField
          id="date"
          type="date"
          InputProps={{
            inputProps: {
              min: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${new Date().getDate()}`,
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={prevEndDate}
          maxDate={new Date()}
        /> */}
      </div>
      <div style={alignComponent}>
        <button style={runButton} onClick={handleRunCycle}>
          Run Cycle
        </button>
      </div>
      {runCycleSuccess && (
        <div
          style={{
            ...alignComponent,
            color: runCycleSuccess === "Success" ? "green" : "red",
          }}
        >
          {runCycleSuccess}
        </div>
      )}
    </div>
  );
};

const container = {
  display: "flex",
  flex: "1",
  flexDirection: "column",
  fontFamily: "Verdana",
};

const alignComponent = {
  display: "flex",
  margin: "20px",
  justifyContent: "center",
};

const runButton = {
  width: "100px",
  height: "50px",
};

export default RunCycle;
