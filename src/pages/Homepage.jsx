import { useNavigate } from "react-router-dom";
import WildFindLogo from "../assets/images/WildFind-logo-5.png";
import "../css/Homepage.css";

export default function HomePage() {
  const navigate = useNavigate();

  const handleAddNavigate = () => {
    navigate("/animal-add");
  };

  const handleMapNavigate = () => {
    navigate("/map");
  };

  const handleAnimalNavigate = () => {
    navigate("/animals");
  };

  return (
    <div className="home">
      <img src={WildFindLogo} alt="WildFind logo" width="50%" height="50%" />

      <br />
      <div className="home-buttons">
        <button onClick={handleAnimalNavigate}>See your local animals</button>
        <button onClick={handleMapNavigate}>
          See a map of local animal sightings
        </button>
        <button onClick={handleAddNavigate}>
          Seen a new animal? Let us know about it!
        </button>
      </div>
    </div>
  );
}
