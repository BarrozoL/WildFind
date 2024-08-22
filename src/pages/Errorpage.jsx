import { useNavigate } from "react-router-dom";
import pageNotFound from "../assets/images/404-not-found.jpg";

export default function Error() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        gap: "50px",
      }}
    >
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
