import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../css/WatchDetailsPage.css";

export default function WatchDetailsPage() {
  const { watchItemId } = useParams();
  const [watchItem, setWatchItem] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const loggedInUserId = decodedToken ? decodedToken._id : null;

  useEffect(() => {
    if (loggedInUserId && watchItemId) {
      fetchWatchItem();
    }
  }, [loggedInUserId, watchItemId]);

  const fetchWatchItem = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/watchlist/${watchItemId}`
      );
      setWatchItem(response.data);
    } catch (error) {
      console.error("Error fetching watch item details:", error);
    }
  };

  const handleNavigateBack = () => {
    navigate(`/watchlist/${loggedInUserId}`);
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleUpdateNote = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/watchlist/${watchItemId}`,
        { note: newNote } // Only send the `note` field
      );
      fetchWatchItem(); // Fetch the updated watch item
      setIsEditing(false); // Hide the edit form after updating
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleEditToggle = () => {
    if (!isEditing) {
      setNewNote(watchItem.note || ""); // Initialize the note field when starting to edit
    }
    setIsEditing(!isEditing); // Toggle the edit form visibility
  };

  if (!watchItem) return <p>Loading...</p>;

  return (
    <>
      <div className="animalDetailWrapper">
        {console.log("animal: ", watchItem)}
        {console.log("note: ", watchItem.note)}
        <h3>{watchItem.name}</h3>
        <img src={watchItem.image} alt={watchItem.name} width="300px" />
        <p>
          <b>Description: </b>
          {`${watchItem.description || "No description available"}`}
        </p>
        <p>
          <b>Location: </b>
          {`${watchItem?.country[0]?.name || "Location unknown"}`}
        </p>
        {/* <p>
          <b>Note: </b>
          {`${watchItem.note || "Add a note"}`}
        </p>

      
        <button onClick={handleEditToggle} className="edit-note-button">
          {isEditing ? "Cancel Edit" : "Edit Note"}
        </button>


        {isEditing && (
          <div className="edit-note">
            <textarea
              value={newNote}
              onChange={handleNoteChange}
              placeholder={watchItem.note || "Edit your note here..."}
            />
            <button onClick={handleUpdateNote} className="update-note-button">
              Save Note
            </button>
          </div>
        )} */}

        {/* Back to Watchlist Button */}
        <div className="button-details">
          <button onClick={handleNavigateBack} className="detail-button">
            Back to Watchlist
          </button>
        </div>
      </div>
    </>
  );
}
