import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignOut } from "../../api/apiAuth";

const NavbarAnggota = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleLogout = async () => {
    const result = await SignOut();
    if (result.success) {
      console.log("Logout successful");
      navigate("/");
    } else {
      console.error("Logout failed:", result.error);
      alert("Failed to log out. Please try again.");
    }
  };

  const isActive = (path) => {
    return location.pathname.toLowerCase() === path.toLowerCase();
  };

  const styles = {
    appBar: {
      position: "fixed",
      top: 0,
      width: "100%",
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 50px",
      background: "linear-gradient(145deg, #ffffff, #e0e0e0)",
      zIndex: 1000,
      boxShadow: isHovered
        ? "0px 5px 15px rgba(0, 0, 0, 0.15)"
        : "1px 1px 5px rgba(0, 0, 0, 1)",
      borderBottom: "1px solid rgba(0, 0, 0, 0.9)",
      transition: "all 0.3s ease",
      transform: isHovered ? "translateY(-3px)" : "none",
      boxSizing: "border-box",
    },
    logo: {
      marginLeft: "20px",
      display: "flex",
      alignItems: "center",
    },
    logoLink: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      gap: "10px",
      transition: "all 0.3s ease",
    },
    logoImage: {
      height: "60px",
      width: "auto",
      objectFit: "contain",
      transition: "transform 0.3s ease",
    },
    logoText: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#333",
      transition: "all 0.3s ease",
      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "25px",
      marginRight: "20px",
    },
    navLink: {
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: 600,
      color: "#333",
      padding: "8px 15px",
      borderRadius: "20px",
      transition: "all 0.3s ease",
      position: "relative",
    },
    navLinkHover: {
      color: "#ff7043",
      backgroundColor: "rgba(255, 112, 67, 0.1)",
      transform: "translateY(-2px)",
    },
    navLinkActive: {
      color: "#ff7043",
      textDecoration: "none",
      fontSize: "17px",
      fontWeight: 700,
      backgroundColor: "rgba(255, 112, 67, 0.15)",
      padding: "8px 15px",
      borderRadius: "20px",
      boxShadow: "0 2px 8px rgba(255, 112, 67, 0.2)",
    },
    btnLogout: {
      padding: "10px 20px",
      fontSize: "16px",
      border: "none",
      borderRadius: "20px",
      backgroundColor: "#ff7043",
      color: "white",
      cursor: "pointer",
      fontWeight: "bold",
      boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
  };

  const getNavLinkStyle = (path) => {
    const basePath = path.toLowerCase();
    if (isActive(basePath)) {
      return styles.navLinkActive;
    }
    if (hoveredLink === basePath) {
      return { ...styles.navLink, ...styles.navLinkHover };
    }
    return styles.navLink;
  };

  return (
    <header
      style={styles.appBar}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>
          <img
            src="/src/assets/images/logo-image.png"
            alt="Logo"
            style={styles.logoImage}
          />
          <span style={styles.logoText}>Atma Library</span>
        </Link>
      </div>
      <nav style={styles.navLinks}>
        <Link
          to="/HomePage"
          style={getNavLinkStyle("/homepage")}
          onMouseEnter={() => setHoveredLink("/homepage")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Home
        </Link>
        <Link
          to="/mybooks"
          style={getNavLinkStyle("/mybooks")}
          onMouseEnter={() => setHoveredLink("/mybooks")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          MyBooks
        </Link>
        <Link
          to="/CategoryPage"
          style={getNavLinkStyle("/categorypage")}
          onMouseEnter={() => setHoveredLink("/categorypage")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Category
        </Link>
        <Link
          to="/profile"
          style={getNavLinkStyle("/profile")}
          onMouseEnter={() => setHoveredLink("/profile")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Profile
        </Link>
        <button style={styles.btnLogout} onClick={handleLogout}>
          Log Out
        </button>
      </nav>
    </header>
  );
};

export default NavbarAnggota;
