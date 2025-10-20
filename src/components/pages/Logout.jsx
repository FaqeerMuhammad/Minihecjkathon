
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.css"; // optional

export default function Logout() {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button className={styles.button} onClick={handleLogout}>
      Logout
    </button>
  );
}
