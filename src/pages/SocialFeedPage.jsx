import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/SocialFeedPage.css";

import "../pages.css/SocialFeedPage.css";

export default function SocialFeedPage() {
  const [sightings, setSightings] = useState();
  const [commentText, setCommentText] = useState("");
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
        setSightings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sightings:", error);
      });
  };

  const postComment = async (actionId) => {
    axios
      .post("http://localhost:5005/api/comments", {
        userId,
        actionId,
        text: commentText,
      })
      .then((response) => {
        console.log("Comment added", response.data);
        setCommentText("");
        getActions();
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  if (!sightings) return <p>Loading...</p>;

  const handleCommentSubmit = (e, actionId) => {
    e.preventDefault();
    postComment(actionId);
  };

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <>
      <div className="itemWrapper">
        {sightings.map((action) => {
          return (
            <div className="social-feed-sighting-card" key={action._id}>
              <img src={action?.sighting?.image} />
              <h3>
                {action?.user?.username} Has spotted{" "}
                {action?.sighting?.specimenId?.name} in{" "}
                {action?.sighting?.location}
              </h3>
              <h4>Sighting description: {action?.sighting?.description}</h4>
              <p>Entry added at: {action?.sighting?.date}</p>
              {/* form to send a post request with the comment */}
              <form onSubmit={(e) => handleCommentSubmit(e, action._id)}>
                <input
                  type="text"
                  value={commentText}
                  onChange={handleCommentTextChange}
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
                      {console.log("comment text", comment)}
                      <p>{comment.text} </p>

                      <p>
                        Added by{" "}
                        <Link to={`/user-profile/${comment?.userId?._id}`}>
                          {comment?.userId?.username}
                        </Link>
                      </p>
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
