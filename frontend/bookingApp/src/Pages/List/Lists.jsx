import './Lists.css'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../Components/SearchItem/SearchItem';
import useFetch from "../../Hooks/useFetch";

const Lists = () => {
  const location = useLocation();
  const [city, setCity] = useState(location.state.city);
  const [date, setDate] = useState(location.state.dates)
  const [people, setPeople] = useState(location.state.options)
  const [min, setMin] = useState('0')
  const [max, setMax] = useState('1000000')

  const[clicked, setClicked] = useState(false)
  const { data, loading, error, reFetchData } = useFetch(
    `/api/hotel?city=${city}`
  );

  const handleClick = () => {
    reFetchData(`/api/hotel?city=${city}&min=${min}&max=${max}`);
  }
  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="listPage">
        <div className="listPageContainer">
          <div className="listSearch">
            <h3>Search</h3>
            <div className="labelContainer">
              <label>Destination</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="labelContainer">
              <label>Check-in Date</label>
              <span onClick={() => setClicked(!clicked)}>
                {format(date[0].startDate, "MM/dd/yyyy")} -{" "}
                {format(date[0].endDate, "MM/dd/yyyy")}
              </span>
              {clicked ? (
                <div style={{ marginTop: "2%" }}>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    minDate={new Date()}
                  />
                </div>
              ) : null}
            </div>
            <div className="labelContainer">
              <label>Options</label>
              <div className="numberContainer">
                <label>Min price per night</label>
                <input type="text" onChange={(e) => setMin(e.target.value)} />
              </div>
              <div className="labelContainer">
                <div className="numberContainer">
                  <label>Max price per night</label>
                  <input type="text" onChange={(e) => setMax(e.target.value)} />
                </div>
              </div>
              <div className="labelContainer">
                <div className="numberContainer">
                  <label>Adults</label>
                  <input type="number" min={1} placeholder={people.adults} />
                </div>
              </div>
              <div className="labelContainer">
                <div className="numberContainer">
                  <label>Children</label>
                  <input type="number" min={0} placeholder={people.children} />
                </div>
              </div>
              <div className="labelContainer">
                <div className="numberContainer">
                  <label>Rooms</label>
                  <input type="number" min={1} placeholder={people.rooms} />
                </div>
              </div>
            </div>
            <div className="listButtonContainer">
              <button className="listButton" onClick={handleClick}>
                Search
              </button>
            </div>
          </div>
          <div className="listResult">
            {loading
              ? "Loading..."
              : data.map((item) => <SearchItem item={item} key={item._id} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Lists