import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { db } from "../firebase";
import { loginSchema, toFieldErrors } from "../validation";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const result = loginSchema.safeParse(form);
    if (!result.success) {
      setErrors(toFieldErrors(result.error));
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const email = form.email.trim().toLowerCase();
      const snap = await getDocs(
        query(collection(db, "users"), where("email", "==", email))
      );

      const invalid =
        "Incorrect email or password. Try again, or sign up for a free account.";

      if (snap.empty) {
        setFormError(invalid);
        return;
      }

      const user = snap.docs[0].data();
      const match = await bcrypt.compare(form.password, user.password);

      if (!match) {
        setFormError(invalid);
        return;
      }

      // Correct details -> go to the home page
      navigate("/");
    } catch (err) {
      console.error(err);
      setFormError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <Link to="/signup" className="signup-tab">Sign up</Link>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Your email</label>
            <input id="email" name="email" type="email"
              value={form.email} onChange={handleChange} />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="field">
            <label htmlFor="password">Your password</label>
            <input id="password" name="password" type="password"
              value={form.password} onChange={handleChange} />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          {formError && <p className="form-error">{formError}</p>}

          <button className="primary-button full" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
