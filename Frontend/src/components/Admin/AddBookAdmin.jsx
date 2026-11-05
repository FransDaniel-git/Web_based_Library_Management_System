import { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAllBooks, CreateBook } from "../../api/Admin/apiAddBookAdmin";

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
  btnSubmit: {
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
  btnSubmitHover: {
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
  uploadCard: {
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    height: "fit-content",
  },
  uploadSection: {
    position: "relative",
    marginBottom: "15px",
    borderRadius: "16px",
    overflow: "hidden",
    minHeight: "350px",
    background: "#f8f9fc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePreview: {
    width: "100%",
    height: "500px",
    objectFit: "contain",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #f5f7fa, #e8ecf1)",
    padding: "10px",
  },
  uploadPlaceholder: {
    textAlign: "center",
    padding: "40px 20px",
  },
  uploadIcon: {
    fontSize: "60px",
    marginBottom: "15px",
  },
  uploadPlaceholderH3: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
  },
  uploadPlaceholderP: {
    color: "#888",
    fontSize: "14px",
  },
  imageOverlay: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    padding: "20px",
    background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
  },
  uploadImageBtn: {
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
  uploadInfo: {
    padding: "20px",
    background: "#f8f9fc",
    borderRadius: "12px",
  },
  uploadInfoH3: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "15px",
  },
  uploadTips: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  tipItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    color: "#666",
  },
  tipIcon: {
    color: "#4caf50",
    fontWeight: "600",
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
  requiredStar: {
    color: "#ef5350",
    marginLeft: "4px",
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
  confirmDialog: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1000",
  },
  confirmDialogContent: {
    background: "white",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
  },
  dialogIcon: {
    fontSize: "50px",
    marginBottom: "20px",
  },
  dialogP: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "25px",
  },
  buttonContainer: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },
  buttonCancel: {
    padding: "12px 24px",
    background: "#f0f0f0",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  buttonLeave: {
    padding: "12px 24px",
    background: "linear-gradient(135deg, #ef5350 0%, #c62828 100%)",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

const AddBookAdmin = () => {
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publicationDate, setPublicationDate] = useState(null);
  const [stock, setStock] = useState("");
  const [id, setId] = useState(0);
  const [bookImage, setBookImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [jmlPinjam, setJmlPinjam] = useState(0);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState("");
  const [hoveredNav, setHoveredNav] = useState(null);
  const [hoveredLogout, setHoveredLogout] = useState(false);
  const [hoveredBack, setHoveredBack] = useState(false);
  const [hoveredSubmit, setHoveredSubmit] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    setIsFormDirty(true);
  };

  const fetchBooks = async () => {
    try {
      const books = await GetAllBooks();
      if (books.length > 0) {
        const latestId = Math.max(...books.map((book) => book.id_buku));
        setId(latestId + 1);
      } else {
        setId(1);
      }
    } catch (error) {
      toast.error("Unable to fetch books. Please try again later.");
      console.error("Error fetching books:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBookImage(file);
      setImagePreview(URL.createObjectURL(file));
      setIsFormDirty(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      toast.error("Please fill in the Title field.");
      return;
    }
    if (!author) {
      toast.error("Please fill in the Author field.");
      return;
    }
    if (!category) {
      toast.error("Please select a Category.");
      return;
    }
    if (!isbn) {
      toast.error("Please fill in the ISBN field.");
      return;
    }
    if (!publicationDate) {
      toast.error("Please select a Publication Date.");
      return;
    }
    if (!bookImage) {
      toast.error("Please select a Book Image.");
      return;
    }
    if (!stock) {
      toast.error("Please fill in the Stock field.");
      return;
    }

    const stockCount = parseInt(stock, 10) || 0;
    const thnTerbit = publicationDate.toISOString().split("T")[0];

    const formData = new FormData();
    formData.append("kategori", category);
    formData.append("thn_terbit", thnTerbit);
    formData.append("judul", title);
    formData.append("pengarang", author);
    formData.append("isbn", isbn || "");
    formData.append("stok", stockCount);
    formData.append("id", id);
    if (bookImage) {
      formData.append("book_poster", bookImage);
    }
    formData.append("status", "available");
    formData.append("jml_pinjam", parseInt(jmlPinjam, 10));

    try {
      await CreateBook(formData);
      toast.success("Book successfully added!");
      setTitle("");
      setAuthor("");
      setCategory("");
      setIsbn("");
      setPublicationDate(null);
      setStock("");
      setBookImage(null);
      setImagePreview(null);
      setIsFormDirty(false);
      fetchBooks();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add book. Please try again."
      );
      console.error("Error adding book:", error);
    }
  };

  const handleCancel = () => setShowConfirmDialog(false);

  const handleNavigate = (path) => {
    if (isFormDirty) {
      setNavigationTarget(path);
      setShowConfirmDialog(true);
    } else {
      navigate(path);
    }
  };

  const handleConfirmNavigate = () => {
    setShowConfirmDialog(false);
    navigate(navigationTarget);
  };

  const handleLogout = () => {
    if (isFormDirty) {
      setNavigationTarget("/login");
      setShowConfirmDialog(true);
    } else {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        const message =
          "You have unsaved changes, are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isFormDirty]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const navLinks = [
    { to: "/HomeAdmin", icon: "🏠", label: "Dashboard" },
    { to: "/BookAdmin", icon: "📚", label: "Books", active: true },
    { to: "/Returning", icon: "🔄", label: "Returning" },
  ];

  return (
    <div style={styles.dashboard}>
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
              onClick={(e) => {
                e.preventDefault();
                handleNavigate(link.to);
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
              onClick={(e) => {
                e.preventDefault();
                handleNavigate("/BookAdmin");
              }}
              onMouseEnter={() => setHoveredBack(true)}
              onMouseLeave={() => setHoveredBack(false)}
            >
              ←
            </Link>
            <div>
              <h1 style={styles.headerH1}>➕ Add New Book</h1>
              <p style={styles.headerP}>
                Fill in the details to add a new book to the library
              </p>
            </div>
          </div>
          <button
            style={{
              ...styles.btnSubmit,
              ...(hoveredSubmit && styles.btnSubmitHover),
            }}
            onClick={handleSubmit}
            onMouseEnter={() => setHoveredSubmit(true)}
            onMouseLeave={() => setHoveredSubmit(false)}
          >
            <span>💾</span>
            Add Book
          </button>
        </header>

        {/* Add Content */}
        <div style={styles.content}>
          {/* Image Upload Card */}
          <div style={styles.uploadCard}>
            <div style={styles.uploadSection}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Book Preview"
                  style={styles.imagePreview}
                />
              ) : (
                <div style={styles.uploadPlaceholder}>
                  <span style={styles.uploadIcon}>📚</span>
                  <h3 style={styles.uploadPlaceholderH3}>Book Cover</h3>
                  <p style={styles.uploadPlaceholderP}>
                    Upload an image for the book cover
                  </p>
                </div>
              )}
              <div style={styles.imageOverlay}>
                <button
                  style={styles.uploadImageBtn}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span>📷</span>
                  {imagePreview ? "Change Image" : "Upload Image"}
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

            <div style={styles.uploadInfo}>
              <h3 style={styles.uploadInfoH3}>📋 Image Guidelines</h3>
              <div style={styles.uploadTips}>
                <div style={styles.tipItem}>
                  <span style={styles.tipIcon}>✓</span>
                  <span>Recommended size: 400x600 pixels</span>
                </div>
                <div style={styles.tipItem}>
                  <span style={styles.tipIcon}>✓</span>
                  <span>Format: JPG, PNG, or WebP</span>
                </div>
                <div style={styles.tipItem}>
                  <span style={styles.tipIcon}>✓</span>
                  <span>Max file size: 5MB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div style={styles.formCard}>
            <div style={styles.formCardHeader}>
              <h2 style={styles.formCardH2}>📝 Book Information</h2>
              <p style={styles.formCardP}>Enter the details of the new book</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <div style={styles.formGrid}>
                {/* ID */}
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    <span style={styles.labelIcon}>🔢</span>Book ID
                  </label>
                  <input
                    type="text"
                    style={styles.formInput}
                    value={id || "Auto-generated"}
                    disabled
                  />
                </div>

                {/* Title */}
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    <span style={styles.labelIcon}>📖</span>Title
                    <span style={styles.requiredStar}>*</span>
                  </label>
                  <input
                    type="text"
                    style={{
                      ...styles.formInput,
                      ...(focusedInput === "title" && styles.formInputFocus),
                    }}
                    placeholder="Enter book title"
                    value={title}
                    onChange={(e) => handleInputChange(e, setTitle)}
                    onFocus={() => setFocusedInput("title")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>

                {/* Author */}
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    <span style={styles.labelIcon}>✍️</span>Author
                    <span style={styles.requiredStar}>*</span>
                  </label>
                  <input
                    type="text"
                    style={{
                      ...styles.formInput,
                      ...(focusedInput === "author" && styles.formInputFocus),
                    }}
                    placeholder="Enter author name"
                    value={author}
                    onChange={(e) => handleInputChange(e, setAuthor)}
                    onFocus={() => setFocusedInput("author")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>

                {/* Category */}
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    <span style={styles.labelIcon}>📂</span>Category
                    <span style={styles.requiredStar}>*</span>
                  </label>
                  <select
                    style={styles.formSelect}
                    value={category}
                    onChange={(e) => handleInputChange(e, setCategory)}
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
                    <span style={styles.labelIcon}>📋</span>ISBN
                    <span style={styles.requiredStar}>*</span>
                  </label>
                  <input
                    type="text"
                    style={{
                      ...styles.formInput,
                      ...(focusedInput === "isbn" && styles.formInputFocus),
                    }}
                    placeholder="Enter ISBN number"
                    value={isbn}
                    onChange={(e) => handleInputChange(e, setIsbn)}
                    onFocus={() => setFocusedInput("isbn")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>

                {/* Publication Date */}
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    <span style={styles.labelIcon}>📅</span>Publication Date
                    <span style={styles.requiredStar}>*</span>
                  </label>
                  <DatePicker
                    selected={publicationDate}
                    onChange={(date) => {
                      setPublicationDate(date);
                      setIsFormDirty(true);
                    }}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    placeholderText="Select a date"
                  />
                </div>

                {/* Stock */}
                <div style={{ ...styles.formGroup, ...styles.formGroupFull }}>
                  <label style={styles.formLabel}>
                    <span style={styles.labelIcon}>📦</span>Stock
                    <span style={styles.requiredStar}>*</span>
                  </label>
                  <input
                    type="number"
                    style={{
                      ...styles.formInput,
                      ...(focusedInput === "stock" && styles.formInputFocus),
                    }}
                    placeholder="Enter stock quantity"
                    value={stock}
                    onChange={(e) => handleInputChange(e, setStock)}
                    onFocus={() => setFocusedInput("stock")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>
              </div>
            </Form>
          </div>
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

      {/* Confirm Dialog */}
      {showConfirmDialog && (
        <div style={styles.confirmDialog}>
          <div style={styles.confirmDialogContent}>
            <div style={styles.dialogIcon}>⚠️</div>
            <p style={styles.dialogP}>
              You have unsaved changes. Are you sure you want to leave?
            </p>
            <div style={styles.buttonContainer}>
              <button style={styles.buttonCancel} onClick={handleCancel}>
                Stay Here
              </button>
              <button
                style={styles.buttonLeave}
                onClick={handleConfirmNavigate}
              >
                Leave Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBookAdmin;
