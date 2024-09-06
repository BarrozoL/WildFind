import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../css/PersonalWatchlistPage.css";

export default function UserWatchlistPage() {
  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const userIdCode = decodedToken ? decodedToken._id : null; // Extract userId
  const { specimenId } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState();
  const { userId } = useParams();

  useEffect(() => {
    getUserInfo();
  }, []);

  //GET all of the user information
  const getUserInfo = async () => {
    axios
      .get(`https://wildfindserver.adaptable.app/api/users/${userId}`)
      .then((response) => {
        setUser(response.data);
        console.log(user);
      })
      .catch((error) => {
        console.error("Error fetching sightings:", error);
      });
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>
      {userId === userIdCode && (
        <div className="watch-card">
          <h1>Welcome {user.username}</h1>
          <h3>This is your current watchlist</h3>
          <div className="watchlist">
            {user.watchList && user.watchList ? (
              user.watchList.map((watchItem) => (
                <Link
                  to={`/watchlist/${userId}/${watchItem._id}`}
                  key={watchItem._id}
                >
                  <div className="animal-cards">
                    <h3>{watchItem?.name}</h3>

                    <div
                      style={{
                        width: "180px",
                        height: "130px",
                        overflow: "hidden",
                        position: "relative",
                        marginLeft: "5%",
                      }}
                    >
                      <img
                        // width="100%"
                        // height="100%"
                        src={watchItem?.image}
                        alt={watchItem?.name}
                        style={{
                          borderRadius: "10px",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: "0",
                          left: "0",
                        }}
                      />
                    </div>

                    {/* {console.log(watchItem?.name)}
                  <p>Location: {watchItem?.location}</p>
                  {console.log(watchItem?.locaton)}
                  <p>Sightings: {watchItem?.sightings?.length}</p> */}
                  </div>
                </Link>
              ))
            ) : (
              <p>Your watchlist is empy</p>
            )}
            {/*   <p>{user.watchList}</p>
         {console.log("watch:", user.watchList)}
         <p></p> */}
          </div>
        </div>
      )}
      {userId !== userIdCode && navigate("/error")}
    </>
  );
}
