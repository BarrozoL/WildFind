import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import authService from "../../services/auth.service";
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
  const [bannerUrl, setBannerUrl] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState(""); // State for email input in password reset form
  const [resetEmailSent, setResetEmailSent] = useState(false); // State to manage confirmation message

  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [updateSuccessful, setUpdateSuccessful] = useState(false); // State to manage update success

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
      setBannerUrl(user.banner);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  if (!user) return <p>Loading...</p>;

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleBioChange = (e) => setBio(e.target.value);

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

  const handleBannerUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]); // Append the file with the key "imageUrl"

    specimenService
      .uploadImage(uploadData)
      .then((response) => {
        console.log("response is: ", response);

        setBannerUrl(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleBannerDelete = () => {
    setBannerUrl(""); // Remove banner image by setting it to an empty string
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      username,
      // password,
      image: imageUrl || defaultUserImage,
      banner: bannerUrl,
      email,
      bio,
    };

    editUser(userId, updatedUser)
      .then(() => {
        setUpdateSuccessful(true); // Set success flag
        if (!errorMessage) {
          navigate(`/user-profile/${userId}`);
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        const errorDescription =
          error.response?.data?.message || "An error occurred.";
        setErrorMessage(errorDescription);
        setUpdateSuccessful(false); // Ensure success flag is not set
      });

    console.log(updatedUser);
  };

  const handlePasswordResetRequest = async () => {
    try {
      // Attempt to request a password reset
      await authService.requestPasswordReset(resetEmail);

      // On success, update state to show a confirmation message
      setResetEmailSent(true);
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      // Log the error for debugging
      console.error("Error requesting password reset:", error);

      // Set specific error message based on the error response
      const errorDescription =
        error.response?.data?.message === "Username or email already taken"
          ? "Username or email already taken"
          : "An error occurred.";

      // Update state with the error message and ensure success flag is not set
      setErrorMessage(errorDescription);
      setResetEmailSent(false); // Ensure success flag is not set
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
                <input
                  type="file"
                  placeholder={user.image}
                  onChange={handleFileUpload}
                />
              </div>
              <div>
                <label>Banner Image: </label>
                <input
                  type="file"
                  placeholder={user.banner}
                  onChange={handleBannerUpload}
                />

                <button type="button" onClick={handleBannerDelete}>
                  Delete Banner Image
                </button>
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
                <label htmlFor="bio">About Me: </label>
                <textarea
                  rows="2"
                  cols="40"
                  name="bio"
                  value={bio}
                  onChange={handleBioChange}
                  className="bio-input"
                />
              </div>

              {/* <div>
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
              </div> */}
              <div className="edit-submit">
                <button type="submit">Submit</button>
              </div>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
            {/* Display error message */}
          </div>
        </div>
      )}
    </>
  );
}

export default EditUserPage;
