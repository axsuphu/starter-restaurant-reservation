import React, { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function CreateNewReservation() {
  const history = useHistory();
  const initialFormState = {
    first_name: "",
    last_name: "",
    reservation_date: "",
    reservation_time: "",
    mobile_number: "",
    people: 0,
  };

  const [newReservation, setNewReservation] = useState({ ...initialFormState });
  const [reservationErrors, setReservationErrors] = useState([]);

  const handleChange = ({ target }) => {
    setNewReservation({
      ...newReservation,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    // validations and errors
    setReservationErrors([]);
    const errors = [];
    const reservationDate = new Date(
      `${newReservation.reservation_date}T${newReservation.reservation_time}:00`
    );

    const [hours, minutes] = newReservation.reservation_time.split(":");
    newReservation.people = Number(newReservation.people);

    if (Date.now() > Date.parse(reservationDate)) {
      errors.push({ message: `The reservation cannot be in the past` });
    }
    if (reservationDate.getDay() === 2) {
      errors.push({ message: `The restaurant is closed on Tuesdays` });
    }
    if ((hours <= 10 && minutes < 30) || hours <= 9) {
      errors.push({ message: `We open at 10:30am` });
    }
    if ((hours >= 21 && minutes > 30) || hours >= 22) {
      errors.push({ message: `We stop accepting reservations after 9:30pm` });
    }
    if (newReservation.people < 1) {
      errors.push({ message: `Reservations must have at least 1 person` });
    }

    setReservationErrors(errors);

    !errors.length &&
      createReservation(newReservation, abortController.signal)
        .then((_) =>
          history.push(`/dashboard?date=${newReservation.reservation_date}`)
        )
        .catch((error) => console.log(error));
    return () => abortController.abort();
  };

  let displayErrors = reservationErrors.map((error) => (
    <ErrorAlert key={error.message} error={error} />
  ));

  return (
    <React.Fragment>
      <div className="col">
        <main>
          <h1>Create Reservation</h1>
          {displayErrors}
          <form onSubmit={handleSubmit}>
            <fieldset>
              <div className="row">
                <div className="form-group col">
                  <label htmlFor="first_name">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    id="first_name"
                    required
                    placeholder="First name"
                    onChange={handleChange}
                    value={newReservation.first_name}
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="last_name">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    id="last_name"
                    required
                    placeholder="Last Name"
                    onChange={handleChange}
                    value={newReservation.last_name}
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="mobile_number">Mobile Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="mobile_number"
                    id="mobile_number"
                    required
                    placeholder="000-000-0000"
                    onChange={handleChange}
                    value={newReservation.mobile_number}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col">
                  <label htmlFor="reservation_date">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="reservation_date"
                    id="reservation_date"
                    required
                    placeholder="yyyy-mm-dd"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={handleChange}
                    value={newReservation.reservation_date}
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="reservation_time">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    name="reservation_time"
                    id="reservation_time"
                    required
                    placeholder="09:20"
                    pattern="[0-9]{2}:[0-9]{2}"
                    onChange={handleChange}
                    value={newReservation.reservation_time}
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="people">Number of people</label>
                  <input
                    type="number"
                    className="form-control"
                    name="people"
                    id="people"
                    required
                    min="1"
                    onChange={handleChange}
                    value={newReservation.people}
                  />
                </div>
              </div>
              <br />
              <button type="submit" className="btn btn-primary">
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
        </main>
      </div>
    </React.Fragment>
  );
}

export default CreateNewReservation;
