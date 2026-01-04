import './List.css'
import useFetch from "../../Hooks/useFetch";

const List = () => {
  const { data, loading, error } = useFetch(
    "/api/countByCity?cities=berlin,madrid,london"
  );
  return (
    <div className="listContainer">
      {loading ? (
        "Please wait, the data is loading"
      ) : (
        <div className="cardContainer">
          <div className="listCard">
            <img src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww" />
            <div className="textContainer">
              <h1>Berlin</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="listCard">
            <img src="https://images.pexels.com/photos/14064612/pexels-photo-14064612.jpeg?_gl=1*1vppt6n*_ga*MjYyNzExMDM3LjE3NjQwMTk4NzI.*_ga_8JE65Q40S6*czE3Njc1NDc5MTIkbzUkZzEkdDE3Njc1NDc5ODYkajU5JGwwJGgw" />
            <div className="textContainer">
              <h1>Madrid</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>

          <div className="listCard">
            <img src="https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=" />
            <div className="textContainer">
              <h1>London</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default List
