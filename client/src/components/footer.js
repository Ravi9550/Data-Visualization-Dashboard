import React from "react";

function Footer() {
  const footerStyle = {
    content: {
      textAlign: "center",
      color: "#ffffff",
      backgroundColor: "#000000",
      padding: "10px",
    },
    hr: { color: "#fff" },
  };
  return (
    <section>
      <hr style={footerStyle.hr} />
      <div style={footerStyle.content}>
        <span>© 2025 Report Management System :</span>
      </div>
    </section>
  );
}

export default Footer;
