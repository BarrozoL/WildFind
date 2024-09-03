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
  }, [sentMessages]);

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
        //set sentMessages state to be able to update useEffect
        //when message is send and render it without a page refresh
        setSentMessages(response.data);
        console.log("Message sent", response.data);
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
    getMessages();
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    setMessageText("");
    sendMessage();
    getMessages();
  };

  const handleMessageTextChange = (e) => {
    setMessageText(e.target.value);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="private-messages-wrapper">
      <h2>Private Messages:</h2>
      <h3>Received Messages:</h3>
      {user?.conversations?.map((conversation, index) => {
        return (
          //we also map over the index to use it as a key. We we getting a repeated keys error
          <div key={`${conversation?._id}${index}`}>
            {conversation?.user1Id?._id === currentUserId ||
              (conversation?.user2Id?._id === currentUserId && (
                <div className="conversation-wrapper">
                  <p>
                    Conversation between {conversation?.user1Id?.username} and{" "}
                    {conversation?.user2Id?.username}
                  </p>
                  {conversation?.messages?.map((message) => {
                    return (
                      <div
                        key={message?._id}
                        className="individual-message-wrapper"
                      >
                        <p>{message?.text}</p>
                        <p>Sent by: {message?.sender?.username} </p>
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        );
      })}
      <p></p>
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
