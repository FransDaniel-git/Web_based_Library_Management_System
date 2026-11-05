import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  apiGetBorrowingsByUser,
  apiGetReturnHistoryByUser,
} from "../../api/Admin/apiReturningDetails";
import { apiUpdateStatus } from "../../api/Admin/apiHomeAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)",
  },
  appBar: {
    background: "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    position: "sticky",
    top: "0",
    zIndex: "100",
  },
  appBarLogo: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    textDecoration: "none",
    color: "white",
  },
  appBarLogoImg: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    background: "white",
    padding: "5px",
  },
  appBarLogoH1: {
    fontSize: "22px",
    fontWeight: "700",
    margin: "0",
    color: "white",
  },
  appBarNav: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  appBarLink: {
    color: "rgba(255, 255, 255, 0.8)",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500",
    padding: "8px 16px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
  appBarLinkHover: {
    color: "white",
    background: "rgba(255, 255, 255, 0.15)",
  },
  appBarLinkActive: {
    color: "white",
    background: "linear-gradient(135deg, #ff7043 0%, #ff5722 100%)",
  },
  mainContent: {
    padding: "30px 40px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  headerSection: {
    marginBottom: "30px",
  },
  backButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 24px",
    background: "white",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    color: "#333",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginBottom: "20px",
    textDecoration: "none",
  },
  backButtonHover: {
    borderColor: "#1a237e",
    color: "#1a237e",
    transform: "translateX(-5px)",
  },
  pageHeader: {
    background: "white",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageHeaderH1: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a237e",
    margin: "0 0 8px 0",
  },
  pageHeaderP: {
    color: "#666",
    margin: "0",
    fontSize: "14px",
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "#f8f9fc",
    padding: "12px 20px",
    borderRadius: "12px",
    border: "2px solid #e8ecf1",
    width: "350px",
    transition: "all 0.3s ease",
  },
  searchWrapperFocused: {
    borderColor: "#ff7043",
    background: "white",
    boxShadow: "0 0 0 4px rgba(255, 112, 67, 0.12)",
  },
  searchIcon: {
    color: "#999",
    fontSize: "18px",
  },
  searchInput: {
    flex: "1",
    border: "none",
    background: "transparent",
    fontSize: "14px",
    color: "#333",
    outline: "none",
  },
  tableCard: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    marginTop: "20px",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px",
  },
  tableHeader: {
    background: "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
  },
  th: {
    padding: "20px 15px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "white",
  },
  thCenter: {
    padding: "20px 15px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "white",
  },
  tableBody: {
    background: "white",
  },
  tr: {
    borderBottom: "1px solid #eee",
    transition: "all 0.3s ease",
  },
  trHover: {
    background: "#f8f9fc",
  },
  td: {
    padding: "18px 15px",
    verticalAlign: "middle",
    fontSize: "14px",
    color: "#333",
  },
  tdCenter: {
    padding: "18px 15px",
    verticalAlign: "middle",
    fontSize: "14px",
    color: "#333",
    textAlign: "center",
  },
  bookInfo: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  bookImage: {
    width: "60px",
    height: "80px",
    borderRadius: "8px",
    objectFit: "cover",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  bookTitle: {
    fontWeight: "600",
    color: "#1a237e",
    margin: "0",
    fontSize: "15px",
  },
  dateCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#666",
  },
  badge: {
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-block",
  },
  badgeSuccess: {
    background: "#e8f5e9",
    color: "#2e7d32",
  },
  badgeWarning: {
    background: "#fff3e0",
    color: "#ef6c00",
  },
  badgeDanger: {
    background: "#ffebee",
    color: "#c62828",
  },
  fineAmount: {
    fontWeight: "700",
    color: "#d32f2f",
    fontSize: "15px",
  },
  fineZero: {
    color: "#4caf50",
    fontWeight: "600",
  },
  actionBtns: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  btnConfirm: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 18px",
    background: "linear-gradient(135deg, #4caf50 0%, #43a047 100%)",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  btnConfirmHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(76, 175, 80, 0.4)",
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
  // Modal styles
  modalOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    background: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1000",
    backdropFilter: "blur(4px)",
  },
  modalContent: {
    background: "white",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "450px",
    width: "90%",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    transform: "scale(1)",
    animation: "modalFadeIn 0.3s ease",
  },
  modalIcon: {
    fontSize: "60px",
    marginBottom: "20px",
  },
  modalH3: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a237e",
    marginBottom: "15px",
  },
  modalP: {
    color: "#666",
    fontSize: "15px",
    marginBottom: "30px",
    lineHeight: "1.6",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  btnCancel: {
    padding: "12px 30px",
    background: "#f5f5f5",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
    color: "#666",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  btnCancelHover: {
    background: "#e0e0e0",
    borderColor: "#ccc",
  },
  btnConfirmModal: {
    padding: "12px 30px",
    background: "linear-gradient(135deg, #4caf50 0%, #43a047 100%)",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  btnConfirmModalHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(76, 175, 80, 0.4)",
  },
};

const spinKeyframes = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes modalFadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`;

const ReturningDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [pendingReturns, setPendingReturns] = useState([]);
  const [originalPending, setOriginalPending] = useState([]);
  const [history, setHistory] = useState([]);
  const [originalHistory, setOriginalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [focusedInput, setFocusedInput] = useState(false);
  const [hoveredBackBtn, setHoveredBackBtn] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredConfirmBtn, setHoveredConfirmBtn] = useState(null);
  const [hoveredCancelBtn, setHoveredCancelBtn] = useState(false);
  const [hoveredModalConfirm, setHoveredModalConfirm] = useState(false);

  const baseURL = "http://127.0.0.1:8000";

  const loadData = async () => {
    try {
      setLoading(true);
      const [borrowed, historyData] = await Promise.all([
        apiGetBorrowingsByUser(userId),
        apiGetReturnHistoryByUser(userId),
      ]);

      const normalizedPending = (borrowed || [])
        .filter((item) => item.status === "borrowed")
        .map((item) => ({
          id_pinjam: item.id_pinjam,
          buku: item.buku,
          tgl_pinjam: item.tgl_pinjam,
          tgl_pengembalian: item.tgl_kembali,
          status: item.status,
        }));

      const normalizedHistory = (historyData || []).map((item) => ({
        id_pengembalian: item.id_pengembalian,
        buku: item.peminjaman?.buku || item.buku,
        tgl_pinjam: item.tgl_pinjam || item.peminjaman?.tgl_pinjam,
        tgl_jatuh_tempo: item.peminjaman?.tgl_kembali,
        returned_at: item.created_at,
        denda: item.jml_denda ?? item.calculated_denda ?? 0,
      }));

      setPendingReturns(normalizedPending);
      setOriginalPending(normalizedPending);
      setHistory(normalizedHistory);
      setOriginalHistory(normalizedHistory);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setPendingReturns(originalPending);
      setHistory(originalHistory);
      return;
    }

    const term = searchTerm.toLowerCase();
    setPendingReturns(
      originalPending.filter((item) =>
        (item.buku?.judul || "").toLowerCase().includes(term)
      )
    );
    setHistory(
      originalHistory.filter((item) =>
        (item.buku?.judul || "").toLowerCase().includes(term)
      )
    );
  }, [searchTerm, originalPending, originalHistory]);

  const handleConfirmClick = (returnItem) => {
    setSelectedReturn(returnItem);
    setShowConfirmModal(true);
  };

  const handleConfirmReturn = async () => {
    if (!selectedReturn) return;

    try {
      await apiUpdateStatus(selectedReturn.id_pinjam, "returned");

      toast.success("Return confirmed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setPendingReturns(
        pendingReturns.filter((r) => r.id_pinjam !== selectedReturn.id_pinjam)
      );
      setOriginalPending(
        originalPending.filter((r) => r.id_pinjam !== selectedReturn.id_pinjam)
      );
      // refresh history so the new entry appears
      try {
        const historyData = await apiGetReturnHistoryByUser(userId);
        const normalizedHistory = (historyData || []).map((item) => ({
          id_pengembalian: item.id_pengembalian,
          buku: item.peminjaman?.buku || item.buku,
          tgl_pinjam: item.tgl_pinjam || item.peminjaman?.tgl_pinjam,
          tgl_jatuh_tempo: item.peminjaman?.tgl_kembali,
          returned_at: item.created_at,
          denda: item.jml_denda ?? item.calculated_denda ?? 0,
        }));
        setHistory(normalizedHistory);
        setOriginalHistory(normalizedHistory);
      } catch (historyErr) {
        console.error(historyErr);
      }
      setShowConfirmModal(false);
      setSelectedReturn(null);
    } catch (err) {
      toast.error(err.message || "Failed to confirm return.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const calculateOverdueDays = (returnDate) => {
    if (!returnDate) return 0;
    const today = new Date();
    const dueDate = new Date(returnDate);
    const diffTime = today - dueDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return `${date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })} ${date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const navLinks = [{ to: "/returning", label: "Returns", active: true }];

  return (
    <div style={styles.pageWrapper}>
      <style>{spinKeyframes}</style>
      <ToastContainer />

      {/* App Bar */}
      <header style={styles.appBar}>
        <Link to="/HomeAdmin" style={styles.appBarLogo}>
          <img
            src="/src/assets/images/logo-image.png"
            alt="Logo"
            style={styles.appBarLogoImg}
          />
          <h1 style={styles.appBarLogoH1}>Atma Library</h1>
        </Link>

        <nav style={styles.appBarNav}>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              style={{
                ...styles.appBarLink,
                ...(link.active && styles.appBarLinkActive),
                ...(hoveredNav === index &&
                  !link.active &&
                  styles.appBarLinkHover),
              }}
              onMouseEnter={() => setHoveredNav(index)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* Header Section */}
        <section style={styles.headerSection}>
          <button
            style={{
              ...styles.backButton,
              ...(hoveredBackBtn && styles.backButtonHover),
            }}
            onClick={() => navigate("/Returning")}
            onMouseEnter={() => setHoveredBackBtn(true)}
            onMouseLeave={() => setHoveredBackBtn(false)}
          >
            <span>←</span>
            <span>Back to Members</span>
          </button>

          <div style={styles.pageHeader}>
            <div>
              <h1 style={styles.pageHeaderH1}>📋 Return Details</h1>
              <p style={styles.pageHeaderP}>
                Viewing return history for User ID: #{userId}
              </p>
            </div>
            <div
              style={{
                ...styles.searchWrapper,
                ...(focusedInput && styles.searchWrapperFocused),
              }}
            >
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search by book title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
                onFocus={() => setFocusedInput(true)}
                onBlur={() => setFocusedInput(false)}
              />
            </div>
          </div>
        </section>

        {/* Pending returns table */}
        <div style={styles.tableCard}>
          <div style={{ padding: "20px" }}>
            <h3 style={{ margin: 0, color: "#1a237e" }}>Borrowed Books</h3>
          </div>
          {loading ? (
            <div style={styles.loadingState}>
              <div style={styles.spinner}></div>
              <p style={styles.loadingText}>Loading return data...</p>
            </div>
          ) : error ? (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>⚠️</span>
              <p style={styles.emptyP}>{error}</p>
            </div>
          ) : pendingReturns.length > 0 ? (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th style={styles.thCenter}>#</th>
                    <th style={styles.th}>Book</th>
                    <th style={styles.thCenter}>Borrowed</th>
                    <th style={styles.thCenter}>Due Date</th>
                    <th style={styles.thCenter}>Overdue</th>
                    <th style={styles.thCenter}>Fine</th>
                    <th style={styles.thCenter}>Actions</th>
                  </tr>
                </thead>
                <tbody style={styles.tableBody}>
                  {pendingReturns.map((item, index) => {
                    const overdueDays = calculateOverdueDays(
                      item.tgl_pengembalian
                    );
                    const fine = overdueDays * 50000;

                    return (
                      <tr
                        key={item.id_pinjam}
                        style={{
                          ...styles.tr,
                          ...(hoveredRow === index && styles.trHover),
                        }}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td style={styles.tdCenter}>{index + 1}</td>
                        <td style={styles.td}>
                          <div style={styles.bookInfo}>
                            <img
                              src={`${baseURL}/storage/${item.buku?.book_poster}`}
                              alt={item.buku?.judul}
                              style={styles.bookImage}
                              onError={(e) => {
                                e.target.src =
                                  "/src/assets/images/default-book.png";
                              }}
                            />
                            <span style={styles.bookTitle}>
                              {item.buku?.judul || "Unknown"}
                            </span>
                          </div>
                        </td>
                        <td style={styles.tdCenter}>
                          <div style={styles.dateCell}>
                            <span>📅</span>
                            <span>{formatDate(item.tgl_pinjam)}</span>
                          </div>
                        </td>
                        <td style={styles.tdCenter}>
                          <div style={styles.dateCell}>
                            <span>⏰</span>
                            <span>{formatDate(item.tgl_pengembalian)}</span>
                          </div>
                        </td>
                        <td style={styles.tdCenter}>
                          <span
                            style={{
                              ...styles.badge,
                              ...(overdueDays === 0
                                ? styles.badgeSuccess
                                : overdueDays <= 7
                                  ? styles.badgeWarning
                                  : styles.badgeDanger),
                            }}
                          >
                            {overdueDays === 0
                              ? "On Time"
                              : `${overdueDays} days`}
                          </span>
                        </td>
                        <td style={styles.tdCenter}>
                          <span
                            style={
                              fine > 0 ? styles.fineAmount : styles.fineZero
                            }
                          >
                            {fine > 0 ? formatCurrency(fine) : "No Fine"}
                          </span>
                        </td>
                        <td style={styles.tdCenter}>
                          <div style={styles.actionBtns}>
                            <button
                              style={{
                                ...styles.btnConfirm,
                                ...(hoveredConfirmBtn === index &&
                                  styles.btnConfirmHover),
                              }}
                              onClick={() => handleConfirmClick(item)}
                              onMouseEnter={() => setHoveredConfirmBtn(index)}
                              onMouseLeave={() => setHoveredConfirmBtn(null)}
                            >
                              <span>✓</span>
                              <span>Confirm</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>📚</span>
              <h3 style={styles.emptyH3}>No Pending Returns</h3>
              <p style={styles.emptyP}>
                {searchTerm
                  ? `No pending returns matching "${searchTerm}"`
                  : "This user has no pending returns."}
              </p>
            </div>
          )}
        </div>

        {/* Return history */}
        <div style={{ ...styles.tableCard, marginTop: "30px" }}>
          <div style={{ padding: "20px" }}>
            <h3 style={{ margin: 0, color: "#1a237e" }}>Return History</h3>
          </div>
          {loading ? (
            <div style={styles.loadingState}>
              <div style={styles.spinner}></div>
              <p style={styles.loadingText}>Loading history...</p>
            </div>
          ) : history.length > 0 ? (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th style={styles.thCenter}>#</th>
                    <th style={styles.th}>Book</th>
                    <th style={styles.thCenter}>Borrowed</th>
                    <th style={styles.thCenter}>Due Date</th>
                    <th style={styles.thCenter}>Returned On</th>
                    <th style={styles.thCenter}>Fine</th>
                  </tr>
                </thead>
                <tbody style={styles.tableBody}>
                  {history.map((item, index) => (
                    <tr key={item.id_pengembalian || index} style={styles.tr}>
                      <td style={styles.tdCenter}>{index + 1}</td>
                      <td style={styles.td}>
                        <div style={styles.bookInfo}>
                          <img
                            src={`${baseURL}/storage/${item.buku?.book_poster}`}
                            alt={item.buku?.judul}
                            style={styles.bookImage}
                            onError={(e) => {
                              e.target.src =
                                "/src/assets/images/default-book.png";
                            }}
                          />
                          <span style={styles.bookTitle}>
                            {item.buku?.judul || "Unknown"}
                          </span>
                        </div>
                      </td>
                      <td style={styles.tdCenter}>
                        {formatDate(item.tgl_pinjam)}
                      </td>
                      <td style={styles.tdCenter}>
                        {formatDate(item.tgl_jatuh_tempo)}
                      </td>
                      <td style={styles.tdCenter}>
                        {formatDateTime(item.returned_at)}
                      </td>
                      <td style={styles.tdCenter}>
                        <span
                          style={
                            (item.denda || 0) > 0
                              ? styles.fineAmount
                              : styles.fineZero
                          }
                        >
                          {(item.denda || 0) > 0
                            ? formatCurrency(item.denda)
                            : "No Fine"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>🗂️</span>
              <h3 style={styles.emptyH3}>No Return History</h3>
              <p style={styles.emptyP}>
                {searchTerm
                  ? `No return history matching "${searchTerm}"`
                  : "This user has not returned any books yet."}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowConfirmModal(false)}
        >
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span style={styles.modalIcon}>✅</span>
            <h3 style={styles.modalH3}>Confirm Return</h3>
            <p style={styles.modalP}>
              Are you sure you want to confirm the return of{" "}
              <strong>&quot;{selectedReturn?.buku?.judul}&quot;</strong>?
              {selectedReturn &&
                calculateOverdueDays(selectedReturn.tgl_pengembalian) * 50000 >
                  0 && (
                  <>
                    <br />
                    <br />
                    Fine to be collected:{" "}
                    <strong style={{ color: "#d32f2f" }}>
                      {formatCurrency(
                        calculateOverdueDays(selectedReturn.tgl_pengembalian) *
                          50000
                      )}
                    </strong>
                  </>
                )}
            </p>
            <div style={styles.modalButtons}>
              <button
                style={{
                  ...styles.btnCancel,
                  ...(hoveredCancelBtn && styles.btnCancelHover),
                }}
                onClick={() => setShowConfirmModal(false)}
                onMouseEnter={() => setHoveredCancelBtn(true)}
                onMouseLeave={() => setHoveredCancelBtn(false)}
              >
                Cancel
              </button>
              <button
                style={{
                  ...styles.btnConfirmModal,
                  ...(hoveredModalConfirm && styles.btnConfirmModalHover),
                }}
                onClick={handleConfirmReturn}
                onMouseEnter={() => setHoveredModalConfirm(true)}
                onMouseLeave={() => setHoveredModalConfirm(false)}
              >
                Confirm Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturningDetails;
