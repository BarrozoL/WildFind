import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import authService from "../../services/auth.service";
import axios from "axios";
import { editUser } from "../../lib";
import specimenService from "../../services/specimen-service";
import "../css/EditUserPage.css";

import defaultUserImage from "../assets/images/default-user-img1.jpeg";

function EditUserPage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams(); // id of the user profile page you are on

  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const loggedUserId = decodedToken ? decodedToken._id : null; // Extract userId

  const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");

  const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState(""); // State for email input in password reset form
  const [resetEmailSent, setResetEmailSent] = useState(false); // State to manage confirmation message

  const navigate = useNavigate();

  const getUserInformation = async () => {
    try {
      const response = await authService.api.get(`/api/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  // Fetch user information when userId changes
  useEffect(() => {
    if (userId) {
      getUserInformation();
    }
  }, [userId]);

  // Update local state when user changes
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setImageUrl(user.image);
      setEmail(user.email);
    }
  }, [user]);

  if (!user) return <p>Loading...</p>;

  const handleUsernameChange = (e) => setUsername(e.target.value);
  // const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleResetEmailChange = (e) => setResetEmail(e.target.value); // Handle email input change

  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]); // Append the file with the key "imageUrl"

    specimenService
      .uploadImage(uploadData)
      .then((response) => {
        console.log("response is: ", response);

        setImageUrl(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      username,
      // password,
      image: imageUrl || defaultUserImage,
      email,
    };

    editUser(userId, updatedUser)
      .then(() => {
        navigate(`/user-profile/${userId}`);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handlePasswordResetRequest = async () => {
    try {
      await authService.requestPasswordReset(resetEmail);
      setResetEmailSent(true); // Show confirmation message
    } catch (error) {
      console.error("Error sending password reset link:", error);
    }
  };

  const togglePasswordResetForm = () => {
    setShowPasswordResetForm(!showPasswordResetForm);
  };

  return (
    <>
      {userId === loggedUserId && (
        <div className="edit-form">
          <div key={user._id}>
            <h3>Edit Profile Page</h3>
            <form onSubmit={handleFormSubmit} className="edit-inputs">
              <div>
                <label>Profile Image: </label>
                <input type="file" onChange={handleFileUpload} />
              </div>
              <div>
                <label>Username: </label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
              <div>
                <label>Email Address: </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div>
                <button type="button" onClick={togglePasswordResetForm}>
                  {showPasswordResetForm
                    ? "Hide Password Reset"
                    : "Reset Password"}
                </button>
                {showPasswordResetForm && (
                  <div id="request-password-reset-form">
                    <label htmlFor="reset-email">
                      Enter your email address:
                    </label>
                    <input
                      type="email"
                      id="reset-email"
                      name="email"
                      value={resetEmail}
                      onChange={handleResetEmailChange}
                      required
                    />
                    <button type="button" onClick={handlePasswordResetRequest}>
                      Send Password Reset Link
                    </button>
                    {resetEmailSent && (
                      <p>Password reset link sent successfully!</p>
                    )}
                  </div>
                )}
              </div>
              <div className="edit-submit">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditUserPage;
