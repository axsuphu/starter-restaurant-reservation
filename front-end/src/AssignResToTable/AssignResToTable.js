import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

const { listTables, seatReservation } = require("../utils/api");

function AssignResToTable() {
  const { reservation_id } = useParams();
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [seat, setSeat] = useState(null);

  const history = useHistory();

  useEffect(loadTables, [reservation_id]);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  }

  const selectOptions = tables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  function handleSeatChange(event) {
    setSeat(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    seatReservation(seat, reservation_id, abortController.signal)
      .then(() => history.push(`/dashboard`))
      .catch((err) => setTablesError(err));

    return () => abortController.abort();
  };

  return (
    <React.Fragment>
      <main className="seat-reservation-page">
        <h1 className="title">Seat Reservation</h1>
        <form onSubmit={handleSubmit}>
          <fieldset className="seat-form">
            <div className="row">
              <div className="seat-select col-4 ">
                <label htmlFor="table_id">Seat at:</label>
                <select
                  name="table_id"
                  id="table_id"
                  className="form-control"
                  onChange={handleSeatChange}
                  required
                >
                  <option defaultValue>Select a table</option>
                  {selectOptions}
                </select>
              </div>
            </div>
            <br />
            <button
              style={{ backgroundColor: "#7B6A96", color: "white" }}
              className="btn btn-submit mr-2"
              type="submit"
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
          </fieldset>
        </form>
        <ErrorAlert error={tablesError} />
      </main>
    </React.Fragment>
  );
}

export default AssignResToTable;
