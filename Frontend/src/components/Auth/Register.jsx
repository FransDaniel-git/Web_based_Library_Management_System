import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { SignUp } from "../../api/apiAuth";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  mainContent: {
    display: "flex",
    flex: 1,
    minHeight: "100vh",
  },
  leftSection: {
    width: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)",
    position: "relative",
    overflow: "hidden",
  },
  leftContent: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "40px",
    color: "white",
  },
  brand: {
    marginBottom: "20px",
  },
  brandLogo: {
    width: "90px",
    height: "90px",
    marginBottom: "10px",
    marginTop: "10px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
  },
  brandTitle: {
    fontSize: "2.2rem",
    fontWeight: 700,
    margin: 0,
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    letterSpacing: "1px",
  },
  brandTagline: {
    fontSize: "1.05rem",
    opacity: 0.9,
    fontStyle: "italic",
    marginBottom: "35px",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    maxWidth: "320px",
    margin: "0 auto",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "12px 24px",
    background: "rgba(255, 255, 255, 0.12)",
    borderRadius: "30px",
    fontSize: "0.95rem",
    fontWeight: 500,
    transition: "all 0.3s",
    backdropFilter: "blur(5px)",
    cursor: "default",
  },
  featureIcon: {
    fontSize: "1.3rem",
  },
  rightSection: {
    width: "55%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 40px",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e8ecef 100%)",
  },
  card: {
    width: "100%",
    maxWidth: "450px",
    background: "white",
    padding: "35px",
    borderRadius: "20px",
    boxShadow: "0 15px 50px rgba(0, 0, 0, 0.1)",
  },
  cardHeader: {
    textAlign: "center",
    marginBottom: "25px",
  },
  iconWrapper: {
    width: "60px",
    height: "60px",
    background: "linear-gradient(135deg, #ff7043, #ff5722)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 15px",
    color: "white",
    boxShadow: "0 8px 25px rgba(255, 87, 34, 0.4)",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#1a237e",
    margin: "0 0 6px",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#666",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#333",
  },
  inputIcon: {
    fontSize: "0.9rem",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "0.95rem",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
    background: "#f8f9fa",
    transition: "all 0.3s",
    outline: "none",
    boxSizing: "border-box",
  },
  inputFocus: {
    borderColor: "#ff7043",
    background: "white",
    boxShadow: "0 0 0 3px rgba(255, 112, 67, 0.12)",
  },
  errorText: {
    color: "#e53935",
    fontSize: "0.8rem",
    margin: "2px 0 0",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    padding: "13px",
    fontSize: "1rem",
    fontWeight: 600,
    color: "white",
    background: "linear-gradient(135deg, #ff7043, #ff5722)",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s",
    boxShadow: "0 6px 20px rgba(255, 87, 34, 0.35)",
    marginTop: "5px",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "18px 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "linear-gradient(to right, transparent, #ddd, transparent)",
  },
  dividerText: {
    padding: "0 15px",
    color: "#999",
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  loginLink: {
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#666",
    margin: 0,
  },
  loginLinkA: {
    color: "#1a237e",
    fontWeight: 600,
    textDecoration: "none",
    transition: "color 0.3s",
  },
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    no_telp: "",
    email: "",
    password: "",
    role: "anggota",
  });

  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.no_telp) newErrors.no_telp = "Phone number is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await SignUp(formData);
      toast.success("Account created successfully! Redirecting...", {
        position: "top-right",
        autoClose: 500,
      });

      console.log(response);

      setTimeout(() => {
        window.location.href = "/login";
      }, 500);

      setFormData({
        name: "",
        address: "",
        no_telp: "",
        email: "",
        password: "",
        role: "anggota",
      });
      setErrors({});
    } catch (error) {
      toast.error(error.message || "Registration failed. Try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Registration error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        {/* Left Side - Decorative Section */}
        <div style={styles.leftSection}>
          {/* Motif SVG Top Left - Elegant Circles */}
          <svg
            style={{ position: "absolute", top: -50, left: -50, zIndex: 1 }}
            width="300"
            height="300"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="150"
              cy="150"
              r="140"
              fill="url(#blueGradient)"
              fillOpacity="0.15"
            />
            <circle cx="100" cy="100" r="60" fill="#fff" fillOpacity="0.08" />
            <circle cx="200" cy="80" r="40" fill="#3949ab" fillOpacity="0.12" />
            <circle cx="80" cy="220" r="30" fill="#ff7043" fillOpacity="0.15" />
            <circle cx="250" cy="250" r="25" fill="#fff" fillOpacity="0.06" />
            <defs>
              <linearGradient
                id="blueGradient"
                x1="0"
                y1="0"
                x2="300"
                y2="300"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1a237e" />
                <stop offset="1" stopColor="#5c6bc0" />
              </linearGradient>
            </defs>
          </svg>
          {/* Motif SVG Bottom Right - Gradient Orbs */}
          <svg
            style={{
              position: "absolute",
              bottom: -60,
              right: -60,
              zIndex: 1,
            }}
            width="280"
            height="280"
            viewBox="0 0 280 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="140"
              cy="140"
              r="110"
              fill="url(#orangeGradient)"
              fillOpacity="0.12"
            />
            <circle
              cx="200"
              cy="200"
              r="60"
              fill="#ff5722"
              fillOpacity="0.10"
            />
            <circle cx="80" cy="80" r="45" fill="#fff" fillOpacity="0.07" />
            <circle cx="220" cy="90" r="35" fill="#ff7043" fillOpacity="0.13" />
            <circle cx="90" cy="220" r="40" fill="#3949ab" fillOpacity="0.09" />
            <defs>
              <linearGradient
                id="orangeGradient"
                x1="0"
                y1="0"
                x2="280"
                y2="280"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ff7043" />
                <stop offset="1" stopColor="#ff5722" />
              </linearGradient>
            </defs>
          </svg>
          <div style={styles.leftContent}>
            <div style={styles.brand}>
              <img
                src="/src/assets/images/logo-image.png"
                alt="Atma Library"
                style={styles.brandLogo}
              />
              <h1 style={styles.brandTitle}>Atma Library</h1>
            </div>
            <p style={styles.brandTagline}>Join our community of book lovers</p>
            <div style={styles.features}>
              {[
                { icon: "📚", text: "Access 10,000+ Books" },
                { icon: "🎯", text: "Personalized Recommendations" },
                { icon: "⭐", text: "Exclusive Member Benefits" },
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.featureItem,
                    ...(hoveredFeature === index && {
                      background: "rgba(255, 255, 255, 0.2)",
                      transform: "translateX(8px)",
                    }),
                  }}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <span style={styles.featureIcon}>{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div style={styles.rightSection}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.iconWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <line x1="19" y1="8" x2="19" y2="14"></line>
                  <line x1="22" y1="11" x2="16" y2="11"></line>
                </svg>
              </div>
              <h2 style={styles.title}>Create Account</h2>
              <p style={styles.subtitle}>Fill in your details to get started</p>
            </div>

            <form onSubmit={handleRegister} style={styles.form}>
              <div style={styles.inputGroup}>
                <label htmlFor="name" style={styles.label}>
                  <span style={styles.inputIcon}>👤</span>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(focusedField === "name" && styles.inputFocus),
                  }}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.name && <p style={styles.errorText}>{errors.name}</p>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="address" style={styles.label}>
                  <span style={styles.inputIcon}>🏠</span>
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(focusedField === "address" && styles.inputFocus),
                  }}
                  onFocus={() => setFocusedField("address")}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.address && (
                  <p style={styles.errorText}>{errors.address}</p>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="no_telp" style={styles.label}>
                  <span style={styles.inputIcon}>📱</span>
                  Phone Number
                </label>
                <input
                  type="text"
                  id="no_telp"
                  name="no_telp"
                  placeholder="Enter your phone number"
                  value={formData.no_telp}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(focusedField === "no_telp" && styles.inputFocus),
                  }}
                  onFocus={() => setFocusedField("no_telp")}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.no_telp && (
                  <p style={styles.errorText}>{errors.no_telp}</p>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.label}>
                  <span style={styles.inputIcon}>📧</span>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(focusedField === "email" && styles.inputFocus),
                  }}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.email && <p style={styles.errorText}>{errors.email}</p>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="password" style={styles.label}>
                  <span style={styles.inputIcon}>🔒</span>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(focusedField === "password" && styles.inputFocus),
                  }}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                {errors.password && (
                  <p style={styles.errorText}>{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                style={{
                  ...styles.button,
                  ...(isButtonHovered && {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(255, 87, 34, 0.45)",
                  }),
                }}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
              >
                <span>Create Account</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transition: "transform 0.3s",
                    transform: isButtonHovered ? "translateX(5px)" : "none",
                  }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>

            <div style={styles.divider}>
              <span style={styles.dividerLine}></span>
              <span style={styles.dividerText}>or</span>
              <span style={styles.dividerLine}></span>
            </div>

            <p style={styles.loginLink}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  ...styles.loginLinkA,
                  ...(isLinkHovered && { color: "#ff7043" }),
                }}
                onMouseEnter={() => setIsLinkHovered(true)}
                onMouseLeave={() => setIsLinkHovered(false)}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;
