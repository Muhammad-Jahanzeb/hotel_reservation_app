import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import "./ReservationModal.css";
import useFetch from '../../Hooks/useFetch';
import { useContext, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';

const ReservationModal = ({ setOpen, hotelId }) => {
  const { data, loading, error } = useFetch(`/api/hotel/rooms/${hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const {dates} = useContext(SearchContext)

  const getDatesFromRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const date = new Date(start.getTime());
    const dateList = []

    while (date <= end){
      dateList.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1) // gettng dates as timestamp for easier handling
    }

    return dateList
  }
  const allDates = getDatesFromRange(dates[0].startDate, dates[0].endDate)

  const checkRoomAvailability = (roomObject) => {
    return roomObject.unavailableDates?.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
  };


  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((roomId) => roomId !== value)
    );
  };

  const handleClick = () => {

  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {Array.isArray(data) &&
          data.map((item) => (
            <div key={item._id} className="rItem">
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMaxPeople">
                  Max People: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">{item.price}</div>
              </div>
              {item.roomNumbers.map((room) => (
                <div key={room._id} className="room">
                  <label>{room.number}</label>
                  <input
                    type="checkbox"
                    value={room._id}
                    onChange={handleSelect}
                    disabled={checkRoomAvailability(room)}
                  ></input>
                </div>
              ))}
            </div>
          ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default ReservationModal
