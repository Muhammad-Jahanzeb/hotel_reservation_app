import React, { useContext, useState } from 'react'
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendar, faCar, faPerson, faPlane, faTaxi, faUser } from '@fortawesome/free-solid-svg-icons'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useNavigate } from 'react-router-dom';

import './Header.css'
import { SearchContext } from '../../context/SearchContext';

const Header = (props) => {
    const {type} = props

    const[clicked, setClicked] = useState(false)
    const [destination, setDestination] = useState("")
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

    const[peopleClick, setPeopleClick] = useState(false)
    const [people, setPeople] = useState({
        adults:1,
        children:0,
        rooms:1
    })

    const {dispatch} = useContext(SearchContext)

    const toggleClick=()=>{
        setClicked(!clicked)
    }

    //handle increment/ decrement
    const handlePeople=(name, type)=>{
        try{
            type ==='i'?setPeople({
                ...people,
                [name]:people[name]+1
            }):setPeople({
                ...people,
                [name]:people[name]-1
            })
        }
        catch(error){
            console.log("Error in handling people.\n", error)
        }
    }

    const navigate = useNavigate()

    const handleSearch=()=>{
        try{
            dispatch({
              type: "NEW_SEARCH",
              payload: { city: destination, dates: date, options: people },
            });
            navigate("/list", {
              state: { city: destination, dates: date, options: people },
            });
        }
        catch(error){
            console.log("Error in handling search.\nError: ", error)
        }
    }

  return (
    <div className='header'>
        <div className={type!='list'?"headerContainer":"headerContainerList"}>
        <div className="headerList">
            <div className="headerListItem active">
                    <FontAwesomeIcon icon = {faBed} />
                    <span>Stays</span>
            </div>
            <div className="headerListItem">
                    <FontAwesomeIcon icon = {faPlane} />
                    <span>Flights</span>
            </div>
            <div className="headerListItem">
                    <FontAwesomeIcon icon = {faCar} />
                    <span>Car Rentals</span>
            </div>
            <div className="headerListItem">
                    <FontAwesomeIcon icon = {faBed} />
                    <span>Attractions</span>
            </div>
            <div className="headerListItem">
                    <FontAwesomeIcon icon = {faTaxi} />
                    <span>Airport Taxis</span>
            </div>
        </div>
        <h1 className="headerTitle">
            A lifetime of discounts. Its Genius
        </h1>
        <p className="headerDesc">
            Get rewarded for your travels-unlock instant savings of 10% or mote with a free Booking account
        </p>
        {type !='list'?
           <>
                  <button className="headerButton">
                          Sign in/ Register
                  </button>
                  <div className="searchContainer">
                  <div className="searchBar">
                      <FontAwesomeIcon icon={faBed}/>
                      <input type="text" placeholder="Where are you going" onChange={e=>setDestination(e.target.value)}/>
                  </div>
                  <div className="calender">
                  <FontAwesomeIcon icon={faCalendar}/>
                 
                  <span onClick={toggleClick}>{format(date[0].startDate, "MM/dd/yyyy")} - {format(date[0].endDate, "MM/dd/yyyy")}</span>
                  {
                      clicked?
                      <div className='datePicker'>
                          <DateRange
                          editableDateInputs={true}
                          onChange={item => setDate([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={date}
                          minDate={new Date()}
                          />
                       </div>:null
                  }
                  </div>
                  <div className="people">
                      <FontAwesomeIcon icon={faUser}/>
                      <span onClick={()=>setPeopleClick(!peopleClick)}>{people.adults} adult - {people.children} children - {people.rooms} room</span>
                      {peopleClick?
                      <div className="counterContainer">
                      <div className='counter'>
                          <span>Adults</span>
                          <div className="counterBtn">
                              <button 
                              onClick={()=>handlePeople('adults','i')}>+</button>
                              <span>{people.adults}</span>
                              <button
                              disabled  = {people.adults<=1}
                              onClick={()=>handlePeople('adults','d')}>-</button>
                          </div>
      
                      </div>
                      <div className='counter'>
                          <span>Children</span>
                          <div className="counterBtn">
                              <button
                              onClick={()=>handlePeople('children','i')}>+</button>
                              <span>{people.children}</span>
                              <button
                              disabled  = {people.children<=0}
                              onClick={()=>handlePeople('children','d')}>-</button>
                          </div>
      
                      </div>
                      <div className='counter'>
                          <span>Rooms</span>
                          <div className="counterBtn">
                              <button
                              onClick={()=>handlePeople('rooms','i')}>+</button>
                              <span>{people.rooms}</span>
                              <button
                               disabled  = {people.rooms<=1}
                               onClick={()=>handlePeople('rooms','d')}>-</button>
                          </div>
                      </div>
                  </div>:null}
                  </div>
                  <div className="buttonContainer">
                      <button className='searchButton' onClick={()=>{
                        handleSearch()
                      }}>Search</button>
                  </div>
              </div>
            </>
        :null}
        </div>

    </div>
  )
}

export default Header