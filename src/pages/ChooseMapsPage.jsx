import { Link } from "react-router-dom";

export default function ChooseMapsPage() {
  return (
    <div>
      <h1>Choose a Map!</h1>

      <Link to="/maps/world-map">
        <h2>World Map</h2>
      </Link>
      <Link to="/maps/south-america">
        <h2>South America</h2>
      </Link>
      <Link to="/maps/north-america">
        <h2>North America</h2>
      </Link>
      <Link to="/maps/europe">
        <h2>Europe</h2>
      </Link>
      <Link to="/maps/africa">
        <h2>Africa</h2>
      </Link>
      <Link to="/map">
        <h2>Portugal</h2>
      </Link>
    </div>
  );
}
