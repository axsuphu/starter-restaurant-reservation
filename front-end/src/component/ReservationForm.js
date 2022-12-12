import React from "react";

function ReservationForm({
  handleChange,
  handleSubmit,
  handleCancel,
  reservation,
}) {
  return (
    <div className="col">
      <main>
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
                  value={reservation.first_name}
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
                  value={reservation.last_name}
                />
              </div>
              <div className="form-group col">
                <label htmlFor="mobile_number">Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="mobile_number"
                  id="mobile_number"
                  pattern="[0-9-]+"
                  required
                  placeholder="000-000-0000"
                  onChange={handleChange}
                  value={reservation.mobile_number}
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
                  value={reservation.reservation_date}
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
                  value={reservation.reservation_time}
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
                  value={reservation.people}
                />
              </div>
            </div>
            <br />
            <button
              style={{ backgroundColor: "#7B6A96", color: "white" }}
              type="submit"
              className="btn btn-submit"
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </fieldset>
        </form>
      </main>
    </div>
  );
}

export default ReservationForm;
