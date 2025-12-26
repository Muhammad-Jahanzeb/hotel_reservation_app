import './GuestLove.css'
import useFetch from "../../Hooks/useFetch";

function toTitleCase(str) {
  return str
    ? str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
      )
    : "";
}

const GuestLove = () => {
  const { data, loading, error } = useFetch("/api/hotel?featured=true&limit=4");
  return (
    <>
      <div className="guestContainer">
        <div className="headingContainer">
          <h3>Homes guests love</h3>
        </div>
      </div>
      <div className="guestContainer">
        <div className="guestList">
          {loading
            ? "Loading, please wait"
            : data.map((item) => (
                <div key={item._id}>
                  <div className="guestCard">
                    <img src={item.photos[0]} />
                  </div>
                  <div className="guestText">
                    <span className="hotelName">{item.name}</span>
                    <span className="hotelLocation">
                      {toTitleCase(item.city)}
                    </span>
                    <span className="price">
                      Starting from ${item.cheapestPrice}
                    </span>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}

export default GuestLove