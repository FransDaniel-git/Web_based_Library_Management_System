import { useState, useEffect } from "react";
import SidebarAdmin from "./SidebarAdmin";
import {
  apiHomeAdmin,
  apiUpdateStatus,
  apiDeletePeminjaman,
} from "../../api/Admin/apiHomeAdmin";

const styles = {
  dashboard: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)",
  },
  sidebar: {
    width: "280px",
    background: "linear-gradient(180deg, #1a237e 0%, #0d1442 100%)",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    height: "100vh",
    left: "0",
    top: "0",
    zIndex: "100",
    boxShadow: "4px 0 20px rgba(0, 0, 0, 0.15)",
  },
  sidebarHeader: {
    padding: "25px 20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  sidebarLogo: {
    width: "55px",
    height: "55px",
    background: "linear-gradient(135deg, #ff7043 0%, #ff5722 100%)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },
  sidebarTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "white",
    margin: "0",
    letterSpacing: "0.5px",
  },
  sidebarSubtitle: {
    fontSize: "11px",
    color: "rgba(255, 255, 255, 0.6)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginTop: "3px",
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
    gap: "14px",
    padding: "14px 18px",
    borderRadius: "12px",
    color: "rgba(255, 255, 255, 0.7)",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
  },
  sidebarLinkActive: {
    background: "linear-gradient(135deg, #ff7043 0%, #ff5722 100%)",
    color: "white",
    boxShadow: "0 4px 15px rgba(255, 112, 67, 0.4)",
  },
  sidebarLinkHover: {
    background: "rgba(255, 255, 255, 0.1)",
    color: "white",
  },
  sidebarIcon: {
    fontSize: "20px",
    width: "24px",
    textAlign: "center",
  },
  sidebarFooter: {
    padding: "20px 15px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  logoutBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "14px",
    background: "rgba(255, 255, 255, 0.1)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  logoutBtnHover: {
    background: "#ef5350",
    boxShadow: "0 4px 15px rgba(239, 83, 80, 0.4)",
  },
  main: {
    flex: "1",
    marginLeft: "280px",
    padding: "30px",
  },
  header: {
    background: "white",
    borderRadius: "20px",
    padding: "25px 30px",
    marginBottom: "30px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerH1: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1a237e",
    marginBottom: "5px",
    margin: 0,
  },
  headerP: {
    color: "#666",
    margin: "0",
    fontSize: "14px",
  },
  headerDateBadge: {
    background: "linear-gradient(135deg, #e8eaf6, #c5cae9)",
    padding: "12px 20px",
    borderRadius: "12px",
    color: "#1a237e",
    fontWeight: "600",
    fontSize: "14px",
  },
  statsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    background: "white",
    borderRadius: "20px",
    padding: "25px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    display: "flex",
    gap: "20px",
    alignItems: "center",
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
  },
  statIconTotal: {
    background: "linear-gradient(135deg, #e8eaf6, #c5cae9)",
  },
  statIconPending: {
    background: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
  },
  statIconBorrowed: {
    background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
  },
  statIconReturned: {
    background: "linear-gradient(135deg, #e0f7fa, #b2ebf2)",
  },
  statInfoH3: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1a237e",
    marginBottom: "5px",
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
  },
  statTrendUp: {
    background: "#e3f2fd",
    color: "#1565c0",
  },
  statTrendWarning: {
    background: "#fff3e0",
    color: "#e65100",
  },
  statTrendSuccess: {
    background: "#e8f5e9",
    color: "#2e7d32",
  },
  statTrendInfo: {
    background: "#e0f7fa",
    color: "#00838f",
  },
  searchSection: {
    marginBottom: "30px",
  },
  searchCard: {
    background: "white",
    borderRadius: "20px",
    padding: "25px 30px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    display: "flex",
    alignItems: "center",
    gap: "40px",
  },
  searchHeader: {
    flexShrink: "0",
    minWidth: "200px",
  },
  searchHeaderH2: {
    fontSize: "18px",
    color: "#1a237e",
    margin: "0 0 5px 0",
    fontWeight: "700",
  },
  searchHeaderP: {
    color: "#888",
    fontSize: "13px",
    margin: "0",
  },
  searchInputs: {
    flex: "1",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  searchGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  searchGroupLabel: {
    fontWeight: "600",
    color: "#333",
    fontSize: "13px",
    margin: "0",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "15px",
    fontSize: "16px",
    zIndex: "1",
    color: "#666",
  },
  searchInput: {
    width: "100%",
    height: "48px",
    padding: "12px 15px 12px 45px",
    border: "2px solid #e8ecf1",
    borderRadius: "12px",
    fontSize: "14px",
    color: "#333",
    background: "#f8f9fc",
    transition: "all 0.3s ease",
    outline: "none",
  },
  searchInputFocus: {
    borderColor: "#ff7043",
    background: "white",
    boxShadow: "0 0 0 4px rgba(255, 112, 67, 0.1)",
  },
  tableSection: {
    marginBottom: "30px",
  },
  tableCard: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  tableHeader: {
    padding: "25px 30px",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tableTitleH2: {
    fontSize: "20px",
    color: "#1a237e",
    marginBottom: "5px",
    margin: "0",
  },
  tableCount: {
    background: "#e8eaf6",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    color: "#3f51b5",
    fontWeight: "600",
    marginLeft: "10px",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    background: "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
    color: "white",
    padding: "18px 15px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  td: {
    padding: "18px 15px",
    borderBottom: "1px solid #f0f0f0",
    fontSize: "14px",
    color: "#333",
  },
  tr: {
    transition: "all 0.3s ease",
  },
  trHover: {
    background: "#f8f9fa",
  },
  tdNumber: {
    fontWeight: "700",
    color: "#1a237e",
  },
  userBadge: {
    background: "linear-gradient(135deg, #e8eaf6, #c5cae9)",
    padding: "6px 12px",
    borderRadius: "8px",
    fontWeight: "600",
    color: "#1a237e",
    fontSize: "13px",
  },
  tdBook: {
    maxWidth: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: "500",
  },
  tdDate: {
    color: "#666",
    fontSize: "13px",
  },
  statusBadge: {
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  statusPending: {
    background: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
    color: "#e65100",
  },
  statusBorrowed: {
    background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
    color: "#2e7d32",
  },
  statusReturned: {
    background: "linear-gradient(135deg, #e0f7fa, #b2ebf2)",
    color: "#00838f",
  },
  actionButtons: {
    display: "flex",
    gap: "10px",
  },
  btnAccept: {
    padding: "8px 16px",
    background: "linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  btnAcceptHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(76, 175, 80, 0.4)",
  },
  btnDecline: {
    padding: "8px 16px",
    background: "linear-gradient(135deg, #ef5350 0%, #c62828 100%)",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  btnDeclineHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(239, 83, 80, 0.4)",
  },
  actionDone: {
    color: "#4caf50",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  loadingState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
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
    padding: "60px 20px",
    textAlign: "center",
  },
  emptyIcon: {
    fontSize: "60px",
    marginBottom: "20px",
  },
  emptyH3: {
    color: "#333",
    marginBottom: "10px",
  },
  emptyP: {
    color: "#666",
    fontSize: "14px",
  },
};

const spinKeyframes = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const HomeAdmin = () => {
  const [peminjamanData, setPeminjamanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userNameSearch, setUserNameSearch] = useState("");
  const [bookSearch, setBookSearch] = useState("");
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredAccept, setHoveredAccept] = useState(null);
  const [hoveredDecline, setHoveredDecline] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    fetchPeminjaman();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNameSearch, bookSearch]);

  const fetchPeminjaman = async () => {
    setLoading(true);
    try {
      const data = await apiHomeAdmin();
      // Filter on frontend
      let filteredData = data;
      if (userNameSearch) {
        filteredData = filteredData.filter((item) =>
          item.user?.name?.toLowerCase().includes(userNameSearch.toLowerCase())
        );
      }
      if (bookSearch) {
        filteredData = filteredData.filter((item) =>
          item.buku?.judul?.toLowerCase().includes(bookSearch.toLowerCase())
        );
      }
      setPeminjamanData(filteredData);
    } catch (err) {
      console.error("Failed to load data:", err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id, userId, bookId) => {
    try {
      await apiUpdateStatus(id, "borrowed", userId, bookId);
      fetchPeminjaman();
    } catch (error) {
      console.error("Failed to accept request:", error);
      setError("Failed to accept request");
    }
  };

  const handleDecline = async (id) => {
    try {
      await apiDeletePeminjaman(id);
      fetchPeminjaman();
    } catch (error) {
      console.error("Failed to decline request:", error);
      setError("Failed to decline request");
    }
  };

  const totalRequests = peminjamanData.length;
  const pendingRequests = peminjamanData.filter(
    (item) => item.status === "pending"
  ).length;
  const borrowedBooks = peminjamanData.filter(
    (item) => item.status === "borrowed"
  ).length;

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return styles.statusPending;
      case "borrowed":
        return styles.statusBorrowed;
      case "returned":
        return styles.statusReturned;
      default:
        return {};
    }
  };

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
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#1a237e",
                marginBottom: "5px",
                margin: 0,
              }}
            >
              Welcome Back, Admin! 👋
            </h1>
            <p style={styles.headerP}>
              Here&apos;s what&apos;s happening with your library today.
            </p>
          </div>
          {/* Tanggal hari ini dihapus */}
        </header>

        {/* Stats Section */}
        <section style={styles.statsSection}>
          <div
            style={{
              ...styles.statCard,
              ...(hoveredStat === 0 && styles.statCardHover),
            }}
            onMouseEnter={() => setHoveredStat(0)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div style={{ ...styles.statIcon, ...styles.statIconTotal }}>
              📊
            </div>
            <div>
              <h3 style={styles.statInfoH3}>{totalRequests}</h3>
              <p style={styles.statInfoP}>Total Requests</p>
            </div>
            <div style={{ ...styles.statTrend, ...styles.statTrendUp }}>
              <span>All Time</span>
            </div>
          </div>

          <div
            style={{
              ...styles.statCard,
              ...(hoveredStat === 1 && styles.statCardHover),
            }}
            onMouseEnter={() => setHoveredStat(1)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div style={{ ...styles.statIcon, ...styles.statIconPending }}>
              ⏳
            </div>
            <div>
              <h3 style={styles.statInfoH3}>{pendingRequests}</h3>
              <p style={styles.statInfoP}>Pending Approval</p>
            </div>
            <div style={{ ...styles.statTrend, ...styles.statTrendWarning }}>
              <span>Waiting</span>
            </div>
          </div>

          <div
            style={{
              ...styles.statCard,
              ...(hoveredStat === 2 && styles.statCardHover),
            }}
            onMouseEnter={() => setHoveredStat(2)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div style={{ ...styles.statIcon, ...styles.statIconBorrowed }}>
              📖
            </div>
            <div>
              <h3 style={styles.statInfoH3}>{borrowedBooks}</h3>
              <p style={styles.statInfoP}>Books Borrowed</p>
            </div>
            <div style={{ ...styles.statTrend, ...styles.statTrendSuccess }}>
              <span>Active</span>
            </div>
          </div>

          <div
            style={{
              ...styles.statCard,
              ...(hoveredStat === 3 && styles.statCardHover),
            }}
            onMouseEnter={() => setHoveredStat(3)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div style={{ ...styles.statIcon, ...styles.statIconReturned }}>
              ✅
            </div>
            <div>
              <h3 style={styles.statInfoH3}>
                {totalRequests - pendingRequests - borrowedBooks}
              </h3>
              <p style={styles.statInfoP}>Completed</p>
            </div>
            <div style={{ ...styles.statTrend, ...styles.statTrendInfo }}>
              <span>Returned</span>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section style={styles.searchSection}>
          <div style={styles.searchCard}>
            <div style={styles.searchHeader}>
              <h2 style={styles.searchHeaderH2}>🔍 Search & Filter</h2>
              <p style={styles.searchHeaderP}>
                Find specific borrowing records
              </p>
            </div>
            <div style={styles.searchInputs}>
              <div style={styles.searchGroup}>
                <label style={styles.searchGroupLabel}>User Name</label>
                <div style={styles.inputWrapper}>
                  <span style={styles.inputIcon}>👤</span>
                  <input
                    type="text"
                    placeholder="Enter User Name..."
                    value={userNameSearch}
                    onChange={(e) => setUserNameSearch(e.target.value)}
                    style={{
                      ...styles.searchInput,
                      ...(focusedInput === "userId" && styles.searchInputFocus),
                    }}
                    onFocus={() => setFocusedInput("userId")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>
              </div>
              <div style={styles.searchGroup}>
                <label style={styles.searchGroupLabel}>Book Title</label>
                <div style={styles.inputWrapper}>
                  <span style={styles.inputIcon}>📚</span>
                  <input
                    type="text"
                    placeholder="Search for books..."
                    value={bookSearch}
                    onChange={(e) => setBookSearch(e.target.value)}
                    style={{
                      ...styles.searchInput,
                      ...(focusedInput === "book" && styles.searchInputFocus),
                    }}
                    onFocus={() => setFocusedInput("book")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Table Section */}
        <section style={styles.tableSection}>
          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2 style={styles.tableTitleH2}>📋 Borrowing Requests</h2>
                <span style={styles.tableCount}>
                  {peminjamanData.length} records found
                </span>
              </div>
            </div>

            {loading ? (
              <div style={styles.loadingState}>
                <div style={styles.spinner}></div>
                <p style={styles.loadingText}>Loading data...</p>
              </div>
            ) : error ? (
              <div style={styles.emptyState}>
                <span style={styles.emptyIcon}>⚠️</span>
                <p style={styles.emptyP}>{error}</p>
              </div>
            ) : peminjamanData.length === 0 ? (
              <div style={styles.emptyState}>
                <span style={styles.emptyIcon}>📭</span>
                <h3 style={styles.emptyH3}>No Records Found</h3>
                <p style={styles.emptyP}>
                  There are no borrowing requests matching your search criteria.
                </p>
              </div>
            ) : (
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>#</th>
                      <th style={styles.th}>User Name</th>
                      <th style={styles.th}>Book Title</th>
                      <th style={styles.th}>Date Borrowed</th>
                      <th style={styles.th}>Date Returned</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {peminjamanData.map((item, index) => (
                      <tr
                        key={item.id_pinjam}
                        style={{
                          ...styles.tr,
                          ...(hoveredRow === index && styles.trHover),
                        }}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td style={{ ...styles.td, ...styles.tdNumber }}>
                          {index + 1}
                        </td>
                        <td style={styles.td}>
                          <span style={styles.userBadge}>
                            {item.user?.name || "N/A"}
                          </span>
                        </td>
                        <td style={{ ...styles.td, ...styles.tdBook }}>
                          {item.buku?.judul || "N/A"}
                        </td>
                        <td style={{ ...styles.td, ...styles.tdDate }}>
                          {item.tgl_pinjam || "Not yet borrowed"}
                        </td>
                        <td style={{ ...styles.td, ...styles.tdDate }}>
                          {item.tgl_kembali || "Not returned"}
                        </td>
                        <td style={styles.td}>
                          <span
                            style={{
                              ...styles.statusBadge,
                              ...getStatusStyle(item.status),
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td style={styles.td}>
                          {item.status === "pending" ? (
                            <div style={styles.actionButtons}>
                              <button
                                style={{
                                  ...styles.btnAccept,
                                  ...(hoveredAccept === index &&
                                    styles.btnAcceptHover),
                                }}
                                onMouseEnter={() => setHoveredAccept(index)}
                                onMouseLeave={() => setHoveredAccept(null)}
                                onClick={() =>
                                  handleAccept(
                                    item.id_pinjam,
                                    item.id_user,
                                    item.id_buku
                                  )
                                }
                              >
                                ✓ Accept
                              </button>
                              <button
                                style={{
                                  ...styles.btnDecline,
                                  ...(hoveredDecline === index &&
                                    styles.btnDeclineHover),
                                }}
                                onMouseEnter={() => setHoveredDecline(index)}
                                onMouseLeave={() => setHoveredDecline(null)}
                                onClick={() => handleDecline(item.id_pinjam)}
                              >
                                ✕ Decline
                              </button>
                            </div>
                          ) : (
                            <span style={styles.actionDone}>✓ Processed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeAdmin;
