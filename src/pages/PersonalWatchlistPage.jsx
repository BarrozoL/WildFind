import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../css/PersonalWatchlistPage.css";

export default function UserWatchlistPage() {
  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const userIdCode = decodedToken ? decodedToken._id : null; // Extract userId

  const navigate = useNavigate();

  const [user, setUser] = useState();
  const { userId } = useParams();

  useEffect(() => {
    getUserInfo();
  }, []);

  //GET all of the user information
  const getUserInfo = async () => {
    axios
      .get(`http://localhost:5005/api/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sightings:", error);
      });
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>

      {userId === userIdCode && (
        <div className="watchlist">
          <h1>Welcome {user.username}</h1>
          <h3>This is your current watchlist</h3>
          {user.watchList && user.watchList ? (
            user.watchList.map((watchItem) => (
              <div key={watchItem._id}>
                <img
                  src={watchItem.image}
                  alt={watchItem.name}
                  width="20%"
                  height="20%"
                />
                <p>{watchItem.name}</p>

                <p>Location: {watchItem.location}</p>
                <p>Sightings: {watchItem.sightings.length}</p>
              </div>
            ))
          ) : (
            <p>Your watchlist is empy</p>
          )}
          {/*   <p>{user.watchList}</p>
         {console.log("watch:", user.watchList)}
         <p></p> */}
        </div>
      )}
      {userId !== userIdCode && navigate("/error")}

    </>
  );
}
