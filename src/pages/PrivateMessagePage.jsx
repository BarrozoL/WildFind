import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../css/PrivateMessagePage.css";

export default function PrivateMessagePage() {
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("authToken");
  //Running jwtDecode function to decode the user's authToken
  const decodedToken = token ? jwtDecode(token) : null;
  const currentUserId = decodedToken ? decodedToken._id : null; // Extract currently logged in userId

  const { userId } = useParams();

  useEffect(() => {
    getMessages();
  }, []); //could insert user here to constantly track and update page with new messages

  const getMessages = async () => {
    axios
      .get(`http://localhost:5005/api/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sightings:", error);
      });
  };

  const sendMessage = async () => {
    axios
      .post(`http://localhost:5005/api/messages/${userId}`, {
        sender: currentUserId,
        text: messageText,
      })
      .then((response) => {
        console.log("Message sent", response.data);
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleMessageTextChange = (e) => {
    setMessageText(e.target.value);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="private-messages-wrapper">
      <h2>Private Messages:</h2>
      <h3>Received Messages:</h3>
      {user?.receivedMessages.map((message) => {
        return (
          <div className="received-messages" key={message._id}>
            <p>{message?.text}</p>
            <p>
              Sent by:{" "}
              <Link to={`/user-profile/${message?.sender._id}`}>
                {message?.sender.username}
              </Link>
            </p>
            <p>Received at: {message.createdAt}</p>
          </div>
        );
      })}
      <br />
      <br />
      <h3>Sent Messages:</h3>
      {user?.sentMessages.map((message) => {
        return (
          <div className="sent-messages" key={message._id}>
            <p>{message?.text}</p>
            <p>
              Sent to:{" "}
              <Link to={`/user-profile/${message?.receiver._id}`}>
                {message?.receiver.username}
              </Link>
            </p>
            <p>Sent at: {message.createdAt}</p>
          </div>
        );
      })}
      <input
        type="text"
        onChange={handleMessageTextChange}
        value={messageText}
      />
      <button onClick={handleSendMessage} type="submit">
        Send
      </button>
    </div>
  );
}
