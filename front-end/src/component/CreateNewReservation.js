import React, { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

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

  const [reservation, setReservation] = useState({ ...initialFormState });
  const [reservationErrors, setReservationErrors] = useState([]);

  const handleChange = ({ target }) => {
    setReservation({
      ...reservation,
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
      `${reservation.reservation_date}T${reservation.reservation_time}:00`
    );

    const [hours, minutes] = reservation.reservation_time.split(":");
    reservation.people = Number(reservation.people);

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
    if (reservation.people < 1) {
      errors.push({ message: `Reservations must have at least 1 person` });
    }

    setReservationErrors(errors);

    !errors.length &&
      createReservation(reservation, abortController.signal)
        .then((_) =>
          history.push(`/dashboard?date=${reservation.reservation_date}`)
        )
        .catch((error) => console.log(error));
    return () => abortController.abort();
  };

  let displayErrors = reservationErrors.map((error) => (
    <ErrorAlert key={error.message} error={error} />
  ));
  const handleCancel = (event) => history.go(-1);

  return (
    <React.Fragment>
      <div className="col">
        <main>
          <h1>Create Reservation</h1>
          {displayErrors}
          <ReservationForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            reservation={reservation}
          />
        </main>
      </div>
    </React.Fragment>
  );
}

export default CreateNewReservation;
