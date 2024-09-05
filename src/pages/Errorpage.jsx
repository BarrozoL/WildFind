import { useNavigate } from "react-router-dom";
import pageNotFound from "../assets/images/404-not-found.jpg";
import "../css/Errorpage.css";

export default function Error() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="error">
      <img
        src={pageNotFound}
        alt="Not found Page"
        width={600}
        height={"auto"}
      />
      <button onClick={handleNavigate}>Return to Homepage</button>
    </div>
  );
}
