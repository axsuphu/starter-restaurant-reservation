import React from "react";
import { useState } from "react";
import { listReservations } from "../utils/api";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import ErrorAlert from "../layout/ErrorAlert";
import NoReservationsFoundBanner from "../assets/No-Reservations-Found-Banner.png";

function Search() {
  //have an initial form state before filling in the information
  const initialFormState = {
    mobile_number: "",
  };

  //have a state that can hold information from form
  const [searchFormData, setSearchFormData] = useState({ ...initialFormState });
  const [reservations, setReservations] = useState([]);
  const [searchError, setSearchError] = useState(null);

  //handle change of info in form
  const handleChange = ({ target }) => {
    setSearchFormData({
      ...searchFormData,
      [target.name]: target.value,
    });
  };

  const searchFormHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setSearchError(null);
    const phoneNumber = {
      mobile_number: searchFormData.mobile_number,
    };
    listReservations(phoneNumber, abortController.signal)
      .then(setReservations)
      .catch(setSearchError);
    return () => abortController.abort();
  };

  return (
    <React.Fragment>
      <h1>Search Reservations</h1>
      <div className="search-container">
        <SearchForm
          mobile_number={searchFormData.mobile_number}
          handleChange={handleChange}
          searchFormHandler={searchFormHandler}
        />
        <br />
        {reservations.length === 0 ? (
          <img
            src={NoReservationsFoundBanner}
            alt="No Reservations Found Banner"
            className="shadow p-3 mb-5 bg-body rounded NoReservationsFoundBanner"
          />
        ) : (
          <SearchResults reservations={reservations} />
        )}

        <ErrorAlert error={searchError} />
      </div>
    </React.Fragment>
  );
}
//make a call with listreservation from API

export default Search;
