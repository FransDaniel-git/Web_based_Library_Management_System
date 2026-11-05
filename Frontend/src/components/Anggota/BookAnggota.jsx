import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetBookById } from "../../api/Admin/apiEditBookAdmin";
import {
  CreatePeminjaman,
  CheckUserBook,
} from "../../api/Anggota/apiBookAnggota";
import NavbarAnggota from "./NavbarAnggota";

const styles = {
  container: {
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    minHeight: "100vh",
    paddingBottom: "80px",
  },
  bookDetailsSection: {
    paddingTop: "120px",
    paddingBottom: "60px",
  },
  bookDetailCard: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 112, 67, 0.15)",
  },
  bookPosterWrapper: {
    padding: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(145deg, #f1f5f9, #e2e8f0)",
    borderRadius: "16px",
    margin: "24px",
    minHeight: "580px",
    boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.05)",
  },
  bookPosterImg: {
    maxWidth: "420px",
    width: "100%",
    height: "auto",
    maxHeight: "540px",
    objectFit: "contain",
    borderRadius: "12px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
    transition: "all 0.6s ease",
  },
  bookInfoSection: {
    padding: "36px 44px",
  },
  bookTitleHeader: {
    marginBottom: "24px",
    paddingBottom: "14px",
    borderBottom: "2px solid #f1f5f9",
  },
  bookMainTitle: {
    fontSize: "2.1rem",
    fontWeight: 800,
    color: "#1e293b",
    lineHeight: 1.2,
    margin: 0,
  },
  bookCategoryBadge: {
    display: "inline-block",
    background: "linear-gradient(135deg, #ff7043, #ff5722)",
    color: "white",
    padding: "7px 16px",
    borderRadius: "24px",
    fontSize: "0.85rem",
    fontWeight: 700,
    marginTop: "10px",
    boxShadow: "0 4px 15px rgba(255, 112, 67, 0.3)",
  },
  bookDetailsGrid: {
    display: "grid",
    gap: "14px",
    marginBottom: "28px",
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    padding: "14px 18px",
    background: "#f8fafc",
    borderRadius: "14px",
    borderLeft: "4px solid #ff7043",
    transition: "all 0.3s ease",
    cursor: "default",
  },
  detailIcon: {
    width: "46px",
    height: "46px",
    background: "linear-gradient(135deg, #ff7043, #ff5722)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.25rem",
    marginRight: "16px",
    flexShrink: 0,
  },
  detailLabel: {
    fontSize: "0.8rem",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.7px",
    fontWeight: 600,
    marginBottom: "3px",
  },
  detailValue: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#1e293b",
    margin: 0,
  },
  stockStatus: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    padding: "20px 26px",
    background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
    borderRadius: "16px",
    marginBottom: "28px",
    border: "1px solid #a7f3d0",
  },
  stockStatusUnavailable: {
    background: "linear-gradient(135deg, #fef2f2, #fee2e2)",
    borderColor: "#fca5a5",
  },
  stockNumber: {
    fontSize: "3.2rem",
    fontWeight: 900,
    color: "#10b981",
    lineHeight: 1,
  },
  stockNumberUnavailable: {
    color: "#ef4444",
  },
  stockInfoTitle: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#1e293b",
    margin: "0 0 4px 0",
  },
  stockInfoText: {
    fontSize: "0.95rem",
    color: "#475569",
    margin: 0,
  },
  borrowBtnBase: {
    width: "100%",
    padding: "14px 28px",
    fontSize: "1.1rem",
    fontWeight: 700,
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    transition: "all 0.4s ease",
    letterSpacing: "0.5px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  },
  borrowBtnAvailable: {
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "white",
  },
  borrowBtnPending: {
    background: "linear-gradient(135deg, #f59e0b, #d97706)",
    color: "white",
    cursor: "not-allowed",
    opacity: 0.85,
  },
  borrowBtnBorrowed: {
    background: "#4b5563",
    color: "#9ca3af",
    cursor: "not-allowed",
    opacity: 0.8,
    boxShadow: "none",
  },
  borrowBtnUnavailable: {
    background: "#94a3b8",
    color: "white",
    cursor: "not-allowed",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: "20px",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
  },
  loadingSpinner: {
    width: "60px",
    height: "60px",
    border: "4px solid #f0f0f0",
    borderTopColor: "#ff7043",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  errorAlert: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontSize: "1.2rem",
    color: "#ef4444",
  },
};

const BookAnggota = () => {
  const { id: bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [borrowStatus, setBorrowStatus] = useState(null);
  const [hoveredDetail, setHoveredDetail] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!user || !user.id_user) {
          setError("User not logged in. Redirecting...");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        const data = await GetBookById(bookId);
        setBookData(data);

        const { borrowed, status } = await CheckUserBook(user.id_user, bookId);
        if (borrowed) setBorrowStatus(status);
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
        setError("Error fetching book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId, navigate]);

  const handleBorrowRequest = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user || !user.id_user) {
        toast.error("Silakan login terlebih dahulu");
        navigate("/login");
        return;
      }

      const tglPinjam = new Date();
      const tglKembali = new Date();
      tglKembali.setDate(tglPinjam.getDate() + 7);

      await CreatePeminjaman(
        user.id_user,
        bookData.id_buku,
        tglPinjam.toISOString().split("T")[0],
        tglKembali.toISOString().split("T")[0],
        "pending"
      );

      setBorrowStatus("pending");
      toast.success("Permintaan peminjaman berhasil dikirim!");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error("Gagal mengirim permintaan. Coba lagi.");
    }
  };

  const renderBorrowButton = () => {
    if (borrowStatus === "borrowed") {
      return (
        <button
          style={{ ...styles.borrowBtnBase, ...styles.borrowBtnBorrowed }}
          disabled
        >
          📚 Sedang Dipinjam
        </button>
      );
    }
    if (borrowStatus === "pending") {
      return (
        <button
          style={{ ...styles.borrowBtnBase, ...styles.borrowBtnPending }}
          disabled
        >
          ⏳ Menunggu Persetujuan
        </button>
      );
    }
    if (bookData.stok > 0) {
      return (
        <button
          style={{
            ...styles.borrowBtnBase,
            ...styles.borrowBtnAvailable,
            ...(isButtonHovered && {
              transform: "translateY(-4px)",
              boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)",
            }),
          }}
          onClick={handleBorrowRequest}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          📖 Pinjam Buku Ini
        </button>
      );
    }
    return (
      <button
        style={{ ...styles.borrowBtnBase, ...styles.borrowBtnUnavailable }}
        disabled
      >
        ❌ Stok Habis
      </button>
    );
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p>Loading detail buku...</p>
      </div>
    );
  }

  if (error) {
    return <div style={styles.errorAlert}>{error}</div>;
  }

  const detailItems = [
    { icon: "✍️", label: "Pengarang", value: bookData.pengarang },
    {
      icon: "📅",
      label: "Tahun Terbit",
      value: bookData.thn_terbit.substring(0, 4),
    },
    { icon: "🔢", label: "ISBN", value: bookData.isbn },
    {
      icon: "📊",
      label: "Total Dipinjam",
      value: `${bookData.jml_pinjam} kali`,
    },
  ];

  return (
    <div style={styles.container}>
      <NavbarAnggota />

      {/* Book Details */}
      <section style={styles.bookDetailsSection}>
        <Container>
          <div style={styles.bookDetailCard}>
            <Row className="g-0">
              {/* Poster */}
              <Col
                lg={5}
                className="d-flex align-items-center justify-content-center"
              >
                <div style={styles.bookPosterWrapper}>
                  <img
                    src={`http://127.0.0.1:8000/storage/${bookData.book_poster}`}
                    alt={bookData.judul}
                    style={styles.bookPosterImg}
                  />
                </div>
              </Col>

              {/* Info */}
              <Col lg={7}>
                <div style={styles.bookInfoSection}>
                  <div style={styles.bookTitleHeader}>
                    <h1 style={styles.bookMainTitle}>{bookData.judul}</h1>
                    <span style={styles.bookCategoryBadge}>
                      {bookData.kategori}
                    </span>
                  </div>

                  <div style={styles.bookDetailsGrid}>
                    {detailItems.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          ...styles.detailItem,
                          ...(hoveredDetail === index && {
                            transform: "translateX(6px)",
                            background: "white",
                            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                          }),
                        }}
                        onMouseEnter={() => setHoveredDetail(index)}
                        onMouseLeave={() => setHoveredDetail(null)}
                      >
                        <div style={styles.detailIcon}>{item.icon}</div>
                        <div>
                          <p style={styles.detailLabel}>{item.label}</p>
                          <p style={styles.detailValue}>{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      ...styles.stockStatus,
                      ...(bookData.stok === 0 && styles.stockStatusUnavailable),
                    }}
                  >
                    <div
                      style={{
                        ...styles.stockNumber,
                        ...(bookData.stok === 0 &&
                          styles.stockNumberUnavailable),
                      }}
                    >
                      {bookData.stok}
                    </div>
                    <div>
                      <h4 style={styles.stockInfoTitle}>
                        {bookData.stok > 0 ? "Tersedia" : "Habis"}
                      </h4>
                      <p style={styles.stockInfoText}>
                        {bookData.stok > 0
                          ? "Siap dipinjam"
                          : "Sedang tidak tersedia"}
                      </p>
                    </div>
                  </div>

                  <div style={{ marginTop: "18px" }}>
                    {renderBorrowButton()}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <ToastContainer position="top-right" autoClose={4000} theme="light" />
    </div>
  );
};

export default BookAnggota;
