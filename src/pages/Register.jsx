import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider.jsx";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must have a lowercase letter.";
    if (!/\d/.test(password)) return "Password must have a number.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validatePassword(formData.password);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const userCredential = await createUser(formData.email, formData.password);

      await updateProfile(userCredential.user, {
        displayName: formData.name,
        photoURL: formData.photo || "https://i.ibb.co/Fx2g3mD/user.png",
      });

      toast.success("✅ Registration successful!");
      setFormData({ name: "", email: "", password: "", photo: "" });
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Try again!");
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success("✅ Registered with Google!");
        navigate("/");
        console.log(result.user);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google sign-in failed.");
      });
  };

  return (
    <div className="card mt-10 mb-20 w-full max-w-sm mx-auto bg-base-100 shadow-2xl">
      <Toaster position="top-center" />
      <div className="card-body">
        <h2 className="text-2xl font-bold text-indigo-600 text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="Optional"
              className="input input-bordered w-full"
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-indigo-500 text-white hover:bg-indigo-700 transition hover:scale-105"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 font-bold hover:underline">
            Sign in
          </Link>
        </p>

        <button
          onClick={handleGoogleSignIn}
          className="btn w-full mt-4 bg-white text-black border border-gray-300 flex items-center justify-center gap-2 hover:scale-105 transition"
        >
          <svg
            aria-label="Google logo"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="M0 0H512V512H0z" fill="#fff" />
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
            </g>
          </svg>
          Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
