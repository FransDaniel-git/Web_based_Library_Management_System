import { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GetBookById,
  UpdateBook,
  DeleteBook,
} from "../../api/Admin/apiEditBookAdmin";

const styles = {
  dashboard: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)",
  },
  sidebar: {
    width: "280px",
    background: "linear-gradient(180deg, #1a237e 0%, #0d1442 100%)",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    height: "100vh",
    zIndex: "100",
    boxShadow: "4px 0 20px rgba(0, 0, 0, 0.15)",
  },
  sidebarHeader: {
    padding: "25px 20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    textAlign: "center",
  },
  sidebarLogo: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "white",
    marginBottom: "15px",
  },
  sidebarTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "white",
    margin: "0",
  },
  sidebarSubtitle: {
    fontSize: "11px",
    color: "#ff7043",
    textTransform: "uppercase",
    letterSpacing: "2px",
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
    fontSize: "18px",
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
  },
  main: {
    flex: "1",
    marginLeft: "280px",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
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
  headerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  btnBack: {
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f0f0",
    borderRadius: "12px",
    textDecoration: "none",
    color: "#333",
    fontSize: "20px",
    transition: "all 0.3s ease",
  },
  btnBackHover: {
    background: "#1a237e",
    color: "white",
  },
  headerH1: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a237e",
    margin: "0 0 5px 0",
  },
  headerP: {
    color: "#666",
    fontSize: "14px",
    margin: "0",
  },
  headerActions: {
    display: "flex",
    gap: "15px",
  },
  btnDelete: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #ef5350 0%, #c62828 100%)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  btnDeleteHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(239, 83, 80, 0.4)",
  },
  btnSave: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  btnSaveHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(76, 175, 80, 0.4)",
  },
  content: {
    flex: "1",
    display: "grid",
    gridTemplateColumns: "350px 1fr",
    gap: "30px",
    padding: "20px 0",
  },
  previewCard: {
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    height: "fit-content",
  },
  imageSection: {
    position: "relative",
    marginBottom: "15px",
    borderRadius: "16px",
    overflow: "hidden",
  },
  bookCover: {
    width: "100%",
    height: "500px",
    objectFit: "contain",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #f5f7fa, #e8ecf1)",
    padding: "10px",
  },
  imageOverlay: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    padding: "20px",
    background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
  },
  changeImageBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #ff7043 0%, #ff5722 100%)",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  fileInputHidden: {
    display: "none",
  },
  bookTitlePreview: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a237e",
    marginBottom: "10px",
  },
  bookAuthorPreview: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#666",
    fontSize: "16px",
    marginBottom: "20px",
  },
  bookStats: {
    display: "flex",
    gap: "20px",
  },
  statItem: {
    flex: "1",
    background: "#f8f9fc",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
  },
  statItemValue: {
    display: "block",
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a237e",
  },
  statItemLabel: {
    fontSize: "12px",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  formCard: {
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  formCardHeader: {
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "2px solid #f0f0f0",
  },
  formCardH2: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a237e",
    margin: "0 0 8px 0",
  },
  formCardP: {
    color: "#666",
    fontSize: "14px",
    margin: "0",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  formGroupFull: {
    gridColumn: "1 / -1",
  },
  formLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
  },
  labelIcon: {
    fontSize: "16px",
  },
  formInput: {
    padding: "14px 16px",
    border: "2px solid #e8ecf1",
    borderRadius: "12px",
    fontSize: "14px",
    color: "#333",
    background: "#f8f9fc",
    transition: "all 0.3s ease",
    outline: "none",
  },
  formInputFocus: {
    borderColor: "#ff7043",
    background: "white",
    boxShadow: "0 0 0 4px rgba(255, 112, 67, 0.1)",
  },
  formSelect: {
    padding: "14px 16px",
    border: "2px solid #e8ecf1",
    borderRadius: "12px",
    fontSize: "14px",
    color: "#333",
    background: "#f8f9fc",
    cursor: "pointer",
    transition: "all 0.3s ease",
    outline: "none",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "100px 20px",
    gridColumn: "1 / -1",
  },
  loadingSpinner: {
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
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    padding: "20px",
    color: "#888",
    fontSize: "13px",
  },
  footerLink: {
    color: "#ff7043",
    textDecoration: "none",
    fontWeight: "600",
  },
};

const spinKeyframes = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const EditBookAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [bookDetails, setBookDetails] = useState({
    id_buku: "",
    judul: "",
    thn_terbit: "",
    pengarang: "",
    kategori: "",
    isbn: "",
    jml_pinjam: 0,
    stok: 0,
    status: "available",
    book_poster: "",
    created_at: "",
  });
  const [bookImage, setBookImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [hoveredLogout, setHoveredLogout] = useState(false);
  const [hoveredBack, setHoveredBack] = useState(false);
  const [hoveredDelete, setHoveredDelete] = useState(false);
  const [hoveredSave, setHoveredSave] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const book = await GetBookById(id);
        setBookDetails({
          id_buku: book.id_buku,
          judul: book.judul,
          thn_terbit: book.thn_terbit,
          pengarang: book.pengarang,
          kategori: book.kategori,
          isbn: book.isbn,
          jml_pinjam: book.jml_pinjam,
          stok: book.stok,
          status: book.status,
          book_poster: book.book_poster,
          created_at: book.created_at,
        });
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch book details.");
        console.error("Error:", error);
      }
    };
    fetchBookDetails();
  }, [id]);

  const handleInputChange = (e, field) => {
    let value = e.target.value;
    if (field === "thn_terbit") {
      value = new Date(value).toISOString().split("T")[0];
    }
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBookImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();

    Object.keys(bookDetails).forEach((key) => {
      if (key !== "id_buku" && key !== "created_at" && key !== "book_poster") {
        updatedData.append(key, bookDetails[key]);
      }
    });

    if (bookImage) {
      updatedData.append("book_poster", bookImage);
    }

    try {
      await UpdateBook(id, updatedData);
      toast.success("Book updated successfully!");
      navigate("/BookAdmin");
    } catch (error) {
      console.error(
        "Error during update:",
        error.response?.data || error.message
      );
      toast.error("Failed to update book.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await DeleteBook(id);
      toast.success("Book deleted successfully!");
      navigate("/BookAdmin");
    } catch (error) {
      toast.error("Failed to delete book.");
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = [
    { to: "/HomeAdmin", icon: "🏠", label: "Dashboard" },
    { to: "/BookAdmin", icon: "📚", label: "Books", active: true },
    { to: "/Returning", icon: "🔄", label: "Returning" },
  ];

  return (
    <div style={styles.dashboard}>
      <style>{spinKeyframes}</style>
      <ToastContainer />

      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <img
            src="/src/assets/images/logo-image.png"
            alt="Logo"
            style={styles.sidebarLogo}
          />
          <h2 style={styles.sidebarTitle}>ATMA Library</h2>
          <span style={styles.sidebarSubtitle}>Admin Panel</span>
        </div>

        <nav style={styles.sidebarNav}>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              style={{
                ...styles.sidebarLink,
                ...(link.active && styles.sidebarLinkActive),
                ...(hoveredNav === index &&
                  !link.active &&
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
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerInfo}>
            <Link
              to="/BookAdmin"
              style={{
                ...styles.btnBack,
                ...(hoveredBack && styles.btnBackHover),
              }}
              onMouseEnter={() => setHoveredBack(true)}
              onMouseLeave={() => setHoveredBack(false)}
            >
              ←
            </Link>
            <div>
              <h1 style={styles.headerH1}>📖 Edit Book</h1>
              <p style={styles.headerP}>Update book information and details</p>
            </div>
          </div>
          <div style={styles.headerActions}>
            <button
              style={{
                ...styles.btnDelete,
                ...(hoveredDelete && styles.btnDeleteHover),
              }}
              onClick={handleDelete}
              onMouseEnter={() => setHoveredDelete(true)}
              onMouseLeave={() => setHoveredDelete(false)}
            >
              <span>🗑️</span>
              Delete Book
            </button>
            <button
              style={{
                ...styles.btnSave,
                ...(hoveredSave && styles.btnSaveHover),
              }}
              onClick={handleSubmit}
              onMouseEnter={() => setHoveredSave(true)}
              onMouseLeave={() => setHoveredSave(false)}
            >
              <span>💾</span>
              Save Changes
            </button>
          </div>
        </header>

        {/* Edit Content */}
        <div style={styles.content}>
          {isLoading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <p style={styles.loadingText}>Loading book details...</p>
            </div>
          ) : (
            <>
              {/* Book Preview Card */}
              <div style={styles.previewCard}>
                <div style={styles.imageSection}>
                  <img
                    src={
                      bookImage
                        ? URL.createObjectURL(bookImage)
                        : bookDetails.book_poster
                          ? `http://127.0.0.1:8000/storage/${bookDetails.book_poster}`
                          : "/src/assets/images/placeholder-book.jpg"
                    }
                    alt={bookDetails.judul || "Book Cover"}
                    style={styles.bookCover}
                  />
                  <div style={styles.imageOverlay}>
                    <button
                      style={styles.changeImageBtn}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span>📷</span>
                      Change Cover Image
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      style={styles.fileInputHidden}
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </div>
                </div>

                <h3 style={styles.bookTitlePreview}>
                  {bookDetails.judul || "Book Title"}
                </h3>
                <p style={styles.bookAuthorPreview}>
                  {bookDetails.pengarang || "Author Name"}
                </p>
              </div>

              {/* Form Card */}
              <div style={styles.formCard}>
                <div style={styles.formCardHeader}>
                  <h2 style={styles.formCardH2}>📝 Book Information</h2>
                  <p style={styles.formCardP}>
                    Fill in the details below to update the book
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <div style={styles.formGrid}>
                    {/* ID */}
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>
                        <span style={styles.labelIcon}>🔢</span>
                        Book ID
                      </label>
                      <input
                        type="text"
                        style={styles.formInput}
                        value={bookDetails.id_buku}
                        disabled
                      />
                    </div>

                    {/* Title */}
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>
                        <span style={styles.labelIcon}>📖</span>
                        Title
                      </label>
                      <input
                        type="text"
                        style={{
                          ...styles.formInput,
                          ...(focusedInput === "judul" &&
                            styles.formInputFocus),
                        }}
                        value={bookDetails.judul}
                        onChange={(e) => handleInputChange(e, "judul")}
                        onFocus={() => setFocusedInput("judul")}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Enter book title"
                      />
                    </div>

                    {/* Author */}
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>
                        <span style={styles.labelIcon}>✍️</span>
                        Author
                      </label>
                      <input
                        type="text"
                        style={{
                          ...styles.formInput,
                          ...(focusedInput === "pengarang" &&
                            styles.formInputFocus),
                        }}
                        value={bookDetails.pengarang}
                        onChange={(e) => handleInputChange(e, "pengarang")}
                        onFocus={() => setFocusedInput("pengarang")}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Enter author name"
                      />
                    </div>

                    {/* Category */}
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>
                        <span style={styles.labelIcon}>📂</span>
                        Category
                      </label>
                      <select
                        style={styles.formSelect}
                        value={bookDetails.kategori}
                        onChange={(e) => handleInputChange(e, "kategori")}
                      >
                        <option value="">Select category</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Romance">Romance</option>
                        <option value="Horror">Horror</option>
                        <option value="Kids">Kids</option>
                        <option value="Fiction">Fiction</option>
                      </select>
                    </div>

                    {/* ISBN */}
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>
                        <span style={styles.labelIcon}>📋</span>
                        ISBN
                      </label>
                      <input
                        type="text"
                        style={{
                          ...styles.formInput,
                          ...(focusedInput === "isbn" && styles.formInputFocus),
                        }}
                        value={bookDetails.isbn}
                        onChange={(e) => handleInputChange(e, "isbn")}
                        onFocus={() => setFocusedInput("isbn")}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Enter ISBN"
                      />
                    </div>

                    {/* Published Year */}
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>
                        <span style={styles.labelIcon}>📅</span>
                        Published Year
                      </label>
                      <input
                        type="date"
                        style={{
                          ...styles.formInput,
                          ...(focusedInput === "thn_terbit" &&
                            styles.formInputFocus),
                        }}
                        value={bookDetails.thn_terbit}
                        onChange={(e) => handleInputChange(e, "thn_terbit")}
                        onFocus={() => setFocusedInput("thn_terbit")}
                        onBlur={() => setFocusedInput(null)}
                      />
                    </div>

                    {/* Stock */}
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>
                        <span style={styles.labelIcon}>📦</span>
                        Stock
                      </label>
                      <input
                        type="number"
                        style={{
                          ...styles.formInput,
                          ...(focusedInput === "stok" && styles.formInputFocus),
                        }}
                        value={bookDetails.stok}
                        onChange={(e) => handleInputChange(e, "stok")}
                        onFocus={() => setFocusedInput("stok")}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Enter stock amount"
                      />
                    </div>

                    {/* Total Borrowed */}
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>
                        <span style={styles.labelIcon}>📊</span>
                        Total Borrowed
                      </label>
                      <input
                        type="number"
                        style={{
                          ...styles.formInput,
                          ...(focusedInput === "jml_pinjam" &&
                            styles.formInputFocus),
                        }}
                        value={bookDetails.jml_pinjam}
                        onChange={(e) => handleInputChange(e, "jml_pinjam")}
                        onFocus={() => setFocusedInput("jml_pinjam")}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Enter total borrowed"
                      />
                    </div>

                    {/* Status */}
                    <div
                      style={{ ...styles.formGroup, ...styles.formGroupFull }}
                    >
                      <label style={styles.formLabel}>
                        <span style={styles.labelIcon}>📌</span>
                        Status
                      </label>
                      <select
                        style={styles.formSelect}
                        value={bookDetails.status}
                        onChange={(e) => handleInputChange(e, "status")}
                      >
                        <option value="available">Available</option>
                        <option value="borrowed">Borrowed</option>
                      </select>
                    </div>
                  </div>
                </Form>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <footer style={styles.footer}>
          <span>© 2024</span>
          <a href="#" style={styles.footerLink}>
            ATMA Library
          </a>
          <span>• All rights reserved</span>
        </footer>
      </main>
    </div>
  );
};

export default EditBookAdmin;
