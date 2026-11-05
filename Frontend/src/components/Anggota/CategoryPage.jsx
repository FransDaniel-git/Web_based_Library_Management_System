import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { GetAllBooksByCategory } from "../../api/Admin/apiBookAdmin";
import NavbarAnggota from "./NavbarAnggota";
import FooterAnggota from "./FooterAnggota";

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f7fa",
  },
  heroSection: {
    position: "relative",
    background:
      "linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #5c6bc0 100%)",
    padding: "140px 20px 100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    position: "relative",
    textAlign: "center",
    zIndex: 10,
  },
  heroBadge: {
    display: "inline-block",
    padding: "8px 20px",
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "50px",
    color: "white",
    fontSize: "0.9rem",
    fontWeight: 500,
    marginBottom: "15px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: 800,
    color: "white",
    marginBottom: "15px",
    textShadow: "2px 4px 8px rgba(0, 0, 0, 0.3)",
  },
  heroSubtitle: {
    fontSize: "1.1rem",
    color: "rgba(255, 255, 255, 0.9)",
    maxWidth: "500px",
    margin: "0 auto",
    lineHeight: 1.6,
  },
  mainContent: {
    padding: "50px 20px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  searchFilterSection: {
    marginBottom: "40px",
  },
  searchFilterCard: {
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
    padding: "30px 40px",
  },
  searchWrapper: {
    marginBottom: "25px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "#f5f7fa",
    padding: "8px 8px 8px 25px",
    borderRadius: "50px",
    width: "100%",
    border: "2px solid transparent",
    transition: "all 0.3s ease",
  },
  searchContainerFocused: {
    borderColor: "#ff7043",
    background: "white",
    boxShadow: "0 0 0 4px rgba(255, 112, 67, 0.1)",
  },
  searchIconWrapper: {
    width: "45px",
    height: "45px",
    background: "linear-gradient(135deg, #1a237e, #3949ab)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  searchIcon: {
    fontSize: "20px",
    filter: "brightness(0) invert(1)",
  },
  searchInput: {
    flex: "1",
    height: "50px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "25px",
    fontSize: "16px",
    color: "#333",
    background: "transparent",
    outline: "none",
  },
  clearBtn: {
    padding: "14px 24px",
    background: "linear-gradient(135deg, #ff7043, #ff5722)",
    color: "white",
    border: "none",
    borderRadius: "50px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 15px rgba(255, 112, 67, 0.3)",
    flexShrink: 0,
  },
  filterWrapper: {
    paddingTop: "20px",
    borderTop: "1px solid #e8ecf1",
  },
  filterHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  filterLabel: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#1a237e",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  filterLabelIcon: {
    fontSize: "1.1rem",
  },
  filterCount: {
    fontSize: "0.85rem",
    color: "#888",
  },
  filterTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  filterTag: {
    padding: "10px 18px",
    borderRadius: "50px",
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "2px solid #e8ecf1",
    background: "white",
    color: "#555",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  filterTagActive: {
    background: "linear-gradient(135deg, #1a237e, #3949ab)",
    color: "white",
    border: "2px solid #1a237e",
    boxShadow: "0 4px 15px rgba(26, 35, 126, 0.3)",
  },
  filterTagHovered: {
    borderColor: "#3949ab",
    background:
      "linear-gradient(135deg, rgba(26, 35, 126, 0.05), rgba(57, 73, 171, 0.1))",
    color: "#1a237e",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(26, 35, 126, 0.15)",
  },
  filterTagEmoji: {
    fontSize: "1.1rem",
  },
  categorySection: {
    marginBottom: "40px",
  },
  categoryCard: {
    background: "white",
    borderRadius: "24px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
  },
  categoryHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "25px 30px",
    background: "linear-gradient(135deg, #1a237e, #3949ab)",
    color: "white",
  },
  categoryTitleWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  categoryIcon: {
    width: "50px",
    height: "50px",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    backdropFilter: "blur(10px)",
  },
  categoryTitle: {
    fontSize: "1.6rem",
    fontWeight: 700,
    color: "white",
    margin: 0,
  },
  categoryCount: {
    background: "linear-gradient(135deg, #ff7043, #ff5722)",
    color: "white",
    padding: "10px 20px",
    borderRadius: "25px",
    fontSize: "0.9rem",
    fontWeight: 600,
    boxShadow: "0 4px 15px rgba(255, 112, 67, 0.4)",
  },
  booksGridWrapper: {
    padding: "30px",
  },
  booksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "25px",
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
  },
  bookCardHovered: {
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
  bookImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    transition: "transform 0.5s ease",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
  },
  bookImageHovered: {
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
  bookOverlayVisible: {
    opacity: 1,
  },
  viewBtn: {
    padding: "12px 28px",
    background: "linear-gradient(135deg, #ff7043, #ff5722)",
    color: "white",
    borderRadius: "25px",
    fontSize: "0.9rem",
    fontWeight: 600,
    boxShadow: "0 4px 15px rgba(255, 112, 67, 0.4)",
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
    padding: "100px 20px",
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
  loadingText: {
    fontSize: "1.1rem",
    color: "#666",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    textAlign: "center",
  },
  emptyIcon: {
    fontSize: "5rem",
    marginBottom: "20px",
  },
  emptyTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#333",
    marginBottom: "10px",
  },
  emptyText: {
    fontSize: "1rem",
    color: "#666",
    maxWidth: "400px",
  },
  noResultsCategory: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#888",
    fontSize: "1rem",
    gridColumn: "1 / -1",
  },
};

const spinKeyframes = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [booksByCategory, setBooksByCategory] = useState({});
  const [originalBooksByCategory, setOriginalBooksByCategory] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredBook, setHoveredBook] = useState(null);
  const [hoveredTag, setHoveredTag] = useState(null);
  const [focusedInput, setFocusedInput] = useState(false);
  const baseURL = "http://127.0.0.1:8000";

  const getCategoryTagStyle = (category) => {
    const baseStyle = { ...styles.filterTag };
    const isActive = selectedCategory === category;
    const isHovered = hoveredTag === category && !isActive;

    if (isActive) {
      return {
        ...baseStyle,
        ...styles.filterTagActive,
        borderColor: "#1a237e", // Explicit active border
      };
    } else if (isHovered) {
      return {
        ...baseStyle,
        ...styles.filterTagHovered,
        borderColor: "#3949ab", // Explicit hover border
      };
    } else {
      return {
        ...baseStyle,
        borderColor: "#e8ecf1", // Explicit normal border
      };
    }
  };

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
    let filtered = { ...originalBooksByCategory };

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = Object.entries(originalBooksByCategory).reduce(
        (acc, [category, books]) => {
          if (category === selectedCategory) {
            acc[category] = books;
          }
          return acc;
        },
        {}
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = Object.entries(filtered).reduce((acc, [category, books]) => {
        const filteredBooks = books.filter(
          (book) =>
            (book.judul &&
              book.judul.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (book.penulis &&
              book.penulis.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        if (filteredBooks.length > 0) {
          acc[category] = filteredBooks;
        }

        return acc;
      }, {});
    }

    setBooksByCategory(filtered);
  }, [searchQuery, selectedCategory, originalBooksByCategory]);

  const getCategoryIcon = (category) => {
    const icons = {
      Fiction: "📖",
      "Non-Fiction": "📚",
      Science: "🔬",
      Technology: "💻",
      History: "🏛️",
      Biography: "👤",
      Romance: "💕",
      Mystery: "🔍",
      Fantasy: "🧙",
      Horror: "👻",
      Comedy: "😂",
      Drama: "🎭",
      Adventure: "🗺️",
      Education: "🎓",
      Children: "🧒",
      Art: "🎨",
      Music: "🎵",
      Sports: "⚽",
      Travel: "✈️",
      Cooking: "🍳",
      Health: "🏥",
      Business: "💼",
      Religion: "📿",
      Philosophy: "🤔",
      Psychology: "🧠",
      default: "📚",
    };
    return icons[category] || icons.default;
  };

  const totalBooks = Object.values(originalBooksByCategory).flat().length;
  const totalCategories = Object.keys(originalBooksByCategory).length;

  return (
    <div style={styles.container}>
      <style>{spinKeyframes}</style>

      {/* Navbar */}
      <NavbarAnggota />

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroPattern}></div>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>📚 Explore Our Collection</span>
          <h1 style={styles.heroTitle}>Browse by Category</h1>
          <p style={styles.heroSubtitle}>
            Discover {totalBooks} books across {totalCategories} categories.
            Find your next favorite read!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Search & Filter Section */}
        <section style={styles.searchFilterSection}>
          <div style={styles.searchFilterCard}>
            {/* Search Bar - Full Width */}
            <div style={styles.searchWrapper}>
              <div
                style={{
                  ...styles.searchContainer,
                  ...(focusedInput && styles.searchContainerFocused),
                }}
              >
                <div style={styles.searchIconWrapper}>
                  <span style={styles.searchIcon}>🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search books by title...."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                  onFocus={() => setFocusedInput(true)}
                  onBlur={() => setFocusedInput(false)}
                />
                {searchQuery && (
                  <button
                    style={styles.clearBtn}
                    onClick={() => setSearchQuery("")}
                  >
                    ✕ Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Tags */}
            {!loading && Object.keys(originalBooksByCategory).length > 0 && (
              <div style={styles.filterWrapper}>
                <div style={styles.filterHeader}>
                  <span style={styles.filterLabel}>
                    <span style={styles.filterLabelIcon}>🏷️</span>
                    Filter by Category
                  </span>
                  <span style={styles.filterCount}>
                    {Object.keys(originalBooksByCategory).length} categories
                    available
                  </span>
                </div>
                <div style={styles.filterTags}>
                  <span
                    key={`all-${hoveredTag === "All" ? "hovered" : "normal"}`}
                    style={getCategoryTagStyle("All")}
                    onClick={() => setSelectedCategory("All")}
                    onMouseEnter={() => {
                      console.log("Hovering All");
                      setHoveredTag("All");
                    }}
                    onMouseLeave={() => {
                      console.log("Leaving All");
                      setHoveredTag(null);
                    }}
                  >
                    <span style={styles.filterTagEmoji}>📚</span>
                    All Categories
                  </span>
                  {Object.keys(originalBooksByCategory).map((category) => (
                    <span
                      key={`${category}-${hoveredTag === category ? "hovered" : "normal"}`}
                      style={getCategoryTagStyle(category)}
                      onClick={() => setSelectedCategory(category)}
                      onMouseEnter={() => {
                        console.log(`Hovering ${category}`);
                        setHoveredTag(category);
                      }}
                      onMouseLeave={() => {
                        console.log(`Leaving ${category}`);
                        setHoveredTag(null);
                      }}
                    >
                      <span style={styles.filterTagEmoji}>
                        {getCategoryIcon(category)}
                      </span>
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div style={styles.loadingState}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>Loading books...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && Object.keys(booksByCategory).length === 0 && (
          <div style={styles.emptyState}>
            <span style={styles.emptyIcon}>📭</span>
            <h3 style={styles.emptyTitle}>No Books Found</h3>
            <p style={styles.emptyText}>
              {searchQuery
                ? `No books match your search "${searchQuery}". Try a different search term.`
                : "There are no books available at the moment. Please check back later."}
            </p>
          </div>
        )}

        {/* Categories and Books */}
        {!loading &&
          Object.entries(booksByCategory).map(([category, books]) => (
            <section key={category} style={styles.categorySection}>
              <div style={styles.categoryCard}>
                {/* Category Header */}
                <div style={styles.categoryHeader}>
                  <div style={styles.categoryTitleWrapper}>
                    <div style={styles.categoryIcon}>
                      {getCategoryIcon(category)}
                    </div>
                    <h2 style={styles.categoryTitle}>{category}</h2>
                  </div>
                  <span style={styles.categoryCount}>
                    {books.length} {books.length === 1 ? "Book" : "Books"}
                  </span>
                </div>

                {/* Books Grid */}
                <div style={styles.booksGridWrapper}>
                  <div style={styles.booksGrid}>
                    {books.map((book) => (
                      <Link
                        key={book.id_buku}
                        to={`/BookAnggota/${book.id_buku}`}
                        style={{
                          ...styles.bookCard,
                          ...(hoveredBook === book.id_buku &&
                            styles.bookCardHovered),
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
                              ...styles.bookImage,
                              ...(hoveredBook === book.id_buku &&
                                styles.bookImageHovered),
                            }}
                          />
                          <div
                            style={{
                              ...styles.bookOverlay,
                              ...(hoveredBook === book.id_buku &&
                                styles.bookOverlayVisible),
                            }}
                          >
                            <span style={styles.viewBtn}>View Details</span>
                          </div>
                        </div>
                        <div style={styles.bookInfo}>
                          <h3 style={styles.bookTitle}>{book.judul}</h3>
                          <p style={styles.bookAuthor}>{book.pengarang}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
      </div>

      {/* Footer */}
      <FooterAnggota />
    </div>
  );
};

export default CategoryPage;
