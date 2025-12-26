import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import "./ReservationModal.css";

const ReservationModal = () => {
  return (
    <div className='reserve'>
      <div className="rContainer">
        <FontAwesomeIcon
           icon={faCircleXmark}
            className="cross"
            onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
      </div>
    </div>
  )
}

export default ReservationModal
