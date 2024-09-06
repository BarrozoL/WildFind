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
  // const [user, setUser] = useState(null);
  const [selectedActionId, setSelectedActionId] = useState();
  const [filterOption, setFilterOption] = useState("All Posts");
  const token = localStorage.getItem("authToken");
  //Running jwtDecode function to decode the user's authToken
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken._id : null; // Extract userId
  const currentUserFollowed = decodedToken ? decodedToken.following : null;
  const [user, setUser] = useState(null);

  useEffect(() => {
    getActions();
    getUserInformation();
  }, [filterOption]);

  const getActions = async () => {
    axios
      .get("https://wildfindserver.adaptable.app/api/actions")
      .then((response) => {
        const foundActions = response.data;

        setSightings(foundActions);
        if (!sightings) return <p>Loading...</p>;
        //Setting the comment texts to an array the same length as the sightings array
        //and using .fill() to populate them with empty strings
        setCommentText(new Array(foundActions.length).fill(""));

        console.log("userId is...", userId);
        console.log("user is...", decodedToken);
      })
      .catch((error) => {
        console.error("Error fetching actions:", error);
      });
  };

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

  let filteredActions = sightings.filter((action) => {
    if (filterOption === "Followed Posts") {
      // Ensure user and followers exist, and also ensure action.user exists
      if (user?.followers && action?.user) {
        return user.followers.some(
          (follower) => follower._id === action.user._id
        );
      }
      return false; // If there are no followers or action.user is null, exclude this action
    } else {
      return true; // For "All Posts", return all actions
    }
  });

  const postComment = async (actionId, index) => {
    axios
      .post("https://wildfindserver.adaptable.app/api/comments", {
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

  const handleFilterOption = (e) => {
    const selectedOption = e.target.value;
    setFilterOption(selectedOption);
  };

  if (!sightings) return <p>Loading...</p>;
  if (!filteredActions) return <p>Loading...</p>;

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
    <div style={{ marginTop: "10%" }}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h1>Community Activity Page</h1>
        <div style={{ paddingTop: "5%" }} className="select-feed">
          <select
            onChange={handleFilterOption}
            style={{ width: "300px", height: "30px", borderRadius: "5px" }}
          >
            <option value="All Posts">See All Posts</option>
            <option value="Followed Posts">See Your Friends' Posts</option>
          </select>
        </div>
      </div>

      <div className="itemWrapper">
        {filteredActions.map((action, index) => (
          <>
            {action?.sighting && (
              <div
                className="post-comment-wrapper"
                key={action._id}
                style={{ marginBottom: "50px" }}
              >
                <div className="social-feed-sighting-card">
                  <div
                    className="post-card"
                    style={{
                      // border: "2px solid red",
                      width: "70%",
                      height: "500px",
                    }}
                  >
                    <div
                      style={{
                        width: "300px",
                        height: "250px",
                        overflow: "hidden",
                        position: "relative",
                        marginLeft: "30%",
                        borderRadius: "5%",
                      }}
                    >
                      <img
                        src={action?.sighting?.image || DefaultSightingImage}
                        alt={action?.sighting?.specimenId?.name}
                        style={{
                          borderRadius: "5%",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: "0",
                          left: "0",
                          marginTop: "10%",
                        }}
                      />
                    </div>

                    <h3 style={{ marginTop: "3%" }}>
                      <Link to={`/user-profile/${action?.user?._id}`}>
                        <img
                          src={action?.user?.image}
                          alt={action?.user?.username}
                          width="50px"
                          height="50px"
                          style={{ borderRadius: "50%" }}
                        />
                        {action?.user?.username}{" "}
                      </Link>{" "}
                      has spotted {action?.sighting?.specimenId?.name} in{" "}
                      {action?.sighting?.location}
                    </h3>
                    <p>
                      <b>Description: </b>
                      {action?.sighting?.description}
                    </p>
                    <p>Entry added at: {action?.sighting?.date}</p>
                  </div>
                  <div style={{ height: "400px", width: "30%" }}>
                    <div
                      className="comment-box"
                      style={{
                        // border: "2px solid blue",
                        width: "100%",
                        height: "430px",
                        overflowY: "scroll",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}
                    >
                      {action.comments && action.comments.length > 0 && (
                        <div>
                          {action.comments.map((comment) => (
                            <div
                              key={comment._id}
                              // style={{ border: "1px solid green" }}
                              className="comment-boxes"
                            >
                              <p>{comment.text}</p>
                              <div>
                                Added by{" "}
                                <Link
                                  to={`/user-profile/${comment?.userId?._id}`}
                                >
                                  {comment?.userId?.username}
                                </Link>
                                <p>Posted at: {comment.createdAt}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <form
                      onSubmit={(e) =>
                        handleCommentSubmit(e, action._id, index)
                      }
                    >
                      <div className="comment-add">
                        <input
                          type="text"
                          value={commentText[index]}
                          onChange={(e) => handleCommentTextChange(e, index)}
                          placeholder="Add a comment"
                        />
                        <button type="submit" className="comment-button">
                          Post comment
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {action?.addition && (
              <div
                className="post-comment-wrapper"
                key={action._id}
                style={{ marginBottom: "50px" }}
              >
                <div className="social-feed-sighting-card">
                  <div
                    className="post-card"
                    style={{ width: "70%", height: "500px" }}
                  >
                    <div
                      style={{
                        width: "300px",
                        height: "250px",
                        overflow: "hidden",
                        position: "relative",
                        marginLeft: "30%",
                        borderRadius: "5%",
                      }}
                    >
                      <img
                        src={action?.addition?.image || DefaultSightingImage}
                        alt={action?.addition?.specimenId?.name}
                        style={{
                          borderRadius: "5%",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: "0",
                          left: "0",
                          marginTop: "10%",
                        }}
                      />
                    </div>

                    <h3 style={{ marginTop: "3%" }}>
                      <Link to={`/user-profile/${action?.user?._id}`}>
                        <img
                          src={action?.user?.image}
                          alt={action?.user?.username}
                          width="50px"
                          height="50px"
                          style={{ borderRadius: "50%" }}
                        />
                        {action?.user?.username}{" "}
                      </Link>{" "}
                      has added the {action?.addition?.name}
                      {console.log(action?.addition?.name)}
                    </h3>
                    <p>
                      <b>Description: </b>
                      {action?.addition?.description}
                    </p>
                    <p>
                      <b>Native to </b>
                      {action?.addition?.location}
                    </p>
                    <p>Entry added at: {action?.addition?.createdAt}</p>
                  </div>
                  <div style={{ height: "400px", width: "30%" }}>
                    <div
                      className="comment-box"
                      style={{
                        // border: "2px solid blue",
                        width: "100%",
                        height: "450px",
                        overflowY: "scroll",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}
                    >
                      {action.comments && action.comments.length > 0 && (
                        <div>
                          {action.comments.map((comment) => (
                            <div
                              key={comment._id}
                              // style={{ border: "1px solid black" }}
                              className="comment-boxes"
                            >
                              <p>{comment.text}</p>
                              <div>
                                Added by{" "}
                                <Link
                                  to={`/user-profile/${comment?.userId?._id}`}
                                >
                                  {comment?.userId?.username}
                                </Link>
                                <p>Posted at: {comment.createdAt}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <form
                      onSubmit={(e) =>
                        handleCommentSubmit(e, action._id, index)
                      }
                    >
                      <div className="comment-add-addition">
                        <input
                          type="text"
                          value={commentText[index]}
                          onChange={(e) => handleCommentTextChange(e, index)}
                          placeholder="Add a comment"
                        />
                        <button type="submit" className="comment-button">
                          Post comment
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
