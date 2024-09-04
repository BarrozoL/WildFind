import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../css/UserProfilePage.css";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams(); //id of the user profile page you are on

  //Pick up id from the currently logged in user
  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const loggedUserId = decodedToken ? decodedToken._id : null; // Extract userId

  useEffect(() => {
    getUserInformation();
  }, [userId]); //to reload the info after logged user changes

  //GET all of the user information
  const getUserInformation = async () => {
    await axios
      .get(`http://localhost:5005/api/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sightings:", error);
      });
  };

  //POST a new follower after clicking follow user
  const followUser = async () => {
    //check if user is already being followed
    for (let follower of user.followers) {
      if (follower._id === loggedUserId) {
        alert("You already follow this user!");
        return;
      }
    }
    try {
      await axios.post(`http://localhost:5005/api/users/${userId}/following`, {
        userId: loggedUserId, //userId of the user that is currently logged in, for the request in the backend
      });
      await getUserInformation();
    } catch (error) {
      console.error("Error following user", error);
    }
  };

  const handleFollowUser = () => {
    followUser();
  };

  if (!user) return <p>Loading...</p>;
  function renderAchievements() {
    const achievements = [];

    if (user.sightings.length >= 2) {
      achievements.push(
        <p key="achievement-1">
          Congratulations! You have made at least 2 sightings
        </p>
      );
    }

    if (user.sightings.length >= 5) {
      achievements.push(
        <p key="achievement-2">
          Congratulations! You have made at least 5 sightings
        </p>
      );
    }
    if (user.sightings.length >= 10) {
      achievements.push(
        <p key="achievement-3">
          Congratulations! You have made at least 10 sightings
        </p>
      );
    }

    if (achievements.length >= 2) {
      achievements.push(
        <p key="achievement-3">
          Congratulations! You have earned at least 2 achievements!
        </p>
      );
    }

    return achievements;
  }

  function renderFollowers() {
    if (user.followers.length > 0) {
      return user.followers.map((follower) => {
        return (
          <li key={follower._id}>
            <Link to={`/user-profile/${follower?._id}`}>
              {follower.username}
            </Link>
          </li>
        );
      });
    } else {
      return <li>No followers yet</li>;
    }
  }

  function renderFollowing() {
    if (user.following.length > 0) {
      return user.following.map((followed) => {
        return (
          <li key={followed._id}>
            <Link to={`/user-profile/${followed?._id}`}>
              {followed.username}
            </Link>
          </li>
        );
      });
    } else {
      return <li>You don't follow anyone yet</li>;
    }
  }

  return (
    <>
      <div>
        <h1>Profile Page</h1>
        <h2>{user.username}'s profile</h2>
        <Link to={`/user/messages/${userId}`}>
          <button className="send-user-a-message-button">
            Send {user.username} a message!
          </button>{" "}
        </Link>
        <p>You have added {user.sightings.length} sightings</p>
        <p>Achievements:</p>
        {renderAchievements()}
        <p>Following: </p>
        {renderFollowing()}
        <p>Followers:</p>
        {renderFollowers()}
      </div>
      <button onClick={handleFollowUser}>Follow this user!</button>
    </>
  );
}
