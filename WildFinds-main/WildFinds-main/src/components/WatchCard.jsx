import { Link, useNavigate } from "react-router-dom";

function WatchCard({ watch, deleteWatch }) {
  console.log("WatchCard props:", watch);
  const navigate = useNavigate();

  const handleEditNavigate = () => {
    navigate(`/watch/${watch.id}/edit-watch`);
  };

  return (
    <li className="WatchCard" style={{ listStyleType: "none" }}>
      <div className="watch-cards">
        <Link to={`/watch/${watch.id}/details`}>
          <h3>{watch.name}</h3>
          <img
            src={watch.image}
            alt={watch.name}
            style={{ width: "180px", maxHeight: "145px", borderRadius: "10px" }}
          />
        </Link>
        {/* <br /> */}
        <div style={{ marginBottom: "10px" }} className="watch-buttons">
          <button className="editWatch-btn" onClick={handleEditNavigate}>
            Edit
          </button>
          <button onClick={() => deleteWatch(watch.id)}>X</button>
        </div>
      </div>
    </li>
  );
}

export default WatchCard;
