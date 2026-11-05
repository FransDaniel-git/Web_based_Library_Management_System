import { useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import apiUser from "../../api/Anggota/apiProfilePage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarAnggota from "./NavbarAnggota";
import FooterAnggota from "./FooterAnggota";

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f7fa",
  },
  hero: {
    background:
      "linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #5c6bc0 100%)",
    padding: "140px 20px 100px",
    position: "relative",
    overflow: "hidden",
  },
  heroPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    opacity: 0.5,
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  heroBadge: {
    display: "inline-block",
    padding: "8px 20px",
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "50px",
    color: "white",
    fontSize: "0.9rem",
    fontWeight: 500,
    marginBottom: "20px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: 800,
    color: "white",
    marginBottom: "15px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    color: "rgba(255, 255, 255, 0.9)",
    maxWidth: "500px",
    margin: "0 auto",
    lineHeight: 1.6,
  },
  main: {
    maxWidth: "1200px",
    margin: "-60px auto 0",
    padding: "0 20px 60px",
    position: "relative",
    zIndex: 10,
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
    gap: "20px",
    background: "white",
    borderRadius: "24px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
  },
  loadingSpinner: {
    width: "60px",
    height: "60px",
    border: "4px solid #f0f0f0",
    borderTopColor: "#ff7043",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    fontSize: "1.1rem",
    color: "#666",
    fontWeight: 500,
  },
  profileContent: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  cardUnified: {
    background: "white",
    borderRadius: "24px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  avatarSection: {
    background: "linear-gradient(135deg, #1a237e 0%, #3949ab 100%)",
    padding: "40px",
    display: "flex",
    alignItems: "center",
    gap: "30px",
    position: "relative",
  },
  avatarWrapper: {
    position: "relative",
    zIndex: 2,
  },
  avatarContainer: {
    position: "relative",
    width: "140px",
    height: "140px",
  },
  profileAvatar: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "5px solid white",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease",
  },
  avatarPlaceholder: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #ff7043, #ff5722)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "5px solid white",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
  },
  avatarPlaceholderText: {
    fontSize: "4rem",
    fontWeight: 700,
    color: "white",
  },
  avatarEditBtn: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    width: "44px",
    height: "44px",
    background: "linear-gradient(135deg, #ff7043, #ff5722)",
    border: "4px solid white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "white",
    fontSize: "1rem",
    boxShadow: "0 4px 15px rgba(255, 112, 67, 0.4)",
    transition: "all 0.3s ease",
  },
  basicInfo: {
    color: "white",
    zIndex: 2,
  },
  profileName: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "8px",
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  },
  profileEmail: {
    fontSize: "1rem",
    opacity: 0.9,
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  memberBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(255, 255, 255, 0.2)",
    padding: "8px 16px",
    borderRadius: "50px",
    fontSize: "0.9rem",
    fontWeight: 500,
    backdropFilter: "blur(10px)",
  },
  profileBody: {
    padding: "20px 40px 40px",
  },
  section: {
    marginBottom: "35px",
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#1a237e",
    marginBottom: "20px",
    paddingBottom: "12px",
    borderBottom: "2px solid #e8e8e8",
  },
  sectionIcon: {
    color: "#ff7043",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    background: "#f8f9fa",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    cursor: "default",
  },
  infoIconWrapper: {
    width: "45px",
    height: "45px",
    background: "linear-gradient(135deg, #1a237e, #3949ab)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "1.1rem",
    flexShrink: 0,
  },
  infoDetails: {
    flex: 1,
  },
  infoLabel: {
    display: "block",
    fontSize: "0.75rem",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "4px",
  },
  infoValue: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 600,
    color: "#333",
  },
  settingsItem: {
    marginBottom: "0",
    padding: "14px 16px",
    background: "#f8f9fa",
    borderRadius: "12px",
    transition: "all 0.3s ease",
  },
  settingsItemWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  settingsHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
    color: "#1a237e",
    fontWeight: 600,
    fontSize: "0.95rem",
  },
  settingsInputWrapper: {
    display: "flex",
    gap: "10px",
    alignItems: "stretch",
  },
  settingsInput: {
    flex: 1,
    border: "2px solid #e8e8e8",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
    minWidth: "0",
  },
  editBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 20px",
    border: "none",
    borderRadius: "12px",
    fontWeight: 600,
    transition: "all 0.3s ease",
    background: "linear-gradient(135deg, #ff7043, #ff5722)",
    color: "white",
  },
  saveBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 20px",
    border: "none",
    borderRadius: "12px",
    fontWeight: 600,
    transition: "all 0.3s ease",
    background: "linear-gradient(135deg, #4caf50, #43a047)",
    color: "white",
  },
  visibilityBtn: {
    background: "#e8e8e8",
    border: "none",
    borderRadius: "12px",
    padding: "14px 16px",
    color: "#666",
    transition: "all 0.3s ease",
  },
  errorState: {
    textAlign: "center",
    padding: "80px 20px",
    background: "white",
    borderRadius: "24px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
  },
  errorIcon: {
    fontSize: "5rem",
    display: "block",
    marginBottom: "20px",
  },
  footer: {
    position: "relative",
    background:
      "linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)",
    color: "#ffffff",
    marginTop: "60px",
  },
  footerWave: {
    position: "absolute",
    top: "-60px",
    left: 0,
    width: "100%",
    overflow: "hidden",
    lineHeight: 0,
  },
  footerMain: {
    padding: "60px 20px 30px",
  },
  footerContainer: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
    gap: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  footerBrand: {
    display: "flex",
    flexDirection: "column",
  },
  footerLogo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "15px",
  },
  footerLogoImage: {
    width: "50px",
    height: "50px",
    filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))",
    transition: "transform 0.3s ease",
  },
  footerLogoText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ffffff",
    margin: 0,
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  footerTagline: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: "20px",
    fontStyle: "italic",
  },
  footerSocial: {
    display: "flex",
    gap: "12px",
  },
  socialIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
    color: "#ffffff",
    transition: "all 0.3s ease",
    textDecoration: "none",
  },
  footerLinksSection: {
    display: "flex",
    flexDirection: "column",
  },
  footerHeading: {
    fontSize: "18px",
    fontWeight: 600,
    marginBottom: "20px",
    color: "#ffffff",
    position: "relative",
    paddingBottom: "10px",
  },
  footerHeadingAfter: {
    content: "",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "40px",
    height: "3px",
    background: "linear-gradient(90deg, #ff7043, #ffab91)",
    borderRadius: "2px",
  },
  footerLink: {
    color: "rgba(255, 255, 255, 0.8)",
    textDecoration: "none",
    fontSize: "14px",
    transition: "all 0.3s ease",
    display: "inline-block",
    marginBottom: "12px",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.8)",
    transition: "all 0.3s ease",
  },
  contactIcon: {
    fontSize: "18px",
  },
  addressContent: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
  },
  addressIcon: {
    fontSize: "20px",
    marginTop: "2px",
  },
  addressText: {
    fontSize: "14px",
    lineHeight: 1.8,
    color: "rgba(255, 255, 255, 0.8)",
    margin: 0,
  },
  footerBottom: {
    background: "rgba(0, 0, 0, 0.2)",
    padding: "20px",
    textAlign: "center",
  },
  footerBottomText: {
    margin: 0,
    fontSize: "13px",
    color: "rgba(255, 255, 255, 0.7)",
  },
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredInfo, setHoveredInfo] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const userData = await apiUser.getUserById();
      if (userData) {
        setUser(userData);
        setNewAddress(userData.address);
        setNewName(userData.name);
        setNewPhone(userData.no_telp || "");
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  const handleEditName = async () => {
    if (isEditingName) {
      if (!newName.trim()) {
        toast.error("Name cannot be empty.");
        return;
      }
      const updatedData = { name: newName };
      const result = await apiUser.updateUser(updatedData);
      if (result) {
        setUser((prevUser) => ({ ...prevUser, name: newName }));
        setIsEditingName(false);
        toast.success("Name updated successfully!");
      } else {
        toast.error("Failed to update name. Please try again.");
      }
    } else {
      setIsEditingName(true);
    }
  };

  const handleEditPhone = async () => {
    if (isEditingPhone) {
      const updatedData = { no_telp: newPhone };
      const result = await apiUser.updateUser(updatedData);
      if (result) {
        setUser((prevUser) => ({ ...prevUser, no_telp: newPhone }));
        setIsEditingPhone(false);
        toast.success("Phone number updated successfully!");
      } else {
        toast.error("Failed to update phone number. Please try again.");
      }
    } else {
      setIsEditingPhone(true);
    }
  };

  const handleEditAddress = async () => {
    if (isEditingAddress) {
      const updatedData = { address: newAddress };
      const result = await apiUser.updateUser(updatedData);
      if (result) {
        setUser((prevUser) => ({ ...prevUser, address: newAddress }));
        setIsEditingAddress(false);
        toast.success("Address updated successfully!");
      } else {
        toast.error("Failed to update address. Please try again.");
      }
    } else {
      setIsEditingAddress(true);
    }
  };

  const handleEditPassword = async () => {
    if (isEditingPassword) {
      if (newPassword.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return;
      }
      const updatedData = { password: newPassword };
      const result = await apiUser.updateUser(updatedData);
      if (result) {
        setNewPassword("");
        setIsEditingPassword(false);
        toast.success("Password updated successfully!");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    } else {
      setIsEditingPassword(true);
    }
  };

  const handleUploadProfilePhoto = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      toast.error("No File Selected");
      return;
    }

    const formData = new FormData();
    formData.append("profile_photo", file);

    try {
      const result = await apiUser.updateProfilePhoto(formData);
      console.log(result);
      if (result.message === "Profile photo updated successfully") {
        setUser((prevUser) => ({
          ...prevUser,
          profile_photo_path: result.data.profile_photo_path,
        }));
        toast.success("Profile photo updated successfully!");
      } else {
        toast.error("Failed to update profile photo. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading profile photo:", error);
      toast.error("Failed to update profile photo. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <NavbarAnggota />

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroPattern}></div>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>👤 My Account</span>
          <h1 style={styles.heroTitle}>Profile Settings</h1>
          <p style={styles.heroSubtitle}>
            Manage your personal information and account preferences
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main style={styles.main}>
        {isLoading ? (
          <div style={styles.loadingContainer}>
            <div
              style={{
                ...styles.loadingSpinner,
                animation: "spin 1s linear infinite",
              }}
            ></div>
            <p style={styles.loadingText}>Loading your profile...</p>
          </div>
        ) : user ? (
          <div style={styles.profileContent}>
            {/* Single Profile Card */}
            <div style={styles.cardUnified}>
              {/* Avatar Section */}
              <div style={styles.avatarSection}>
                <div style={styles.avatarWrapper}>
                  <div style={styles.avatarContainer}>
                    {user.profile_photo_path ? (
                      <img
                        src={`http://127.0.0.1:8000/storage/${user.profile_photo_path}`}
                        style={styles.profileAvatar}
                        alt="Profile"
                      />
                    ) : (
                      <div style={styles.avatarPlaceholder}>
                        <span style={styles.avatarPlaceholderText}>
                          {user.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <button
                      style={styles.avatarEditBtn}
                      onClick={() => document.getElementById("pfp").click()}
                    >
                      <i className="bi bi-camera-fill"></i>
                    </button>
                    <input
                      type="file"
                      name="pfp"
                      id="pfp"
                      style={{ display: "none" }}
                      onChange={handleUploadProfilePhoto}
                      accept="image/*"
                    />
                  </div>
                </div>
                <div style={styles.basicInfo}>
                  <h2 style={styles.profileName}>{user.name}</h2>
                  <p style={styles.profileEmail}>
                    <i className="bi bi-envelope-fill"></i>
                    {user.email}
                  </p>
                  <span style={styles.memberBadge}>
                    <i className="bi bi-star-fill"></i>
                    Active Member
                  </span>
                </div>
              </div>

              {/* Profile Body */}
              <div style={styles.profileBody}>
                {/* Personal Information Section */}
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>
                    <i
                      className="bi bi-person-fill"
                      style={styles.sectionIcon}
                    ></i>
                    Personal Information
                  </h3>

                  {/* Read-only info items */}
                  <div style={styles.infoGrid}>
                    {[
                      {
                        icon: "bi-fingerprint",
                        label: "User ID",
                        value: user.id_user,
                      },
                      {
                        icon: "bi-envelope-fill",
                        label: "Email Address",
                        value: user.email,
                      },
                    ].map((info, index) => (
                      <div
                        key={index}
                        style={{
                          ...styles.infoItem,
                          ...(hoveredInfo === index && {
                            background: "#f0f4f8",
                            transform: "translateX(5px)",
                          }),
                        }}
                        onMouseEnter={() => setHoveredInfo(index)}
                        onMouseLeave={() => setHoveredInfo(null)}
                      >
                        <div style={styles.infoIconWrapper}>
                          <i className={`bi ${info.icon}`}></i>
                        </div>
                        <div style={styles.infoDetails}>
                          <label style={styles.infoLabel}>{info.label}</label>
                          <p style={styles.infoValue}>{info.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Editable fields */}
                  <div
                    style={{ ...styles.settingsItemWrapper, marginTop: "20px" }}
                  >
                    {/* Full Name Edit */}
                    <div style={styles.settingsItem}>
                      <div style={styles.settingsHeader}>
                        <i className="bi bi-person-fill"></i>
                        <span>Full Name</span>
                      </div>
                      <div style={styles.settingsInputWrapper}>
                        <Form.Control
                          type="text"
                          value={newName}
                          readOnly={!isEditingName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="Enter your full name"
                          style={{
                            ...styles.settingsInput,
                            backgroundColor: !isEditingName
                              ? "#ffffff"
                              : "white",
                            border: isEditingName
                              ? "2px solid #ff7043"
                              : "2px solid #e8e8e8",
                          }}
                        />
                        <Button
                          onClick={handleEditName}
                          style={
                            isEditingName ? styles.saveBtn : styles.editBtn
                          }
                        >
                          {isEditingName ? (
                            <>
                              <i className="bi bi-check-lg"></i>
                              <span>Save</span>
                            </>
                          ) : (
                            <>
                              <i className="bi bi-pencil-fill"></i>
                              <span>Edit</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Phone Number Edit */}
                    <div style={styles.settingsItem}>
                      <div style={styles.settingsHeader}>
                        <i className="bi bi-telephone-fill"></i>
                        <span>Phone Number</span>
                      </div>
                      <div style={styles.settingsInputWrapper}>
                        <Form.Control
                          type="tel"
                          value={newPhone}
                          readOnly={!isEditingPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          placeholder="Enter your phone number"
                          style={{
                            ...styles.settingsInput,
                            backgroundColor: !isEditingPhone
                              ? "#ffffff"
                              : "white",
                            border: isEditingPhone
                              ? "2px solid #ff7043"
                              : "2px solid #e8e8e8",
                          }}
                        />
                        <Button
                          onClick={handleEditPhone}
                          style={
                            isEditingPhone ? styles.saveBtn : styles.editBtn
                          }
                        >
                          {isEditingPhone ? (
                            <>
                              <i className="bi bi-check-lg"></i>
                              <span>Save</span>
                            </>
                          ) : (
                            <>
                              <i className="bi bi-pencil-fill"></i>
                              <span>Edit</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Settings Section */}
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>
                    <i
                      className="bi bi-gear-fill"
                      style={styles.sectionIcon}
                    ></i>
                    Account Settings
                  </h3>

                  <div style={styles.settingsItemWrapper}>
                    {/* Address Edit */}
                    <div style={styles.settingsItem}>
                      <div style={styles.settingsHeader}>
                        <i className="bi bi-geo-alt-fill"></i>
                        <span>Address</span>
                      </div>
                      <div style={styles.settingsInputWrapper}>
                        <Form.Control
                          type="text"
                          value={newAddress}
                          readOnly={!isEditingAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                          placeholder="Enter your address"
                          style={{
                            ...styles.settingsInput,
                            backgroundColor: !isEditingAddress
                              ? "#ffffff"
                              : "white",
                            border: isEditingAddress
                              ? "2px solid #ff7043"
                              : "2px solid #e8e8e8",
                          }}
                        />
                        <Button
                          onClick={handleEditAddress}
                          style={
                            isEditingAddress ? styles.saveBtn : styles.editBtn
                          }
                        >
                          {isEditingAddress ? (
                            <>
                              <i className="bi bi-check-lg"></i>
                              <span>Save</span>
                            </>
                          ) : (
                            <>
                              <i className="bi bi-pencil-fill"></i>
                              <span>Edit</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Password Edit */}
                    <div style={styles.settingsItem}>
                      <div style={styles.settingsHeader}>
                        <i className="bi bi-shield-lock-fill"></i>
                        <span>Change Password</span>
                      </div>
                      <div style={styles.settingsInputWrapper}>
                        <Form.Control
                          type={isShowPassword ? "text" : "password"}
                          value={newPassword}
                          readOnly={!isEditingPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          style={{
                            ...styles.settingsInput,
                            backgroundColor: !isEditingPassword
                              ? "#ffffff"
                              : "white",
                            border: isEditingPassword
                              ? "2px solid #ff7043"
                              : "2px solid #e8e8e8",
                          }}
                        />
                        <Button
                          onClick={() => setIsShowPassword(!isShowPassword)}
                          style={styles.visibilityBtn}
                        >
                          {isShowPassword ? (
                            <i className="bi bi-eye-slash-fill"></i>
                          ) : (
                            <i className="bi bi-eye-fill"></i>
                          )}
                        </Button>
                        <Button
                          onClick={handleEditPassword}
                          style={
                            isEditingPassword ? styles.saveBtn : styles.editBtn
                          }
                        >
                          {isEditingPassword ? (
                            <>
                              <i className="bi bi-check-lg"></i>
                              <span>Save</span>
                            </>
                          ) : (
                            <>
                              <i className="bi bi-pencil-fill"></i>
                              <span>Edit</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.errorState}>
            <span style={styles.errorIcon}>😕</span>
            <h2
              style={{
                fontSize: "1.5rem",
                color: "#333",
                marginBottom: "10px",
              }}
            >
              Unable to load profile
            </h2>
            <p style={{ color: "#666" }}>Please try again later</p>
          </div>
        )}
      </main>

      {/* Footer Section */}
      <FooterAnggota />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProfilePage;
