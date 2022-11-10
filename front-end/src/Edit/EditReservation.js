import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { editReservation, readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "../component/ReservationForm";

function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const [reservation, setReservation] = useState({ ...initialFormState });

  const [editError, setEditError] = useState([]);

  useEffect(loadReservation, [reservation_id]);

  //calls readReservation for specific reservation_id, then sets reservation to keys and values that were read
  function loadReservation() {
    const abortController = new AbortController();
    readReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setEditError);
    return () => abortController.abort();
  }

  const handleChange = ({ target }) => {
    setReservation({
      ...reservation,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = [];
    const abortController = new AbortController();

    const formattedReservation = {
      ...reservation,
      people: Number(reservation.people),
    };

    //formats the time so it includes the :00 at the end
    const [hours, minutes] = formattedReservation.reservation_time.split(":");
    const reservationTime = `${hours}:${minutes}:00`;
    formattedReservation.reservation_time = reservationTime;

    const UTCHours = Number(hours) + 8;
    const reservationDate = new Date(
      `${formattedReservation.reservation_date}T${UTCHours}:${minutes}:00.000Z`
    );
    if (Date.now() > Date.parse(reservationDate)) {
      errors.push({ message: `The reservation cannot be in the past` });
    }

    const reservationDay = new Date(
      `${formattedReservation.reservation_date}T${formattedReservation.reservation_time}`
    );
    if (reservationDay.getDay() === 2) {
      errors.push({ message: `The restaurant is closed on Tuesdays` });
    }

    if ((hours <= 10 && minutes < 30) || hours <= 9) {
      errors.push({ message: `We open at 10:30am` });
    }
    if ((hours >= 21 && minutes > 30) || hours >= 22) {
      errors.push({ message: `We stop accepting reservations after 9:30pm` });
    }
    if (formattedReservation.people < 1) {
      errors.push({ message: `Reservations must have at least 1 person` });
    }

    setEditError(errors);

    !errors.length &&
      editReservation(
        reservation_id,
        formattedReservation,
        abortController.signal
      )
        .then(() => {
          history.push(
            `/dashboard?date=${formattedReservation.reservation_date}`
          );
        })
        .catch(setEditError);
    return () => abortController.abort();
  };

  const handleCancel = (event) => history.go(-1);

  let displayErrors = editError.map((error) => (
    <ErrorAlert key={error.message} error={error} />
  ));

  return (
    <React.Fragment>
      {displayErrors}
      <ReservationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        reservation={reservation}
      />
    </React.Fragment>
  );
}

export default EditReservation;
