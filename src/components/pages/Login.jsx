import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("uid", response.user.uid);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("No account found. Please sign up first.");
        navigate("/");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email address.");
      } else {
        alert("Error: " + error.message);
      }
      console.error(error);
    }
  };

  return (
    <Form className={styles.container} onSubmit={handleLogin}>
      <h1 className={styles.title}>Login</h1>

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
        Login
      </Button>

      <p className={styles.linkText}>
        Don’t have an account? <Link to="/">Sign Up</Link>
      </p>
    </Form>
  );
};

export default Login;
