import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import { SignIn } from "../../api/apiAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const navigate = useNavigate();

  const styles = {
    container: { minHeight: "100vh", display: "flex", flexDirection: "column" },
    mainContent: { display: "flex", flex: 1, minHeight: "100vh" },
    leftSection: {
      width: "50%",
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
    brand: { marginBottom: "20px" },
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
    },
    featureItemHover: {
      background: "rgba(255, 255, 255, 0.2)",
      transform: "translateX(8px)",
    },
    featureIcon: { fontSize: "1.3rem" },
    rightSection: {
      width: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      background: "linear-gradient(135deg, #f5f7fa 0%, #e8ecef 100%)",
    },
    card: {
      width: "100%",
      maxWidth: "400px",
      background: "white",
      padding: "40px 35px",
      borderRadius: "20px",
      boxShadow: "0 15px 50px rgba(0, 0, 0, 0.1)",
    },
    cardHeader: { textAlign: "center", marginBottom: "28px" },
    iconWrapper: {
      width: "65px",
      height: "65px",
      background: "linear-gradient(135deg, #ff7043, #ff5722)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 18px",
      color: "white",
      boxShadow: "0 8px 25px rgba(255, 87, 34, 0.4)",
    },
    title: {
      fontSize: "1.6rem",
      fontWeight: 700,
      color: "#1a237e",
      margin: "0 0 8px",
    },
    subtitle: { fontSize: "0.95rem", color: "#666", margin: 0 },
    form: { display: "flex", flexDirection: "column", gap: "20px" },
    inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
    label: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "0.9rem",
      fontWeight: 600,
      color: "#333",
    },
    inputIcon: { fontSize: "1rem" },
    input: {
      width: "100%",
      padding: "14px 18px",
      fontSize: "1rem",
      border: "2px solid #e0e0e0",
      borderRadius: "12px",
      background: "#f8f9fa",
      transition: "all 0.3s",
      boxSizing: "border-box",
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      width: "100%",
      padding: "14px",
      fontSize: "1.05rem",
      fontWeight: 600,
      color: "white",
      background: "linear-gradient(135deg, #ff7043, #ff5722)",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.3s",
      boxShadow: "0 6px 20px rgba(255, 87, 34, 0.35)",
      marginTop: "8px",
    },
    divider: { display: "flex", alignItems: "center", margin: "20px 0" },
    dividerLine: {
      flex: 1,
      height: "1px",
      background: "linear-gradient(to right, transparent, #ddd, transparent)",
    },
    dividerText: {
      padding: "0 15px",
      color: "#999",
      fontSize: "0.85rem",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    registerLink: {
      textAlign: "center",
      fontSize: "0.95rem",
      color: "#666",
      margin: 0,
    },
    registerLinkA: {
      color: "#1a237e",
      fontWeight: 600,
      textDecoration: "none",
      transition: "color 0.3s",
    },
  };

  useEffect(() => {
    const tokenFromSS = sessionStorage.getItem("token"); // Gunakan kunci "token"
    setToken(tokenFromSS);
    if (tokenFromSS) {
      navigate("/HomePage");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await SignIn({ email, password });

      // Ambil token dari respons
      const token = response.token;
      if (!token) {
        throw new Error("Token is not present in the API response.");
      }

      // Login sukses, tampilkan toast
      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 500,
      });

      console.log("Token saved:", token);

      setTimeout(() => {
        // Navigasi berdasarkan role user
        if (response.user.role === "admin") {
          navigate("/HomeAdmin");
        } else {
          navigate("/HomePage");
        }
      }, 2000);
    } catch (error) {
      // Tampilkan toast error jika login gagal
      toast.error("Invalid credentials. Please try again!", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Login error:", error);
    }
  };

  return (
    !token && (
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
              <circle
                cx="200"
                cy="80"
                r="40"
                fill="#3949ab"
                fillOpacity="0.12"
              />
              <circle
                cx="80"
                cy="220"
                r="30"
                fill="#ff7043"
                fillOpacity="0.15"
              />
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
              <circle
                cx="220"
                cy="90"
                r="35"
                fill="#ff7043"
                fillOpacity="0.13"
              />
              <circle
                cx="90"
                cy="220"
                r="40"
                fill="#3949ab"
                fillOpacity="0.09"
              />
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
              <p style={styles.brandTagline}>
                Discover a world of knowledge at your fingertips
              </p>
              <div style={styles.features}>
                {[
                  { icon: "📚", text: "10,000+ Books Collection" },
                  { icon: "🔍", text: "Easy Search & Browse" },
                  { icon: "⏰", text: "24/7 Digital Access" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.featureItem,
                      ...(hoveredFeature === index
                        ? styles.featureItemHover
                        : {}),
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

          {/* Right Side - Login Form */}
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
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 style={styles.title}>Welcome Back!</h2>
                <p style={styles.subtitle}>
                  Sign in to access your library account
                </p>
              </div>

              <form onSubmit={handleLogin} style={styles.form}>
                <div style={styles.inputGroup}>
                  <label htmlFor="email" style={styles.label}>
                    <span style={styles.inputIcon}>📧</span>
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label htmlFor="password" style={styles.label}>
                    <span style={styles.inputIcon}>🔒</span>
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                  />
                </div>

                <button type="submit" style={styles.button}>
                  <span>Sign In</span>
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
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>

              <div style={styles.divider}>
                <div style={styles.dividerLine}></div>
                <span style={styles.dividerText}>or</span>
                <div style={styles.dividerLine}></div>
              </div>

              <p style={styles.registerLink}>
                Don&apos;t have an account?{" "}
                <Link to="/register" style={styles.registerLinkA}>
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    )
  );
};

export default Login;
