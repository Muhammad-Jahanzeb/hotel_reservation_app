import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faCircleXmark, faLocation } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import EmailList from '../../Components/EmailList/EmailList'
import Footer from '../../Components/Footer/Footer'
import './Hotel.css'
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import ReservationModal from '../../Components/ReservationModal/ReservationModal';


const hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const[open, setOpen] = useState(false)
  const [reservationModal, setReservationModal] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const { data, loading, error } = useFetch(`/api/hotel/${id}`);
  const {dates, options} = useContext(SearchContext)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const incrementIndex = (index) =>{
    if(index+1 < photos.length){
      setImgIndex(index + 1)
    }

    else{
      setImgIndex(0)
    }
  }

  const decrementIndex = (index) =>{
    if(index > 0){
      setImgIndex(index-1)
    }

    else{
      setImgIndex(photos.length - 1)
    }
  }

  const handleClick = () =>{
    if(user){
      setReservationModal(true)
    }
    else{
      setReservationModal(false)
      navigate("/login")
    }
  }

  return (
    <>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading ..."
      ) : (
        <div className="hoterlContainter">
          {open ? (
            <div className="slider">
              <div className="sliderWrapper">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="arrow"
                  onClick={() => decrementIndex(imgIndex)}
                />
                <img
                  src={data.photos[imgIndex]}
                  alt=""
                  className="imageSlider"
                />
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="arrow"
                  onClick={() => incrementIndex(imgIndex)}
                />
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="cross"
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>
          ) : null}
          <div className="hotelWrapper">
            <div className="titleLine">
              <h1 className="hotelTitle">{data.name}</h1>
              <button onClick={handleClick} className="hotelBookBtn">
                Book or Reserve
              </button>
            </div>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocation} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location - {data.distance}m from center
            </span>
            <span className="hotelPrice">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, index) => (
                <div key={index} className="hotelImageContainer">
                  <img
                    src={photo}
                    className="hotelImage"
                    onClick={() => {
                      setOpen(true);
                      setImgIndex(index);
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="hotelDetialsContainer">
              <div className="detailsText">
                <h1 className="detailsTitle">{data.title}</h1>
                <p className="detailsDesc">{data.desc}</p>
              </div>

              <div className="detailsPrice">
                <h1>Perfect for a {days} stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8.
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.rooms}</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={handleClick} className="reserveBookBtn">
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>

          <EmailList />
          <Footer />
        </div>
      )}
      {reservationModal ? (
        <ReservationModal setOpen={setReservationModal} hotelId={id} />
      ) : null}
    </>
  );
}

export default hotel