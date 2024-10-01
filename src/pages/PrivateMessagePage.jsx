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
  const [selectedConversation, setSelectedConversation] = useState();
  const token = localStorage.getItem("authToken");
  //Running jwtDecode function to decode the user's authToken
  const decodedToken = token ? jwtDecode(token) : null;
  const currentUserId = decodedToken ? decodedToken._id : null; // Extract currently logged in userId

  const { userId } = useParams();

  useEffect(() => {
    getMessages();
  }, [selectedConversation]);

  //render all of the user's messages and conversations
  const getMessages = async () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/users/${currentUserId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  //Update the conversation in real time. By updating the state in this request and nesting
  //it in the sendMessage function, the conversation is updated instantly
  const getUpdatedConversation = async (receiverId) => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/users/${currentUserId}`)
      .then((response) => {
        const updatedUser = response.data;
        const updatedConversation = updatedUser?.conversations?.find(
          (conversation) =>
            (conversation?.user1Id?._id === currentUserId &&
              conversation?.user2Id?._id === receiverId) ||
            (conversation?.user2Id?._id === currentUserId &&
              conversation?.user1Id?._id === receiverId)
        );
        setUser(updatedUser);
        setSelectedConversation(updatedConversation);
      })
      .catch((err) => {
        console.log("Error updating conversation", err);
      });
  };

  const sendMessage = async () => {
    /*  if (!selectedConversation) return; */

    //setting the receiver of the message either to the id of the clicked conversation or to the userId from the url
    const receiverId = selectedConversation
      ? selectedConversation?.user1Id?._id === currentUserId
        ? selectedConversation?.user2Id?._id
        : selectedConversation?.user1Id?._id
      : userId;
    console.log("receiverId", receiverId, "userId", userId);
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/api/messages/${receiverId}`, {
        sender: currentUserId,
        text: messageText,
      })

      .then((response) => {
        getUpdatedConversation(receiverId);
        /*   //no longer need to do this. Now we can use getUpdatedConversation() 
      to update the user and conversation state in another get request and nest it inside the sendMessage()
      //set sentMessages state to be able to update useEffect
        //when message is sent and render it without a page refresh
        setSentMessages([...sentMessages, response.data]);
        //also update selected conversation messages with new response.data
        setSelectedConversation({
          ...selectedConversation,
          messages: [...selectedConversation?.messages, response.data],
        }); */

        console.log("Message sent", response?.data);
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage();
    setMessageText("");
  };

  const handleMessageTextChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleConversationClick = (e) => {
    const conversationId = e.currentTarget.dataset.id;
    findAndSetConversation(conversationId);
  };

  function findAndSetConversation(conversationId) {
    const clickedConversation = user?.conversations.find(
      (conversation) => conversation._id === conversationId
    );
    setSelectedConversation(clickedConversation);
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div className="private-messages-wrapper">
      <div className="conversation-sidebar">
        <h2>Private Messages:</h2>
        {user?.conversations?.map((conversation, index) => {
          const notYou =
            conversation?.user1Id?._id === currentUserId
              ? conversation?.user2Id?.username
              : conversation?.user1Id?.username;
          return (
            //we also map over the index to use it as a key. We we getting a repeated keys error
            <div
              className="conversation-wrapper"
              onClick={handleConversationClick}
              data-id={conversation?._id}
              key={`${conversation?._id}${index}`}
            >
              {(conversation?.user1Id?._id === currentUserId ||
                conversation?.user2Id?._id === currentUserId) && (
                <div>
                  <p>Conversation with {notYou} </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="messages-area">
        {selectedConversation?.messages?.map((message, index) => {
          const isSender = message?.sender?._id === currentUserId;
          return (
            <div
              className={`message ${isSender ? "sender" : "receiver"}`}
              key={`${message?._id}${index}`}
            >
              <p>{message?.text}</p>
              <div className="message-info">
                <p>
                  Sent by:{" "}
                  <Link to={`/user-profile/${message?.sender?._id}`}>
                    {message?.sender?.username}
                    {"    "}
                  </Link>
                  <br />
                  {message?.createdAt.slice(11, 16)}
                  {", "}
                  {message?.createdAt.slice(0, 10)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="message-input">
        <input
          className="message-input-bar"
          type="text"
          onChange={handleMessageTextChange}
          value={messageText}
        />
        <span>
          <button
            className="send-button"
            onClick={handleSendMessage}
            type="submit"
          >
            <p>Send</p>
          </button>
        </span>
      </div>
    </div>
  );
}
