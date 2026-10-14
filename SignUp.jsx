import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection, query, where, getDocs, addDoc, serverTimestamp,
} from "firebase/firestore";
import bcrypt from "bcryptjs";
import { db } from "../firebase";
import { signUpSchema, toFieldErrors } from "../validation";

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // 1. Validate
    const result = signUpSchema.safeParse(form);
    if (!result.success) {
      setErrors(toFieldErrors(result.error));
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const email = form.email.trim().toLowerCase();

      // 2. Make sure the email isn't already registered
      const existing = await getDocs(
        query(collection(db, "users"), where("email", "==", email))
      );
      if (!existing.empty) {
        setFormError("An account with this email already exists. Try logging in.");
        return;
      }

      // 3. Hash the password - never store plain text
      const hashedPassword = await bcrypt.hash(form.password, 10);

      // 4. Save to Firestore
      await addDoc(collection(db, "users"), {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email,
        password: hashedPassword,
        createdAt: serverTimestamp(),
      });

      // 5. Go to login
      navigate("/login");
    } catch (err) {
      console.error(err);
      setFormError("Something went wrong creating your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const input = (label, name, type = "text") => (
    <div className="field">
      <label htmlFor={name}>{label}*</label>
      <input id={name} name={name} type={type}
        value={form[name]} onChange={handleChange} />
      {errors[name] && <span className="field-error">{errors[name]}</span>}
    </div>
  );

  return (
    <section className="auth-page">
      <div className="auth-card wide">
        <h1 className="auth-title">Create a DEV@Deakin Account</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="name-row">
            {input("First name", "firstName")}
            {input("Last name", "lastName")}
          </div>
          {input("Email", "email", "email")}
          {input("Password", "password", "password")}
          {input("Confirm password", "confirmPassword", "password")}

          {formError && <p className="form-error">{formError}</p>}

          <button className="primary-button full" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
