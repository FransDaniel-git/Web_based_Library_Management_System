import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { GetAllUsers } from "../../api/Admin/apiUser";
import SidebarAdmin from "./SidebarAdmin";

const styles = {
  dashboard: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)",
  },
  sidebar: {
    width: "280px",
    background:
      "linear-gradient(180deg, #1a237e 0%, #283593 50%, #303f9f 100%)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    height: "100vh",
    zIndex: "100",
    boxShadow: "4px 0 20px rgba(0, 0, 0, 0.15)",
  },
  sidebarHeader: {
    padding: "30px 20px",
    textAlign: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(0, 0, 0, 0.1)",
  },
  sidebarLogo: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    padding: "10px",
    background: "white",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    marginBottom: "15px",
  },
  sidebarTitle: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "5px",
    letterSpacing: "1px",
  },
  sidebarSubtitle: {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "3px",
    opacity: "0.7",
    color: "#ff7043",
  },
  sidebarNav: {
    flex: "1",
    padding: "20px 15px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  sidebarLink: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px 20px",
    color: "rgba(255, 255, 255, 0.8)",
    textDecoration: "none",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    fontSize: "15px",
    fontWeight: "500",
  },
  sidebarLinkActive: {
    background: "linear-gradient(135deg, #ff7043 0%, #ff5722 100%)",
    color: "white",
    boxShadow: "0 4px 15px rgba(255, 112, 67, 0.4)",
  },
  sidebarLinkHover: {
    background: "rgba(255, 255, 255, 0.15)",
    color: "white",
  },
  sidebarIcon: {
    fontSize: "20px",
    width: "30px",
    textAlign: "center",
  },
  sidebarFooter: {
    padding: "20px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  logoutBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "14px 20px",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "white",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
    transition: "all 0.3s ease",
  },
  logoutBtnHover: {
    background: "#ff5252",
    borderColor: "#ff5252",
  },
  main: {
    flex: "1",
    marginLeft: "280px",
    padding: "30px",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "30px",
    padding: "25px 30px",
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  headerH1: {
    fontSize: "28px",
    color: "#1a237e",
    marginBottom: "5px",
    fontWeight: "700",
  },
  headerP: {
    color: "#666",
    fontSize: "14px",
    margin: "0",
  },
  headerDate: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "linear-gradient(135deg, #e8eaf6, #c5cae9)",
    padding: "12px 20px",
    borderRadius: "12px",
    color: "#1a237e",
    fontWeight: "600",
    fontSize: "14px",
  },
  statsSection: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    background: "white",
    borderRadius: "20px",
    padding: "25px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
  },
  statCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
  },
  statIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    background: "linear-gradient(135deg, #e8eaf6, #c5cae9)",
  },
  statInfoH3: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1a237e",
    margin: "0",
  },
  statInfoP: {
    color: "#666",
    fontSize: "14px",
    margin: "0",
  },
  statTrend: {
    position: "absolute",
    top: "15px",
    right: "15px",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
    background: "#e3f2fd",
    color: "#1565c0",
  },
  searchCard: {
    background: "white",
    borderRadius: "20px",
    padding: "25px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    width: "100%",
  },
  searchIcon: {
    fontSize: "24px",
  },
  searchInput: {
    flex: "1",
    height: "50px",
    padding: "12px 20px",
    border: "2px solid #e8ecf1",
    borderRadius: "12px",
    fontSize: "15px",
    color: "#333",
    background: "#f8f9fc",
    outline: "none",
    transition: "all 0.3s ease",
  },
  searchInputFocus: {
    borderColor: "#ff7043",
    background: "#ffffff",
    boxShadow: "0 0 0 4px rgba(255, 112, 67, 0.12)",
  },
  usersSection: {
    marginBottom: "30px",
  },
  usersCard: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  usersHeader: {
    padding: "25px 30px",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  usersTitleH2: {
    fontSize: "20px",
    color: "#1a237e",
    margin: "0",
  },
  usersCount: {
    background: "#e8eaf6",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    color: "#3f51b5",
    fontWeight: "600",
    marginLeft: "10px",
  },
  usersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
    padding: "25px 30px",
  },
  userCard: {
    background: "#f8f9fc",
    borderRadius: "16px",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    transition: "all 0.3s ease",
    border: "2px solid transparent",
  },
  userCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
    borderColor: "#ff7043",
  },
  userAvatarWrapper: {
    position: "relative",
    marginBottom: "15px",
  },
  userAvatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid white",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  },
  userStatus: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "#4caf50",
    border: "3px solid white",
  },
  userName: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1a237e",
    margin: "0 0 5px 0",
  },
  userId: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "10px",
  },
  userContact: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#666",
    fontSize: "14px",
    marginBottom: "15px",
  },
  btnViewDetails: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "12px 20px",
    background: "linear-gradient(135deg, #ff7043 0%, #ff5722 100%)",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  btnViewDetailsHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(255, 112, 67, 0.4)",
  },
  loadingState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #e0e0e0",
    borderTopColor: "#1a237e",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  },
  loadingText: {
    color: "#666",
    fontSize: "16px",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    textAlign: "center",
  },
  emptyIcon: {
    fontSize: "80px",
    marginBottom: "20px",
  },
  emptyH3: {
    color: "#333",
    fontSize: "24px",
    marginBottom: "10px",
  },
  emptyP: {
    color: "#666",
    fontSize: "16px",
  },
};

const spinKeyframes = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const UserReturnsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalUsers, setOriginalUsers] = useState([]);
  const [hoveredStat, setHoveredStat] = useState(false);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [focusedInput, setFocusedInput] = useState(false);
  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await GetAllUsers();
        const filteredUsers = data.filter((user) => user.role === "anggota");
        setUsers(filteredUsers);
        setOriginalUsers(filteredUsers);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setUsers(originalUsers);
      return;
    }

    const filteredData = originalUsers.filter((user) =>
      (user.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    setUsers(filteredData);
  }, [searchTerm, originalUsers]);

  const handleDetails = (userId) => {
    navigate(`/return-details/${userId}`);
  };

  const totalUsers = originalUsers.length;

  return (
    <div style={styles.dashboard}>
      <style>{spinKeyframes}</style>

      {/* Sidebar */}
      <SidebarAdmin />

      {/* Main Content */}
      <main style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.headerH1}>🔄 Book Returns</h1>
            <p style={styles.headerP}>
              Manage user book returns and track borrowing history.
            </p>
          </div>
        </header>

        {/* Stats Section */}
        <section style={styles.statsSection}>
          <div
            style={{
              ...styles.statCard,
              ...(hoveredStat && styles.statCardHover),
            }}
            onMouseEnter={() => setHoveredStat(true)}
            onMouseLeave={() => setHoveredStat(false)}
          >
            <div style={styles.statIcon}>👥</div>
            <div>
              <h3 style={styles.statInfoH3}>{totalUsers}</h3>
              <p style={styles.statInfoP}>Total Members</p>
            </div>
            <div style={styles.statTrend}>Active</div>
          </div>

          <div style={styles.searchCard}>
            <div style={styles.searchWrapper}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search members by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  ...styles.searchInput,
                  ...(focusedInput && styles.searchInputFocus),
                }}
                onFocus={() => setFocusedInput(true)}
                onBlur={() => setFocusedInput(false)}
              />
            </div>
          </div>
        </section>

        {/* Users Section */}
        <section style={styles.usersSection}>
          <div style={styles.usersCard}>
            <div style={styles.usersHeader}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2 style={styles.usersTitleH2}>👥 Library Members</h2>
                <span style={styles.usersCount}>
                  {users.length} members found
                </span>
              </div>
            </div>

            {loading ? (
              <div style={styles.loadingState}>
                <div style={styles.spinner}></div>
                <p style={styles.loadingText}>Loading members...</p>
              </div>
            ) : error ? (
              <div style={styles.emptyState}>
                <span style={styles.emptyIcon}>⚠️</span>
                <p style={styles.emptyP}>{error}</p>
              </div>
            ) : users.length > 0 ? (
              <div style={styles.usersGrid}>
                {users.map((user) => (
                  <div
                    key={user.id_user}
                    style={{
                      ...styles.userCard,
                      ...(hoveredUser === user.id_user && styles.userCardHover),
                    }}
                    onMouseEnter={() => setHoveredUser(user.id_user)}
                    onMouseLeave={() => setHoveredUser(null)}
                  >
                    <div style={styles.userAvatarWrapper}>
                      <img
                        src={`${baseURL}/storage/${user.profile_photo_path}`}
                        alt={user.name}
                        style={styles.userAvatar}
                        onError={(e) => {
                          e.target.src =
                            "/src/assets/images/default-avatar.png";
                        }}
                      />
                      <div style={styles.userStatus}></div>
                    </div>
                    <div style={styles.userInfo}>
                      <h4 style={styles.userName}>
                        {user.name || "Unknown User"}
                      </h4>
                      <span style={styles.userId}>ID: #{user.id_user}</span>
                      <div style={styles.userContact}>
                        <span>📞</span>
                        <span>{user.no_telp || "N/A"}</span>
                      </div>
                    </div>
                    <button
                      style={{
                        ...styles.btnViewDetails,
                        ...(hoveredBtn === user.id_user &&
                          styles.btnViewDetailsHover),
                      }}
                      onClick={() => handleDetails(user.id_user)}
                      onMouseEnter={() => setHoveredBtn(user.id_user)}
                      onMouseLeave={() => setHoveredBtn(null)}
                    >
                      <span>View Details</span>
                      <span>→</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.emptyState}>
                <span style={styles.emptyIcon}>👤</span>
                <h3 style={styles.emptyH3}>No Members Found</h3>
                <p style={styles.emptyP}>
                  {searchTerm
                    ? `No members matching "${searchTerm}"`
                    : "There are no members registered yet."}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserReturnsPage;
