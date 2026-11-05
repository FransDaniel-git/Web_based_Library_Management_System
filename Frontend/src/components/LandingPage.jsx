import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import apiLandingPage from "../api/apiLandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = () => {
  const [popularBooks, setPopularBooks] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(true);
  const [hoveredBook, setHoveredBook] = useState(null);
  const [hoveredNewArrival, setHoveredNewArrival] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredContact, setHoveredContact] = useState(null);
  const baseURL = "http://127.0.0.1:8000";

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#f5f7fa",
    },
    // Navbar styles
    navbar: {
      position: "fixed",
      top: 0,
      width: "100%",
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 50px",
      background: "linear-gradient(145deg, #ffffff, #e0e0e0)",
      zIndex: 100,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
      borderBottom: "1px solid rgba(0, 0, 0, 0.09)",
      transition: "all 0.3s ease",
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
    btnPrimary: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 24px",
      borderRadius: "20px",
      fontSize: "1rem",
      fontWeight: 700,
      textDecoration: "none",
      transition: "all 0.3s ease",
      background: "linear-gradient(135deg, #ff7043, #ff5722)",
      color: "white",
      boxShadow: "0 4px 15px rgba(255, 112, 67, 0.18)",
      border: "none",
      cursor: "pointer",
    },
    btnSecondary: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 24px",
      borderRadius: "20px",
      fontSize: "1rem",
      fontWeight: 700,
      textDecoration: "none",
      transition: "all 0.3s ease",
      background: "#3949ab",
      color: "#fff",
      border: "2px solid #3949ab",
      boxShadow: "0 2px 8px rgba(57, 73, 171, 0.12)",
      cursor: "pointer",
    },
    // Hero Section
    heroSection: {
      position: "relative",
      height: "100vh",
      minHeight: "700px",
      overflow: "hidden",
    },
    heroCarousel: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
    heroSlide: {
      position: "relative",
      width: "100%",
      height: "100vh",
    },
    heroSlideImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    heroOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.35)", // semi-transparan hitam
      zIndex: 2,
    },
    heroContent: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      zIndex: 10,
      width: "90%",
      maxWidth: "900px",
      paddingTop: "60px",
    },
    heroBadge: {
      display: "inline-block",
      padding: "10px 25px",
      background: "rgba(255, 255, 255, 0.15)",
      borderRadius: "50px",
      color: "white",
      fontSize: "1rem",
      fontWeight: 500,
      marginBottom: "25px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    heroTitle: {
      fontSize: "4rem",
      fontWeight: 800,
      color: "white",
      marginBottom: "20px",
      lineHeight: 1.1,
      textShadow: "2px 4px 8px rgba(0, 0, 0, 0.3)",
    },
    heroSubtitle: {
      fontSize: "1.3rem",
      color: "rgba(255, 255, 255, 0.9)",
      maxWidth: "600px",
      margin: "0 auto 35px",
      lineHeight: 1.7,
    },
    heroActions: {
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      marginBottom: "50px",
    },
    heroStats: {
      display: "flex",
      justifyContent: "center",
      gap: "60px",
    },
    heroStat: {
      textAlign: "center",
    },
    statNumber: {
      display: "block",
      fontSize: "2.5rem",
      fontWeight: 800,
      color: "white",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    },
    statText: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.8)",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    // Section styles
    sectionHeader: {
      textAlign: "center",
      marginBottom: "50px",
    },
    sectionBadge: {
      display: "inline-block",
      padding: "8px 20px",
      background: "linear-gradient(135deg, #1a237e, #3949ab)",
      borderRadius: "50px",
      color: "white",
      fontSize: "0.9rem",
      fontWeight: 500,
      marginBottom: "15px",
    },
    sectionTitle: {
      fontSize: "2.8rem",
      fontWeight: 800,
      color: "#1a237e",
      marginBottom: "15px",
    },
    sectionSubtitle: {
      fontSize: "1.1rem",
      color: "#666",
      maxWidth: "500px",
      margin: "0 auto",
      lineHeight: 1.6,
    },
    // Popular Books Section
    popularSection: {
      padding: "100px 20px",
      background:
        "linear-gradient(180deg, #f5f7fa 0%, #ffffff 50%, #f5f7fa 100%)",
      position: "relative",
      overflow: "hidden",
    },
    popularPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231a237e' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      opacity: 1,
    },
    // New Arrivals Section
    newArrivalsSection: {
      padding: "100px 20px",
      background:
        "linear-gradient(180deg, #f5f7fa 0%, #ffffff 50%, #f5f7fa 100%)",
      position: "relative",
      overflow: "hidden",
    },
    newArrivalsPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231a237e' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      opacity: 1,
    },
    newArrivalsSectionHeader: {
      textAlign: "center",
      marginBottom: "50px",
      position: "relative",
      zIndex: 2,
      paddingTop: "32px",
      paddingBottom: "32px",
    },
    newArrivalsBadge: {
      display: "inline-block",
      padding: "8px 20px",
      background: "linear-gradient(135deg, #1a237e, #3949ab)",
      borderRadius: "50px",
      color: "#fff",
      fontSize: "1rem",
      fontWeight: 600,
      marginBottom: "15px",
      boxShadow: "0 2px 8px rgba(26, 35, 126, 0.15)",
      border: "none",
    },
    newArrivalsTitle: {
      fontSize: "3rem",
      fontWeight: 900,
      color: "#1a237e",
      marginBottom: "15px",
      textShadow: "none",
      letterSpacing: "1px",
    },
    newArrivalsSubtitle: {
      fontSize: "1.15rem",
      color: "#e3e7fa",
      maxWidth: "500px",
      margin: "0 auto",
      lineHeight: 1.6,
      textShadow: "1px 2px 8px rgba(26, 35, 126, 0.18)",
    },
    newArrivalsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "30px",
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
    },
    popularBooksGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: "30px",
      maxWidth: "1200px",
      margin: "0 auto 50px",
      position: "relative",
      zIndex: 1,
    },
    bookCard: {
      background: "#ffffff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow:
        "0 10px 40px rgba(26, 35, 126, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)",
      textDecoration: "none",
      color: "inherit",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      border: "1px solid rgba(26, 35, 126, 0.1)",
    },
    bookCardHovered: {
      transform: "translateY(-12px) scale(1.02)",
      boxShadow:
        "0 25px 60px rgba(26, 35, 126, 0.25), 0 10px 20px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(26, 35, 126, 0.2)",
    },
    bookImageWrapper: {
      position: "relative",
      height: "280px",
      overflow: "hidden",
      background:
        "linear-gradient(145deg, #1a237e 0%, #3949ab 50%, #5c6bc0 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    bookImage: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
      transition: "transform 0.5s ease",
      borderRadius: "8px",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
      position: "relative",
      zIndex: 1,
    },
    bookImageHovered: {
      transform: "scale(1.08) rotate(-2deg)",
    },
    bookInfo: {
      padding: "15px 18px",
      background: "white",
      textAlign: "center",
    },
    bookTitle: {
      fontSize: "0.95rem",
      fontWeight: 700,
      color: "#1a237e",
      margin: "0 0 6px 0",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      lineHeight: 1.4,
    },
    bookAuthor: {
      fontSize: "0.85rem",
      color: "#888",
      margin: 0,
      fontStyle: "italic",
    },
    sectionFooter: {
      textAlign: "center",
      position: "relative",
      zIndex: 1,
    },
    browseAllBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      padding: "16px 35px",
      background: "linear-gradient(135deg, #1a237e, #3949ab)",
      color: "white",
      borderRadius: "50px",
      fontSize: "1.1rem",
      fontWeight: 600,
      textDecoration: "none",
      transition: "all 0.3s ease",
      boxShadow: "0 8px 25px rgba(26, 35, 126, 0.3)",
    },
    // Loading & Empty states
    loadingState: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 20px",
      gap: "15px",
      gridColumn: "1 / -1",
    },
    loadingSpinner: {
      width: "50px",
      height: "50px",
      border: "4px solid #f0f0f0",
      borderTopColor: "#ff7043",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    emptyState: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 20px",
      gap: "15px",
      gridColumn: "1 / -1",
    },
    emptyIcon: {
      fontSize: "4rem",
    },
    // Footer styles
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
    footerLinksTitle: {
      fontSize: "18px",
      fontWeight: 600,
      marginBottom: "20px",
      color: "#ffffff",
      position: "relative",
      paddingBottom: "10px",
      borderBottom: "3px solid #ff7043",
      display: "inline-block",
    },
    footerLinksList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    footerLinksItem: {
      marginBottom: "12px",
    },
    footerLinksLink: {
      color: "rgba(255, 255, 255, 0.8)",
      textDecoration: "none",
      fontSize: "14px",
      transition: "all 0.3s ease",
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

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await apiLandingPage.getTopBooks();
        setPopularBooks(books);
      } catch (error) {
        console.error("Error fetching books:", error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchNewArrivals = async () => {
      try {
        const books = await apiLandingPage.getNewArrivalBooks();
        setNewArrivals(books);
      } catch (error) {
        console.error("Error fetching new arrivals:", error.message);
      } finally {
        setLoadingNewArrivals(false);
      }
    };

    fetchBooks();
    fetchNewArrivals();
  }, []);

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <header style={styles.navbar}>
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
          <Link to="/login" style={styles.btnSecondary}>
            Log In
          </Link>
          <Link to="/register" style={styles.btnPrimary}>
            Register
          </Link>
        </nav>
      </header>

      {/* Hero Section with Carousel */}
      <section style={styles.heroSection}>
        <div style={styles.heroCarousel}>
          <Carousel
            interval={4000}
            fade
            wrap
            controls={false}
            indicators={true}
          >
            <Carousel.Item>
              <div style={styles.heroSlide}>
                <img
                  src="/src/assets/images/carousel/bg-image1.jpg"
                  alt="Slide 1"
                  style={styles.heroSlideImg}
                />
                <div style={styles.heroOverlay}></div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div style={styles.heroSlide}>
                <img
                  src="/src/assets/images/carousel/bg-image2.jpg"
                  alt="Slide 2"
                  style={styles.heroSlideImg}
                />
                <div style={styles.heroOverlay}></div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div style={styles.heroSlide}>
                <img
                  src="/src/assets/images/carousel/bg-image3.jpg"
                  alt="Slide 3"
                  style={styles.heroSlideImg}
                />
                <div style={styles.heroOverlay}></div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>

        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>📚 Welcome to ATMA Library</span>
          <h1 style={styles.heroTitle}>
            Discover Your Next
            <br />
            Great Read
          </h1>
          <p style={styles.heroSubtitle}>
            Explore thousands of books, from timeless classics to modern
            masterpieces. Your gateway to knowledge and inspiration.
          </p>
          <div style={styles.heroActions}>
            {/* Removed Get Started and Sign In buttons as requested */}
          </div>
          <div style={styles.heroStats}>
            <div style={styles.heroStat}>
              <span style={styles.statNumber}>1000+</span>
              <span style={styles.statText}>Books Available</span>
            </div>
            <div style={styles.heroStat}>
              <span style={styles.statNumber}>500+</span>
              <span style={styles.statText}>Active Members</span>
            </div>
            <div style={styles.heroStat}>
              <span style={styles.statNumber}>50+</span>
              <span style={styles.statText}>Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section style={styles.newArrivalsSection}>
        <div style={styles.newArrivalsPattern}></div>
        <div style={styles.newArrivalsSectionHeader}>
          <span style={styles.newArrivalsBadge}>
            <span style={{ marginRight: 8 }}>✨</span>
            <span style={{ fontWeight: 700 }}>Fresh Collection</span>
          </span>
          <h2 style={styles.newArrivalsTitle}>New Arrivals</h2>
          <p
            style={{
              ...styles.newArrivalsSubtitle,
              color: "#666",
              fontWeight: 400,
              textShadow: "none",
              marginTop: "18px",
              marginBottom: 0,
            }}
          >
            Be the first to explore our latest additions to the library
          </p>
        </div>

        <div style={styles.newArrivalsGrid}>
          {loadingNewArrivals ? (
            <div style={{ ...styles.loadingState, gridColumn: "1 / -1" }}>
              <div style={styles.loadingSpinner}></div>
              <p style={{ color: "white" }}>Loading new arrivals...</p>
            </div>
          ) : newArrivals.length > 0 ? (
            <>
              {newArrivals.slice(0, 4).map((book) => {
                const isHovered =
                  hoveredNewArrival === `arrival-${book.id_buku}`;
                return (
                  <Link
                    to="/login"
                    key={book.id_buku}
                    style={{
                      ...styles.bookCard,
                      ...(isHovered ? styles.bookCardHovered : {}),
                    }}
                    onMouseEnter={() =>
                      setHoveredNewArrival(`arrival-${book.id_buku}`)
                    }
                    onMouseLeave={() => setHoveredNewArrival(null)}
                  >
                    <div style={styles.bookImageWrapper}>
                      <img
                        src={`${baseURL}/storage/${book.book_poster}`}
                        alt={book.judul}
                        style={{
                          ...styles.bookImage,
                          ...(isHovered ? styles.bookImageHovered : {}),
                        }}
                      />
                    </div>
                    <div style={styles.bookInfo}>
                      <h3 style={styles.bookTitle}>{book.judul}</h3>
                      <p style={styles.bookAuthor}>{book.pengarang}</p>
                    </div>
                  </Link>
                );
              })}
              <div
                style={{
                  textAlign: "center",
                  gridColumn: "1 / -1",
                  marginTop: "30px",
                }}
              >
                <Link
                  to="/login"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px 40px",
                    background: "linear-gradient(135deg, #ff7043, #ff5722)",
                    color: "white",
                    borderRadius: "50px",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    boxShadow: "0 10px 30px rgba(255, 112, 67, 0.35)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span>🔍</span>
                  Explore All New Books
                  <span>→</span>
                </Link>
              </div>
            </>
          ) : (
            <div style={{ ...styles.emptyState, gridColumn: "1 / -1" }}>
              <span style={styles.emptyIcon}>📚</span>
              <p style={{ color: "white" }}>No new arrivals available</p>
            </div>
          )}
        </div>
      </section>

      {/* Popular Books Section */}
      <section style={styles.popularSection}>
        <div style={styles.popularPattern}></div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionBadge}>🔥 Trending Now</span>
            <h2 style={styles.sectionTitle}>Popular Books</h2>
            <p style={styles.sectionSubtitle}>
              Discover what everyone is reading right now
            </p>
          </div>

          <div style={styles.popularBooksGrid}>
            {loading ? (
              <div style={styles.loadingState}>
                <div style={styles.loadingSpinner}></div>
                <p>Loading popular books...</p>
              </div>
            ) : popularBooks.length > 0 ? (
              popularBooks.map((book) => (
                <Link
                  to="/login"
                  key={book.id_buku}
                  style={{
                    ...styles.bookCard,
                    ...(hoveredBook === book.id_buku
                      ? styles.bookCardHovered
                      : {}),
                  }}
                  onMouseEnter={() => setHoveredBook(book.id_buku)}
                  onMouseLeave={() => setHoveredBook(null)}
                >
                  <div style={styles.bookImageWrapper}>
                    <img
                      src={`${baseURL}/storage/${book.book_poster}`}
                      alt={book.judul}
                      style={{
                        ...styles.bookImage,
                        ...(hoveredBook === book.id_buku
                          ? styles.bookImageHovered
                          : {}),
                      }}
                    />
                  </div>
                  <div style={styles.bookInfo}>
                    <h3 style={styles.bookTitle}>{book.judul}</h3>
                    <p style={styles.bookAuthor}>{book.pengarang}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div style={styles.emptyState}>
                <span style={styles.emptyIcon}>📚</span>
                <p>No popular books available</p>
              </div>
            )}
          </div>

          <div style={styles.sectionFooter}>
            <Link to="/login" style={styles.browseAllBtn}>
              Browse All Books
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <div style={styles.footerWave}>
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "60px", display: "block" }}
          >
            <path
              d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
              fill="#1a237e"
            ></path>
          </svg>
        </div>
        <div style={styles.footerMain}>
          <div style={styles.footerContainer}>
            {/* Logo and Library Name */}
            <div style={styles.footerBrand}>
              <div style={styles.footerLogo}>
                <img
                  src="/src/assets/images/logo-image.png"
                  alt="Atma Library Logo"
                  style={styles.footerLogoImage}
                />
                <h2 style={styles.footerLogoText}>Atma Library</h2>
              </div>
              <p style={styles.footerTagline}>
                Your gateway to knowledge and inspiration
              </p>
              <div style={styles.footerSocial}>
                {[
                  {
                    href: "https://instagram.com/atmalibrary",
                    label: "Instagram",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                  },
                  {
                    href: "mailto:atmalibrary@example.com",
                    label: "Email",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                      </svg>
                    ),
                  },
                  {
                    href: "https://wa.me/6281234567890",
                    label: "WhatsApp",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                    ),
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    style={{
                      ...styles.socialIcon,
                      ...(hoveredSocial === index && {
                        background: "#ff7043",
                        transform: "translateY(-3px)",
                        boxShadow: "0 4px 15px rgba(255, 112, 67, 0.4)",
                      }),
                    }}
                    aria-label={social.label}
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 style={styles.footerLinksTitle}>Quick Links</h3>
              <ul style={styles.footerLinksList}>
                {[
                  { to: "/login", label: "Log In" },
                  { to: "/register", label: "Register" },
                ].map((link, index) => (
                  <li key={index} style={styles.footerLinksItem}>
                    <Link
                      to={link.to}
                      style={{
                        ...styles.footerLinksLink,
                        ...(hoveredLink === index && {
                          color: "#ff7043",
                          paddingLeft: "5px",
                        }),
                      }}
                      onMouseEnter={() => setHoveredLink(index)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 style={styles.footerLinksTitle}>Contact Us</h3>
              {[
                { icon: "📷", text: "@atmalibrary" },
                { icon: "📧", text: "atmalibrary@example.com" },
                { icon: "📞", text: "081234567890" },
              ].map((contact, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.contactItem,
                    ...(hoveredContact === index && {
                      color: "#ff7043",
                      transform: "translateX(5px)",
                    }),
                  }}
                  onMouseEnter={() => setHoveredContact(index)}
                  onMouseLeave={() => setHoveredContact(null)}
                >
                  <span style={styles.contactIcon}>{contact.icon}</span>
                  <span>{contact.text}</span>
                </div>
              ))}
            </div>

            {/* Address */}
            <div>
              <h3 style={styles.footerLinksTitle}>Visit Us</h3>
              <div style={styles.addressContent}>
                <span style={styles.addressIcon}>📍</span>
                <p style={styles.addressText}>
                  Jl. Babarsari No.1, Janti, Caturtunggal,
                  <br />
                  Kec. Depok, Kabupaten Sleman,
                  <br />
                  Daerah Istimewa Yogyakarta 55281
                </p>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.footerBottomText}>
            &copy; {new Date().getFullYear()} Atma Library. All rights reserved.
          </p>
        </div>
      </footer>

      <ToastContainer position="top-right" autoClose={3000} />

      {/* CSS for animations */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
