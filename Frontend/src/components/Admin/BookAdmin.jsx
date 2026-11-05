import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { GetAllBooksByCategory } from "../../api/Admin/apiBookAdmin";
import SidebarAdmin from "./SidebarAdmin";

const styles = {
  dashboard: {
    display: "flex",
    minHeight: "100vh",
    maxWidth: "100vw",
    overflowX: "hidden",
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
  main: {
    flex: "1",
    marginLeft: "280px",
    padding: "30px",
    minHeight: "100vh",
    width: "calc(100vw - 280px)",
    maxWidth: "calc(100vw - 280px)",
    overflowX: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
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
  btnAddBook: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 28px",
    background: "linear-gradient(135deg, #ff7043 0%, #ff5722 100%)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(255, 112, 67, 0.3)",
  },
  btnAddBookHover: {
    transform: "translateY(-3px)",
    boxShadow: "0 6px 25px rgba(255, 112, 67, 0.5)",
  },
  btnIcon: {
    fontSize: "20px",
    fontWeight: "700",
  },
  statsSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "30px",
    width: "100%",
  },
  statCard: {
    background: "white",
    borderRadius: "20px",
    padding: "25px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
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
    background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
  },
  statIconCategories: {
    background: "linear-gradient(135deg, #f3e5f5, #e1bee7)",
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
    background: "#e8f5e9",
    color: "#2e7d32",
  },
  statTrendInfo: {
    background: "#f3e5f5",
    color: "#7b1fa2",
  },
  searchSection: {
    marginBottom: "30px",
  },
  searchCard: {
    background: "white",
    padding: "20px 30px",
    borderRadius: "20px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  searchFilters: {
    display: "flex",
    gap: "15px",
    width: "100%",
  },
  searchGroup: {
    flex: "1",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  filterGroup: {
    flexShrink: "0",
  },
  categorySelect: {
    height: "50px",
    padding: "12px 20px",
    border: "2px solid #e8ecf1",
    borderRadius: "12px",
    fontSize: "15px",
    color: "#333",
    background: "#f8f9fc",
    outline: "none",
    transition: "all 0.3s ease",
    minWidth: "200px",
  },
  searchIcon: {
    fontSize: "24px",
    flexShrink: "0",
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
  booksSection: {
    marginBottom: "30px",
  },
  booksCard: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  booksHeader: {
    padding: "25px 30px",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  booksTitleH2: {
    fontSize: "20px",
    color: "#1a237e",
    marginBottom: "5px",
    margin: "0",
  },
  booksCount: {
    background: "#e8eaf6",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    color: "#3f51b5",
    fontWeight: "600",
    marginLeft: "10px",
  },
  categoriesContainer: {
    padding: "20px 30px",
    width: "100%",
    maxWidth: "100%",
  },
  categorySection: {
    marginBottom: "40px",
  },
  categoryHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    paddingBottom: "15px",
    borderBottom: "2px solid #f0f0f0",
  },
  categoryTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a237e",
    margin: "0",
  },
  categoryIcon: {
    fontSize: "24px",
  },
  categoryCount: {
    background: "linear-gradient(135deg, #e8eaf6, #c5cae9)",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    color: "#3f51b5",
    fontWeight: "600",
  },
  booksCarousel: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "25px",
    padding: "20px",
  },
  bookCardLink: {
    textDecoration: "none",
  },
  bookCard: {
    background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
    textDecoration: "none",
    color: "inherit",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    position: "relative",
    width: "260px",
    minWidth: "260px",
  },
  bookCardHover: {
    transform: "translateY(-12px) scale(1.02)",
    boxShadow: "0 20px 50px rgba(26, 35, 126, 0.2)",
    border: "1px solid rgba(26, 35, 126, 0.1)",
  },
  bookImageWrapper: {
    position: "relative",
    height: "280px",
    overflow: "hidden",
    background: "linear-gradient(135deg, #f5f7fa, #e8ecf1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
  },
  bookCover: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    transition: "transform 0.5s ease",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
  },
  bookCoverHover: {
    transform: "scale(1.05)",
  },
  bookOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(to top, rgba(26, 35, 126, 0.9) 0%, rgba(26, 35, 126, 0.3) 50%, transparent 100%)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: "25px",
    opacity: 0,
    transition: "opacity 0.4s ease",
  },
  bookOverlayHover: {
    opacity: 1,
  },
  editBtn: {
    padding: "12px 28px",
    background: "linear-gradient(135deg, #ff7043, #ff5722)",
    color: "white",
    borderRadius: "25px",
    fontSize: "0.9rem",
    fontWeight: 600,
    boxShadow: "0 4px 15px rgba(255, 112, 67, 0.4)",
    border: "none",
    cursor: "pointer",
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
    fontSize: "0.8rem",
    color: "#888",
    margin: "0",
    fontStyle: "italic",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
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
    marginBottom: "25px",
  },
  btnAddEmpty: {
    padding: "14px 28px",
    background: "linear-gradient(135deg, #ff7043 0%, #ff5722 100%)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  btnAddEmptyHover: {
    transform: "translateY(-3px)",
    boxShadow: "0 6px 25px rgba(255, 112, 67, 0.5)",
  },
};

const spinKeyframes = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const BookAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [originalBooksByCategory, setOriginalBooksByCategory] = useState({});
  const [booksByCategory, setBooksByCategory] = useState({});
  const [bookSearch, setBookSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(null);
  const [hoveredAddBtn, setHoveredAddBtn] = useState(false);
  const [hoveredAddEmpty, setHoveredAddEmpty] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);
  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const books = await GetAllBooksByCategory();
        setOriginalBooksByCategory(books);
        setBooksByCategory(books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    let filteredBooksByCategory = { ...originalBooksByCategory };

    // Filter by category if selected
    if (selectedCategory) {
      filteredBooksByCategory = {
        [selectedCategory]: originalBooksByCategory[selectedCategory] || [],
      };
    }

    // Filter by search query
    if (bookSearch.trim()) {
      filteredBooksByCategory = Object.entries(filteredBooksByCategory).reduce(
        (acc, [category, books]) => {
          const filteredBooks = books.filter(
            (book) =>
              (book.judul?.toLowerCase() || "").includes(
                bookSearch.toLowerCase()
              ) ||
              (book.penulis?.toLowerCase() || "").includes(
                bookSearch.toLowerCase()
              )
          );

          if (filteredBooks.length > 0) {
            acc[category] = filteredBooks;
          }

          return acc;
        },
        {}
      );
    }

    setBooksByCategory(filteredBooksByCategory);
  }, [bookSearch, selectedCategory, originalBooksByCategory]);

  const handleAddNewBook = () => {
    navigate("/AddBookAdmin");
  };

  const totalBooks = Object.values(originalBooksByCategory).flat().length;
  const totalCategories = Object.keys(originalBooksByCategory).length;

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
            <h1 style={styles.headerH1}>📚 Manage Books</h1>
            <p style={styles.headerP}>
              Add, edit, or remove books from the library collection.
            </p>
          </div>
          <button
            style={{
              ...styles.btnAddBook,
              ...(hoveredAddBtn && styles.btnAddBookHover),
            }}
            onClick={handleAddNewBook}
            onMouseEnter={() => setHoveredAddBtn(true)}
            onMouseLeave={() => setHoveredAddBtn(false)}
          >
            <span style={styles.btnIcon}>+</span>
            <span>Add New Book</span>
          </button>
        </header>

        {/* Stats Cards */}
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
              📖
            </div>
            <div>
              <h3 style={styles.statInfoH3}>{totalBooks}</h3>
              <p style={styles.statInfoP}>Total Books</p>
            </div>
            <div style={{ ...styles.statTrend, ...styles.statTrendUp }}>
              <span>Library</span>
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
            <div style={{ ...styles.statIcon, ...styles.statIconCategories }}>
              📂
            </div>
            <div>
              <h3 style={styles.statInfoH3}>{totalCategories}</h3>
              <p style={styles.statInfoP}>Categories</p>
            </div>
            <div style={{ ...styles.statTrend, ...styles.statTrendInfo }}>
              <span>Active</span>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section style={styles.searchSection}>
          <div style={styles.searchCard}>
            <div style={styles.searchFilters}>
              <div style={styles.searchGroup}>
                <span style={styles.searchIcon}>🔍</span>
                <input
                  type="text"
                  placeholder="Search books by title...."
                  value={bookSearch}
                  onChange={(e) => setBookSearch(e.target.value)}
                  style={{
                    ...styles.searchInput,
                    ...(focusedInput && styles.searchInputFocus),
                  }}
                  onFocus={() => setFocusedInput(true)}
                  onBlur={() => setFocusedInput(false)}
                />
              </div>
              <div style={styles.filterGroup}>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={styles.categorySelect}
                >
                  <option value="">All Categories</option>
                  {Object.keys(originalBooksByCategory).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Books Section */}
        <section style={styles.booksSection}>
          <div style={styles.booksCard}>
            <div style={styles.booksHeader}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2 style={styles.booksTitleH2}>📚 Library Collection</h2>
                <span style={styles.booksCount}>
                  {Object.values(booksByCategory).flat().length} books in{" "}
                  {Object.keys(booksByCategory).length} categories
                </span>
              </div>
            </div>

            {loading ? (
              <div style={styles.loadingState}>
                <div style={styles.spinner}></div>
                <p style={styles.loadingText}>Loading books...</p>
              </div>
            ) : Object.keys(booksByCategory).length > 0 ? (
              <div style={styles.categoriesContainer}>
                {Object.entries(booksByCategory).map(([category, books]) => (
                  <div key={category} style={styles.categorySection}>
                    <div style={styles.categoryHeader}>
                      <h3 style={styles.categoryTitle}>
                        <span style={styles.categoryIcon}>📁</span>
                        {category}
                      </h3>
                      <span style={styles.categoryCount}>
                        {books.length} books
                      </span>
                    </div>

                    <div style={styles.booksCarousel}>
                      {books.map((book) => (
                        <Link
                          key={book.id_buku}
                          to={`/EditBook/${book.id_buku}`}
                          style={styles.bookCardLink}
                        >
                          <div
                            style={{
                              ...styles.bookCard,
                              ...(hoveredBook === book.id_buku &&
                                styles.bookCardHover),
                            }}
                            onMouseEnter={() => setHoveredBook(book.id_buku)}
                            onMouseLeave={() => setHoveredBook(null)}
                          >
                            <div style={styles.bookImageWrapper}>
                              <img
                                src={
                                  book.book_poster
                                    ? `${baseURL}/storage/${book.book_poster}`
                                    : "https://via.placeholder.com/220x280?text=No+Cover"
                                }
                                alt={book.judul}
                                style={{
                                  ...styles.bookCover,
                                  ...(hoveredBook === book.id_buku &&
                                    styles.bookCoverHover),
                                }}
                              />
                              <div
                                style={{
                                  ...styles.bookOverlay,
                                  ...(hoveredBook === book.id_buku &&
                                    styles.bookOverlayHover),
                                }}
                              >
                                <span style={styles.editBtn}>Edit Book</span>
                              </div>
                            </div>
                            <div style={styles.bookInfo}>
                              <h3 style={styles.bookTitle}>{book.judul}</h3>
                              <p style={styles.bookAuthor}>{book.pengarang}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.emptyState}>
                <span style={styles.emptyIcon}>📭</span>
                <h3 style={styles.emptyH3}>No Books Found</h3>
                <p style={styles.emptyP}>
                  {bookSearch || selectedCategory
                    ? `No books matching your search criteria`
                    : "Start by adding some books to the library."}
                </p>
                {!bookSearch && (
                  <button
                    style={{
                      ...styles.btnAddEmpty,
                      ...(hoveredAddEmpty && styles.btnAddEmptyHover),
                    }}
                    onClick={handleAddNewBook}
                    onMouseEnter={() => setHoveredAddEmpty(true)}
                    onMouseLeave={() => setHoveredAddEmpty(false)}
                  >
                    + Add First Book
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BookAdmin;
