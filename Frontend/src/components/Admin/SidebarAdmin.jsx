import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SignOut } from "../../api/apiAuth";

const styles = {
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
    transition: "transform 0.3s ease",
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
    transform: "translateX(5px)",
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
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(255, 82, 82, 0.4)",
  },
};

const navLinks = [
  { to: "/HomeAdmin", icon: "📊", label: "Dashboard" },
  { to: "/BookAdmin", icon: "📚", label: "Manage Books" },
  { to: "/Returning", icon: "🔄", label: "Returns" },
];

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredNav, setHoveredNav] = useState(null);
  const [hoveredLogout, setHoveredLogout] = useState(false);

  const handleLogout = async () => {
    try {
      await SignOut();
      sessionStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      sessionStorage.clear();
      navigate("/");
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <img
          src="/src/assets/images/logo-image.png"
          alt="Logo"
          style={styles.sidebarLogo}
        />
        <h2 style={styles.sidebarTitle}>Atma Library</h2>
        <span style={styles.sidebarSubtitle}>Admin Panel</span>
      </div>

      <nav style={styles.sidebarNav}>
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            style={{
              ...styles.sidebarLink,
              ...(isActive(link.to) && styles.sidebarLinkActive),
              ...(hoveredNav === index &&
                !isActive(link.to) &&
                styles.sidebarLinkHover),
            }}
            onMouseEnter={() => setHoveredNav(index)}
            onMouseLeave={() => setHoveredNav(null)}
          >
            <span style={styles.sidebarIcon}>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <div style={styles.sidebarFooter}>
        <button
          style={{
            ...styles.logoutBtn,
            ...(hoveredLogout && styles.logoutBtnHover),
          }}
          onClick={handleLogout}
          onMouseEnter={() => setHoveredLogout(true)}
          onMouseLeave={() => setHoveredLogout(false)}
        >
          <span style={styles.sidebarIcon}>🚪</span>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
