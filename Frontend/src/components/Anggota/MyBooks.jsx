import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiMyBooks from "../../api/Anggota/apiMyBooks";
import NavbarAnggota from "./NavbarAnggota";
import FooterAnggota from "./FooterAnggota";

const MyBooks = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("pending");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);

  const styles = {
    container: { minHeight: "100vh", background: "#f5f7fa" },
    hero: {
      background:
        "linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #5c6bc0 100%)",
      padding: "140px 20px 80px",
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
    heroIcon: { fontSize: "4rem", marginBottom: "20px", display: "block" },
    heroTitle: {
      fontSize: "3rem",
      fontWeight: 800,
      color: "white",
      marginBottom: "15px",
      textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
    },
    heroSubtitle: {
      fontSize: "1.2rem",
      color: "rgba(255,255,255,0.9)",
      maxWidth: "500px",
      margin: "0 auto",
      lineHeight: 1.6,
    },
    statsBar: {
      display: "flex",
      justifyContent: "center",
      gap: "40px",
      marginTop: "40px",
      flexWrap: "wrap",
    },
    statItem: {
      textAlign: "center",
      padding: "15px 25px",
      background: "rgba(255,255,255,0.1)",
      borderRadius: "16px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.2)",
      minWidth: "120px",
      transition: "all 0.3s ease",
    },
    statItemHover: {
      transform: "translateY(-5px)",
      background: "rgba(255,255,255,0.15)",
    },
    statNumber: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#ff7043",
      display: "block",
    },
    statLabel: {
      fontSize: "0.9rem",
      color: "rgba(255,255,255,0.8)",
      marginTop: "5px",
    },
    filterSection: {
      background: "white",
      padding: "20px 0",
      position: "sticky",
      top: "80px",
      zIndex: 100,
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    },
    filterContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      flexWrap: "wrap",
    },
    filterBtn: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 24px",
      border: "2px solid #e0e0e0",
      background: "white",
      borderRadius: "50px",
      fontSize: "0.95rem",
      fontWeight: 600,
      color: "#555",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    filterBtnActive: {
      background: "linear-gradient(135deg, #ff7043, #ff5722)",
      borderColor: "#ff7043",
      color: "white",
      boxShadow: "0 4px 15px rgba(255,112,67,0.3)",
    },
    filterIcon: { fontSize: "1.1rem" },
    filterCount: {
      background: "rgba(0,0,0,0.1)",
      padding: "2px 8px",
      borderRadius: "20px",
      fontSize: "0.8rem",
    },
    filterCountActive: { background: "rgba(255,255,255,0.3)" },
    booksSection: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "40px 20px 60px",
    },
    booksGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "30px",
    },
    bookCard: {
      background: "white",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      position: "relative",
    },
    bookCardHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    },
    statusBadge: {
      position: "absolute",
      top: "15px",
      right: "15px",
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "0.75rem",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      zIndex: 10,
    },
    statusActive: {
      background: "linear-gradient(135deg, #4caf50, #66bb6a)",
      color: "white",
      boxShadow: "0 3px 10px rgba(76,175,80,0.3)",
    },
    statusReturned: {
      background: "linear-gradient(135deg, #2196f3, #42a5f5)",
      color: "white",
      boxShadow: "0 3px 10px rgba(33,150,243,0.3)",
    },
    statusOverdue: {
      background: "linear-gradient(135deg, #f44336, #ef5350)",
      color: "white",
      boxShadow: "0 3px 10px rgba(244,67,54,0.3)",
    },
    statusPending: {
      background: "linear-gradient(135deg, #ff9800, #ffb74d)",
      color: "white",
      boxShadow: "0 3px 10px rgba(255,152,0,0.3)",
    },
    bookImageWrapper: {
      position: "relative",
      height: "280px",
      background: "linear-gradient(145deg, #f8f9fa, #e9ecef)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      overflow: "hidden",
    },
    bookPoster: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
      borderRadius: "8px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
      transition: "all 0.4s ease",
    },
    bookPosterHover: { transform: "scale(1.05)" },
    bookLink: { textDecoration: "none", display: "block" },
    bookDetails: { padding: "20px", background: "white" },
    bookTitle: {
      fontSize: "1.1rem",
      fontWeight: 700,
      color: "#1a237e",
      marginBottom: "8px",
      lineHeight: 1.4,
      transition: "color 0.3s ease",
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
    },
    bookTitleHover: { color: "#ff7043" },
    bookAuthor: {
      fontSize: "0.9rem",
      color: "#666",
      marginBottom: "15px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    bookDates: {
      background: "#f8f9fa",
      borderRadius: "12px",
      padding: "15px",
      marginTop: "10px",
    },
    dateItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
    },
    dateItemFirst: {
      borderBottom: "1px dashed #e0e0e0",
      paddingBottom: "10px",
      marginBottom: "5px",
    },
    dateLabel: {
      fontSize: "0.85rem",
      color: "#888",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    dateValue: { fontSize: "0.9rem", fontWeight: 600, color: "#333" },
    daysRemaining: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      marginTop: "15px",
      padding: "10px",
      background:
        "linear-gradient(135deg, rgba(255,112,67,0.1), rgba(255,87,34,0.05))",
      borderRadius: "10px",
      border: "1px solid rgba(255,112,67,0.2)",
    },
    daysWarning: {
      background:
        "linear-gradient(135deg, rgba(255,193,7,0.1), rgba(255,152,0,0.05))",
      borderColor: "rgba(255,193,7,0.3)",
    },
    daysDanger: {
      background:
        "linear-gradient(135deg, rgba(244,67,54,0.1), rgba(229,57,53,0.05))",
      borderColor: "rgba(244,67,54,0.3)",
    },
    daysIcon: { fontSize: "1.2rem" },
    daysText: { fontSize: "0.85rem", fontWeight: 600, color: "#555" },
    emptyState: {
      textAlign: "center",
      padding: "80px 20px",
      background: "white",
      borderRadius: "24px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
      maxWidth: "500px",
      margin: "0 auto",
    },
    emptyIcon: { fontSize: "5rem", marginBottom: "20px", display: "block" },
    emptyTitle: {
      fontSize: "1.8rem",
      fontWeight: 700,
      color: "#1a237e",
      marginBottom: "15px",
    },
    emptyText: {
      fontSize: "1.1rem",
      color: "#666",
      marginBottom: "30px",
      lineHeight: 1.6,
    },
    browseBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      padding: "15px 35px",
      background: "linear-gradient(135deg, #ff7043, #ff5722)",
      color: "white",
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: 600,
      fontSize: "1rem",
      transition: "all 0.3s ease",
      boxShadow: "0 5px 20px rgba(255,112,67,0.3)",
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "400px",
      gap: "20px",
    },
    loadingSpinner: {
      width: "60px",
      height: "60px",
      border: "4px solid #f0f0f0",
      borderTopColor: "#ff7043",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    loadingText: { fontSize: "1.1rem", color: "#666", fontWeight: 500 },
    footer: {
      background: "#1a237e",
      color: "white",
      position: "relative",
      marginTop: "60px",
    },
    footerWave: {
      position: "absolute",
      top: "-119px",
      left: 0,
      right: 0,
      height: "120px",
      overflow: "hidden",
    },
    footerMain: { padding: "80px 0 40px" },
    footerContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
      gap: "40px",
    },
    footerBrand: { maxWidth: "300px" },
    footerLogo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "15px",
    },
    footerLogoImage: { height: "50px", width: "auto" },
    footerLogoText: {
      fontSize: "1.5rem",
      fontWeight: 700,
      color: "white",
      margin: 0,
    },
    footerTagline: {
      color: "rgba(255,255,255,0.7)",
      fontSize: "0.95rem",
      lineHeight: 1.6,
      marginBottom: "20px",
    },
    footerSocial: { display: "flex", gap: "12px" },
    socialIcon: {
      width: "40px",
      height: "40px",
      background: "rgba(255,255,255,0.1)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      transition: "all 0.3s ease",
      textDecoration: "none",
    },
    footerLinksTitle: {
      fontSize: "1.1rem",
      fontWeight: 600,
      marginBottom: "20px",
      color: "white",
    },
    footerLinksList: { listStyle: "none", padding: 0, margin: 0 },
    footerLinksItem: { marginBottom: "12px" },
    footerLinksLink: {
      color: "rgba(255,255,255,0.7)",
      textDecoration: "none",
      transition: "all 0.3s ease",
      fontSize: "0.95rem",
    },
    contactItem: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "12px",
      color: "rgba(255,255,255,0.7)",
      fontSize: "0.95rem",
    },
    contactIcon: { fontSize: "1.1rem" },
    addressContent: { display: "flex", gap: "10px" },
    addressIcon: { fontSize: "1.2rem", flexShrink: 0 },
    addressText: {
      color: "rgba(255,255,255,0.7)",
      fontSize: "0.95rem",
      lineHeight: 1.6,
      margin: 0,
    },
    footerBottom: {
      textAlign: "center",
      padding: "20px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
    },
    footerBottomText: {
      margin: 0,
      color: "rgba(255,255,255,0.6)",
      fontSize: "0.9rem",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await apiMyBooks.getPeminjamanByUserId();
      console.log("Fetched data:", result);

      if (result) {
        setMyBooks(result);
        setFilteredBooks(result);
      } else {
        console.error("Failed to fetch data");
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Filter books based on status
  useEffect(() => {
    if (activeFilter === "pending") {
      setFilteredBooks(myBooks.filter((book) => book.status === "pending"));
    } else if (activeFilter === "active") {
      setFilteredBooks(
        myBooks.filter(
          (book) => book.status === "borrowed" && !book.status_pengembalian
        )
      );
    } else if (activeFilter === "returned") {
      setFilteredBooks(myBooks.filter((book) => book.status_pengembalian));
    }
  }, [activeFilter, myBooks]);

  // Calculate days remaining
  const getDaysRemaining = (returnDate) => {
    const today = new Date();
    const due = new Date(returnDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get stats
  const getStats = () => {
    const pending = myBooks.filter((book) => book.status === "pending").length;
    const active = myBooks.filter(
      (book) => book.status === "borrowed" && !book.status_pengembalian
    ).length;
    const returned = myBooks.filter((book) => book.status_pengembalian).length;
    return { pending, active, returned };
  };

  const stats = getStats();

  return (
    <div style={styles.container}>
      <NavbarAnggota />

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroPattern}></div>
        <div style={styles.heroContent}>
          <span style={styles.heroIcon}>📖</span>
          <h1 style={styles.heroTitle}>My Borrowed Books</h1>
          <p style={styles.heroSubtitle}>
            Track your reading journey and manage your borrowed books
          </p>

          {/* Stats Bar */}
          <div style={styles.statsBar}>
            {[
              {
                key: "pending",
                number: stats.pending,
                label: "Pending Approval",
              },
              {
                key: "active",
                number: stats.active,
                label: "Currently Borrowed",
              },
              { key: "returned", number: stats.returned, label: "Returned" },
            ].map((stat) => (
              <div
                key={stat.key}
                style={{
                  ...styles.statItem,
                  ...(hoveredStat === stat.key ? styles.statItemHover : {}),
                }}
                onMouseEnter={() => setHoveredStat(stat.key)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <span style={styles.statNumber}>{stat.number}</span>
                <span style={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section style={styles.filterSection}>
        <div style={styles.filterContainer}>
          {[
            {
              key: "pending",
              icon: "⏳",
              label: "Pending Approval",
              count: stats.pending,
            },
            {
              key: "active",
              icon: "📖",
              label: "Currently Borrowed",
              count: stats.active,
            },
            {
              key: "returned",
              icon: "✅",
              label: "Returned",
              count: stats.returned,
            },
          ].map((filter) => (
            <button
              key={filter.key}
              style={{
                ...styles.filterBtn,
                ...(activeFilter === filter.key ? styles.filterBtnActive : {}),
              }}
              onClick={() => setActiveFilter(filter.key)}
            >
              <span style={styles.filterIcon}>{filter.icon}</span>
              {filter.label}
              <span
                style={{
                  ...styles.filterCount,
                  ...(activeFilter === filter.key
                    ? styles.filterCountActive
                    : {}),
                }}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Books Section */}
      <section style={styles.booksSection}>
        {isLoading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>Loading your books...</p>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div style={styles.booksGrid}>
            {filteredBooks.map((pinjam) => {
              const daysRemaining = getDaysRemaining(pinjam.tgl_kembali);
              const isOverdue =
                daysRemaining < 0 && !pinjam.status_pengembalian;
              const isWarning =
                daysRemaining <= 3 &&
                daysRemaining >= 0 &&
                !pinjam.status_pengembalian;
              const isHovered = hoveredCard === pinjam.id_pinjam;

              return (
                <div
                  key={pinjam.id_pinjam}
                  style={{
                    ...styles.bookCard,
                    ...(isHovered ? styles.bookCardHover : {}),
                  }}
                  onMouseEnter={() => setHoveredCard(pinjam.id_pinjam)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Status Badge */}
                  <span
                    style={{
                      ...styles.statusBadge,
                      ...(pinjam.status === "pending"
                        ? styles.statusPending
                        : pinjam.status_pengembalian
                          ? styles.statusReturned
                          : isOverdue
                            ? styles.statusOverdue
                            : styles.statusActive),
                    }}
                  >
                    {pinjam.status === "pending"
                      ? "Pending"
                      : pinjam.status_pengembalian
                        ? "Returned"
                        : isOverdue
                          ? "Overdue"
                          : "Active"}
                  </span>

                  <Link
                    to={`/BookAnggota/${pinjam.buku.id_buku}`}
                    style={styles.bookLink}
                  >
                    <div style={styles.bookImageWrapper}>
                      <img
                        src={`http://127.0.0.1:8000/storage/${pinjam.buku.book_poster}`}
                        alt={pinjam.buku.judul}
                        style={{
                          ...styles.bookPoster,
                          ...(isHovered ? styles.bookPosterHover : {}),
                        }}
                      />
                    </div>
                  </Link>

                  <div style={styles.bookDetails}>
                    <h3
                      style={{
                        ...styles.bookTitle,
                        ...(isHovered ? styles.bookTitleHover : {}),
                      }}
                    >
                      {pinjam.buku.judul}
                    </h3>
                    <p style={styles.bookAuthor}>✍️ {pinjam.buku.pengarang}</p>

                    {pinjam.status === "pending" ? (
                      <div style={styles.bookDates}>
                        <div
                          style={{
                            ...styles.dateItem,
                            ...styles.dateItemFirst,
                          }}
                        >
                          <span style={styles.dateLabel}>📅 Requested</span>
                          <span style={styles.dateValue}>
                            {pinjam.tgl_pinjam}
                          </span>
                        </div>
                        <div style={styles.dateItem}>
                          <span style={styles.dateLabel}>⏳ Status</span>
                          <span
                            style={{ ...styles.dateValue, color: "#ff9800" }}
                          >
                            Waiting for approval
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div style={styles.bookDates}>
                        <div
                          style={{
                            ...styles.dateItem,
                            ...styles.dateItemFirst,
                          }}
                        >
                          <span style={styles.dateLabel}>📅 Borrowed</span>
                          <span style={styles.dateValue}>
                            {pinjam.tgl_pinjam}
                          </span>
                        </div>
                        <div style={styles.dateItem}>
                          <span style={styles.dateLabel}>⏰ Return By</span>
                          <span style={styles.dateValue}>
                            {pinjam.tgl_kembali}
                          </span>
                        </div>
                      </div>
                    )}

                    {!pinjam.status_pengembalian &&
                      pinjam.status !== "pending" && (
                        <div
                          style={{
                            ...styles.daysRemaining,
                            ...(isWarning ? styles.daysWarning : {}),
                            ...(isOverdue ? styles.daysDanger : {}),
                          }}
                        >
                          <span style={styles.daysIcon}>
                            {isOverdue ? "⚠️" : isWarning ? "⏰" : "📆"}
                          </span>
                          <span style={styles.daysText}>
                            {isOverdue ? (
                              <>
                                <strong style={{ color: "#f44336" }}>
                                  {Math.abs(daysRemaining)}
                                </strong>{" "}
                                days overdue
                              </>
                            ) : (
                              <>
                                <strong style={{ color: "#ff7043" }}>
                                  {daysRemaining}
                                </strong>{" "}
                                days remaining
                              </>
                            )}
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <span style={styles.emptyIcon}>📚</span>
            <h2 style={styles.emptyTitle}>No Books Found</h2>
            <p style={styles.emptyText}>
              {activeFilter === "pending"
                ? "You don't have any pending book requests."
                : activeFilter === "active"
                  ? "You don't have any active borrowed books."
                  : "You haven't returned any books yet."}
            </p>
            <Link to="/CategoryPage" style={styles.browseBtn}>
              Browse Books →
            </Link>
          </div>
        )}
      </section>

      {/* Footer Section */}
      <FooterAnggota />

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MyBooks;
