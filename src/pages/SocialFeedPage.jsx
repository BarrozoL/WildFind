import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/SocialFeedPage.css";

import "../pages.css/SocialFeedPage.css";

import DefaultSightingImage from "../assets/images/default-sighting.jpeg";

export default function SocialFeedPage() {
  const [sightings, setSightings] = useState([]);
  const [commentText, setCommentText] = useState();
  const [selectedActionId, setSelectedActionId] = useState();
  const token = localStorage.getItem("authToken");
  //Running jwtDecode function to decode the user's authToken
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken._id : null; // Extract userId

  useEffect(() => {
    getActions();
  }, []);

  const getActions = async () => {
    axios
      .get("http://localhost:5005/api/actions")
      .then((response) => {
        const foundSightings = response.data;
        setSightings(foundSightings);
        if (!sightings) return <p>Loading...</p>;
        //Setting the comment texts to an array the same length as the sightings array
        //and using .fill() to populate them with empty strings
        setCommentText(new Array(foundSightings.length).fill(""));
      })
      .catch((error) => {
        console.error("Error fetching sightings:", error);
      });
  };

  const postComment = async (actionId, index) => {
    axios
      .post("http://localhost:5005/api/comments", {
        userId,
        actionId,
        text: commentText[index],
      })
      .then((response) => {
        console.log("Comment added", response.data);
        setCommentText("");
        getActions();
        setCommentText(new Array(sightings.length).fill(""));
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  if (!sightings) return <p>Loading...</p>;

  const handleCommentSubmit = (e, actionId, index) => {
    e.preventDefault();
    postComment(actionId, index);
  };

  const handleCommentTextChange = (e, index) => {
    const newCommentText = [...commentText];
    newCommentText[index] = e.target.value;
    setCommentText(newCommentText);
  };

  return (
    <>
      <div className="itemWrapper">
        {sightings.map((action, index) => {
          return (
            <div className="social-feed-sighting-card" key={action._id}>
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
                  src={action?.sighting?.image || DefaultSightingImage}
                  alt={action?.sighting?.specimenId?.name}
                  // width="30%"
                  // height="30%"
                  style={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    marginTop: "3%",
                  }}
                />
              </div>

              <h3>
                <Link to={`/user-profile/${action?.user?._id}`}>
                  <img
                    src={action?.user?.image}
                    alt={action?.user?.username}
                    width="5%"
                    height="5%"
                    style={{ borderRadius: "50%" }}
                  />
                  {action?.user?.username}{" "}
                </Link>{" "}
                Has spotted {action?.sighting?.specimenId?.name} in{" "}
                {action?.sighting?.location}
              </h3>
              <h4>Sighting description: {action?.sighting?.description}</h4>
              <p>Entry added at: {action?.sighting?.date}</p>
              {/* form to send a post request with the comment */}
              <form onSubmit={(e) => handleCommentSubmit(e, action._id, index)}>
                <input
                  type="text"
                  value={commentText[index]}
                  onChange={(e) => handleCommentTextChange(e, index)}
                  placeholder="Add a comment"
                />
                <button type="submit">Post comment</button>
              </form>

              {action.comments && action.comments.length > 0 && (
                <div>
                  {action.comments.map((comment) => (
                    <div
                      key={comment._id}
                      style={{ border: "1px solid black" }}
                    >
                      <p>{comment.text}</p>

                      <div>
                        Added by{" "}
                        <Link to={`/user-profile/${comment?.userId?._id}`}>
                          {comment?.userId?.username}
                        </Link>
                        <p>Posted at: {comment.createdAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
