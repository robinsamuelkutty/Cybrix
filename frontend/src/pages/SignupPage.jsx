import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, MessageSquareQuote } from "lucide-react";
import { Link } from "react-router-dom";
import Particles from "../components/Particles";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) signup(formData);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-base-200">
      <Particles
        primaryColor="var(--p)"
        secondaryColor="var(--s)"
        particleCount={600}
        particleSpread={10}
        speed={0.1}
        moveParticlesOnHover={true}
        particleHoverFactor={2}
        alphaParticles={false}
        particleBaseSize={100}
        sizeRandomness={2}
        cameraDistance={20}
        disableRotation={false}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="relative flex flex-col bg-base-100 text-base-content rounded-2xl shadow-lg w-full max-w-lg p-8 z-10">
        

        <h2 className="text-3xl font-bold text-center mb-3">Create Account</h2>
        <p className="text-primary text-center mb-5">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-secondary font-semibold mb-2">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-3 rounded-lg border border-primary bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-secondary font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg border border-primary bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-secondary font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full p-3 rounded-lg border border-primary bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-base-content/40" /> : <Eye className="h-5 w-5 text-base-content/40" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <div className="flex justify-center items-center">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-sm text-primary text-center mt-5">
          Already have an account? <Link to="/login" className="text-secondary font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
