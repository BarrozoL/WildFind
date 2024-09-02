import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/UserProfilePage.css";

export default function UserProfilePage() {
  const [user, setUser] = useState();
  const { userId } = useParams();

  useEffect(() => {
    getUserInformation();
  }, []);

  //GET all of the user information
  const getUserInformation = async () => {
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
      {
        user.followers.map((follower) => {
          return <li>{follower}</li>;
        });
      }
    } else {
      return <li>No followers yet</li>;
    }
  }

  function renderFollowing() {
    if (user.following.length > 0) {
      {
        user.following.map((followed) => {
          return <li>{followed}</li>;
        });
      }
    } else {
      return <li>You don't follow anyone yet</li>;
    }
  }

  return (
    <>
      <div>
        <h1>Profile Page</h1>
        <h2>{user.username}'s profile</h2>
        <p>You have added {user.sightings.length} sightings</p>
        <p>Achievements:</p>
        {renderAchievements()}
        <p>Following: </p>
        {renderFollowing()}
        <p>Followers:</p>
        {renderFollowers()}
      </div>
      <div>Send {user.username} a message!</div>
    </>
  );
}
