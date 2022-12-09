function SearchForm({ mobile_number, handleChange, searchFormHandler }) {
  return (
    <form className="search-form" onSubmit={searchFormHandler}>
      <label className="form-label">Mobile Number</label>
      <input
        type="string"
        className="form-control"
        id="search-mobile-number"
        name="mobile_number"
        onChange={handleChange}
        value={mobile_number}
        placeholder="Enter a reservation's phone number"
      ></input>
      <br />

      <button
        style={{ backgroundColor: "#7B6A96", color: "white" }}
        type="submit"
        className="btn btn-search-form-submit"
        onClick={searchFormHandler}
      >
        Search
      </button>
      <br />
    </form>
  );
}

export default SearchForm;
