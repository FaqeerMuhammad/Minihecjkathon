import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("uid", response.user.uid);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already exists. Please log in instead.");
        navigate("/login");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email address. Please try again.");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters long.");
      } else {
        alert("Error: " + error.message);
      }
      console.error(error);
    }
  };

  return (
    <Form className={styles.container} onSubmit={handleSignup}>
      <h1 className={styles.title}>Create Account</h1>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button className={styles.btnPrimary} type="submit">
        Sign Up
      </Button>

      <p className={styles.linkText}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </Form>
  );
};

export default Signup;
