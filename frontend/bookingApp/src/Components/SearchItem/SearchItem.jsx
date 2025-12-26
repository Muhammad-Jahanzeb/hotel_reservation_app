import './SearchItem.css'
import {Link} from 'react-router-dom'

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} className="itemImage" />

      <div className="itemDescription">
        <h3 className="itemTitle">{item.name}</h3>
        <span className="fontSize">{item.distance}m from center</span>
        <span className="itemTaxiOp fontSize">Free airport taxi</span>
        <span className="itemSubtitle fontSize">
          Studio Apartment with Air Conditioning
        </span>
        <span className="fontSize">{item.description}</span>
        <span className="cancelOp fontSize">Free cancellation</span>
        <span className="cancelOpSubtitle fontSize">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="itemDetails">
        {item.rating ?? (
          <div className="itemRating">
            <span>Excellent</span>
            <button className="itemRate">{item.rating}</button>
          </div>
        )}

        <div className="itemInfo">
          <span className="itemPrice">${item.cheapestPrice}</span>
          <span className="itemTaxes fontSize">Includes taxes and fees</span>
          <Link to={`/hotel/${item._id}`}>
            <button className="itemAvl">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchItem
