import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../css/UserProfilePage.css";
import twoSightingsBadge from "../assets/images/bunny-badge.png";
import fiveSightingsBadge from "../assets/images/fox-badge.png";
import tenSightingsBadge from "../assets/images/bear-badge.png";
import twoAchievementsBadge from "../assets/images/bronze-badge.png";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams(); //id of the user profile page you are on

  //Pick up id from the currently logged in user
  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const loggedUserId = decodedToken ? decodedToken._id : null; // Extract userId

  const navigate = useNavigate();

  useEffect(() => {
    getUserInformation();
  }, [userId]); //to reload the info after logged user changes

  //GET all of the user information
  const getUserInformation = async () => {
    await axios
      .get(`https://wildfindserver.adaptable.app/api/users/${userId}`)
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
      await axios.post(
        `https://wildfindserver.adaptable.app/api/users/${userId}/following`,
        {
          userId: loggedUserId, //userId of the user that is currently logged in, for the request in the backend
        }
      );
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
          <div className="tooltip">
            <img
              src={twoSightingsBadge}
              alt="Congratulations! You have made at least 2 sightings"
              width="50px"
              height="50px"
              style={{ border: "none" }}
            />
            <span className="tooltip-text">
              Congratulations! You have made at least 2 sightings
            </span>
          </div>
        </p>
      );
    }

    if (user.sightings.length >= 5) {
      achievements.push(
        <p key="achievement-2">
          <div className="tooltip">
            <img
              src={fiveSightingsBadge}
              alt="Congratulations! You have made at least 5 sightings"
              width="50px"
              height="50px"
              style={{ border: "none" }}
            />
            <span className="tooltip-text">
              Congratulations! You have made at least 5 sightings
            </span>
          </div>
        </p>
      );
    }
    if (user.sightings.length >= 10) {
      achievements.push(
        <p key="achievement-3">
          <div className="tooltip">
            <img
              src={tenSightingsBadge}
              alt="Congratulations! You have made at least 10 sightings"
              width="50px"
              height="50px"
              style={{ border: "none" }}
            />
            <span className="tooltip-text">
              Congratulations! You have made at least 10 sightings
            </span>
          </div>
        </p>
      );
    }

    if (achievements.length >= 2) {
      achievements.push(
        <p key="achievement-4">
          <div className="tooltip">
            <img
              src={twoAchievementsBadge}
              alt="Congratulations! You have earned at least 2 achievements"
              width="50px"
              height="50px"
              style={{ border: "none" }}
            />
            <span className="tooltip-text">
              Congratulations! You have earned at least 2 achievements
            </span>
          </div>
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
      return <li>{user.username} doesn't have any followers yet</li>;
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
      return <li>{user.username} doesn't follow anyone yet</li>;
    }
  }

  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${user.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="profile">
        {console.log(user)}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="users-profile-page">
            <h1>{user.username}'s Profile Page</h1>
          </div>
        </div>
        <div className="profile-header">
          <img
            src={user.image}
            alt={user.username}
            width="250px"
            height="250px"
            style={{ borderRadius: "50%" }}
          />
          <div className="profile-stats">
            <div className="achievements" style={{ width: "50%" }}>
              <h4>Achievements:</h4>
              <div className="achievements-container">
                {renderAchievements()}
              </div>
            </div>
            <div>
              <div>
                <p>
                  <b>Following: </b>
                  {user.following.length}
                </p>
                <div className="follow">{renderFollowing()}</div>
              </div>
              <div>
                <p>
                  <b>Followers: </b>
                  {user.followers.length}
                </p>
                <div className="follow">{renderFollowers()}</div>
              </div>
            </div>
            <div className="edit-profile">
              {userId === loggedUserId && (
                <Link to={`/edit-user/${userId}`}>
                  <button className="edit-user-btn">Edit Profile</button>
                </Link>
              )}
              {userId !== loggedUserId && (
                <div>
                  <button
                    onClick={handleFollowUser}
                    style={{ marginBottom: "10%" }}
                    className="edit-user-btn"
                  >
                    Follow this user!
                  </button>
                  <Link to={`/user/messages/${userId}`}>
                    <button className="edit-user-btn">
                      Send {user.username} a message!
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="about-user">
          <h4>About Me:</h4>
          <p>
            {user.username} has added {user.sightings.length} sightings
          </p>
          <p>{user.bio}</p>
        </div>
      </div>
    </>
  );
}
