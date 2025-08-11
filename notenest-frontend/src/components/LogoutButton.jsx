export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        padding: "8px 15px",
        borderRadius: 5,
        cursor: "pointer",
        border: "none",
        backgroundColor: "#e74c3c",
        color: "white",
        fontWeight: "600",
        zIndex: 1100,
      }}
    >
      Logout
    </button>
  );
}
