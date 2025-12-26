import "./PropertyType.css";
import useFetch from "../../Hooks/useFetch";

function toTitleCase(str) {
  return str
    ? str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
      )
    : "";
}

const PropertyType = () => {
  const { data, loading, error } = useFetch("/api/countByType");
  const images = [
    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?_gl=1*r0vhej*_ga*MTg1Njc1MzAzLjE3NTA2MjIxNzE.*_ga_8JE65Q40S6*czE3NTQ3NTMwOTEkbzYkZzEkdDE3NTQ3NTMxNzYkajU4JGwwJGgw",
    "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?_gl=1*e0egmo*_ga*MTg1Njc1MzAzLjE3NTA2MjIxNzE.*_ga_8JE65Q40S6*czE3NTQ3NTMwOTEkbzYkZzEkdDE3NTQ3NTMyNjYkajQyJGwwJGgw",
    "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?_gl=1*4jqkau*_ga*MTg1Njc1MzAzLjE3NTA2MjIxNzE.*_ga_8JE65Q40S6*czE3NTQ3NTMwOTEkbzYkZzEkdDE3NTQ3NTMzMDMkajUkbDAkaDA.",
    "https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?_gl=1*14l6h3s*_ga*MTg1Njc1MzAzLjE3NTA2MjIxNzE.*_ga_8JE65Q40S6*czE3NTQ3NTMwOTEkbzYkZzEkdDE3NTQ3NTMzNTYkajE3JGwwJGgw",
    "https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg?_gl=1*1iyy2x0*_ga*MTg1Njc1MzAzLjE3NTA2MjIxNzE.*_ga_8JE65Q40S6*czE3NTQ3NjUwOTckbzckZzEkdDE3NTQ3NjUxMTkkajM4JGwwJGgw",
  ];

  return (
    <>
      <div className="typeContainer">
        <div className="headingContainer">
          <h3>Browse by property type</h3>
        </div>
      </div>
      {loading ? (
        "Please wait, the data is loading"
      ) : (
        <div className="typeContainer">
          <div className="typeCardContainer">
            {data &&
              images.map((img, i) => (
                <div key={i}>
                  <div className="typeCard">
                    <img src={img} />
                  </div>
                  <div className="typeText">
                    <span>{toTitleCase(data[i].type)}</span>
                    <p>
                      {data[i].count} {data[i].type}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyType;
