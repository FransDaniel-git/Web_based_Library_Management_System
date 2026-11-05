import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import apiHomePage from "../../api/Anggota/apiHomePage";
import NavbarAnggota from "./NavbarAnggota";
import FooterAnggota from "./FooterAnggota";

const HomePage = () => {
  const [popularBooks, setPopularBooks] = useState([]);
  const [newArrivalBooks, setNewArrivalBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(true);
  const [hoveredBook, setHoveredBook] = useState(null);
  const baseURL = "http://127.0.0.1:8000";

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#f5f7fa",
    },
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
    heroBtnPrimary: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      padding: "16px 32px",
      borderRadius: "50px",
      fontSize: "1.1rem",
      fontWeight: 600,
      textDecoration: "none",
      transition: "all 0.3s ease",
      background: "linear-gradient(135deg, #ff7043, #ff5722)",
      color: "white",
      boxShadow: "0 8px 25px rgba(255, 112, 67, 0.4)",
    },
    heroBtnSecondary: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      padding: "16px 32px",
      borderRadius: "50px",
      fontSize: "1.1rem",
      fontWeight: 600,
      textDecoration: "none",
      transition: "all 0.3s ease",
      background: "rgba(255, 255, 255, 0.15)",
      color: "white",
      border: "2px solid rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(10px)",
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
    newArrivalsContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      zIndex: 1,
    },
    arrivalsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: "30px",
      maxWidth: "1200px",
      margin: "0 auto 50px",
    },
    arrivalCard: {
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
    arrivalCardHovered: {
      transform: "translateY(-12px) scale(1.02)",
      boxShadow:
        "0 25px 60px rgba(26, 35, 126, 0.25), 0 10px 20px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(26, 35, 126, 0.2)",
    },
    arrivalLink: {
      textDecoration: "none",
      color: "inherit",
      display: "block",
    },
    arrivalImageWrapper: {
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
    arrivalImage: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
      transition: "transform 0.5s ease",
      borderRadius: "8px",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
      position: "relative",
      zIndex: 1,
    },
    arrivalImageHovered: {
      transform: "scale(1.08) rotate(-2deg)",
    },
    arrivalInfo: {
      padding: "15px 18px",
      background: "white",
      textAlign: "center",
    },
    arrivalTitle: {
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
    arrivalAuthor: {
      fontSize: "0.85rem",
      color: "#888",
      margin: 0,
      fontStyle: "italic",
    },
    arrivalsShowMore: {
      textAlign: "center",
    },
    showMoreBtn: {
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
    },
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
    bookOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(to top, rgba(26, 35, 126, 0.9), transparent)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      paddingBottom: "20px",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    bookOverlayVisible: {
      opacity: 1,
    },
    viewBtn: {
      padding: "10px 25px",
      background: "linear-gradient(135deg, #ff7043, #ff5722)",
      color: "white",
      borderRadius: "25px",
      fontSize: "0.9rem",
      fontWeight: 600,
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
    bookRating: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    ratingStars: {
      fontSize: "0.8rem",
    },
    ratingCount: {
      fontSize: "0.75rem",
      color: "#ff7043",
      fontWeight: 600,
      background: "rgba(255, 112, 67, 0.1)",
      padding: "3px 10px",
      borderRadius: "10px",
    },
    sectionFooter: {
      textAlign: "center",
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
    featuresSection: {
      padding: "80px 20px",
      background: "linear-gradient(135deg, #1a237e 0%, #3949ab 100%)",
      position: "relative",
      overflow: "hidden",
    },
    featuresPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      opacity: 0.5,
    },
    featuresSectionBadge: {
      display: "inline-block",
      padding: "8px 20px",
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(10px)",
      borderRadius: "50px",
      color: "white",
      fontSize: "0.9rem",
      fontWeight: 500,
      marginBottom: "15px",
    },
    featuresSectionTitle: {
      fontSize: "2.8rem",
      fontWeight: 800,
      color: "white",
      marginBottom: "15px",
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "30px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    featureCard: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      padding: "35px 25px",
      textAlign: "center",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s ease",
    },
    featureCardHovered: {
      background: "rgba(255, 255, 255, 0.15)",
      transform: "translateY(-10px)",
    },
    featureIcon: {
      fontSize: "3rem",
      marginBottom: "20px",
    },
    featureCardTitle: {
      fontSize: "1.2rem",
      fontWeight: 700,
      color: "white",
      marginBottom: "12px",
    },
    featureCardText: {
      fontSize: "0.95rem",
      color: "rgba(255, 255, 255, 0.8)",
      lineHeight: 1.6,
      margin: 0,
    },
    loadingState: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 20px",
      gap: "15px",
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
    footerSection: {
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
    // Fetch popular books
    const fetchBooks = async () => {
      try {
        const books = await apiHomePage.getTopBooks();
        console.log("Fetched books:", books);
        setPopularBooks(books);
      } catch (error) {
        console.error("Error fetching top books:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    // Fetch new arrival books
    const fetchNewArrivals = async () => {
      try {
        const books = await apiHomePage.getNewArrivalBooks();
        console.log("Fetched new arrivals:", books);
        setNewArrivalBooks(books);
      } catch (error) {
        console.error("Error fetching new arrivals:", error.message);
      } finally {
        setLoadingNewArrivals(false);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <div style={styles.container}>
      <NavbarAnggota />

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
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>✨ Fresh Collection</span>
          <h2 style={styles.sectionTitle}>New Arrivals</h2>
          <p style={styles.sectionSubtitle}>
            Be the first to explore our latest additions to the library
          </p>
        </div>

        <div style={styles.newArrivalsContent}>
          {loadingNewArrivals ? (
            <div style={styles.loadingState}>
              <div style={styles.loadingSpinner}></div>
              <p>Loading new arrivals...</p>
            </div>
          ) : newArrivalBooks.length > 0 ? (
            <>
              <div style={styles.arrivalsGrid}>
                {newArrivalBooks.slice(0, 4).map((book) => {
                  const isHovered = hoveredBook === `arrival-${book.id_buku}`;
                  return (
                    <Link
                      to={`/BookAnggota/${book.id_buku}`}
                      key={book.id_buku}
                      style={{
                        ...styles.arrivalCard,
                        ...(isHovered ? styles.arrivalCardHovered : {}),
                      }}
                      onMouseEnter={() =>
                        setHoveredBook(`arrival-${book.id_buku}`)
                      }
                      onMouseLeave={() => setHoveredBook(null)}
                    >
                      <div style={styles.arrivalImageWrapper}>
                        <img
                          src={`${baseURL}/storage/${book.book_poster}`}
                          alt={book.judul}
                          style={{
                            ...styles.arrivalImage,
                            ...(isHovered ? styles.arrivalImageHovered : {}),
                          }}
                        />
                      </div>
                      <div style={styles.arrivalInfo}>
                        <h3 style={styles.arrivalTitle}>{book.judul}</h3>
                        <p style={styles.arrivalAuthor}>{book.pengarang}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div style={styles.arrivalsShowMore}>
                <Link to="/CategoryPage" style={styles.showMoreBtn}>
                  <span>🔍</span>
                  Explore All New Books
                  <span>→</span>
                </Link>
              </div>
            </>
          ) : (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>📭</span>
              <p>No new arrivals at the moment</p>
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
                  to={`/BookAnggota/${book.id_buku}`}
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
            <Link to="/CategoryPage" style={styles.browseAllBtn}>
              Browse All Books
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <FooterAnggota />

      {/* CSS for animations */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
