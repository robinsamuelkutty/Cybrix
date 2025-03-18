import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Particles from "../components/Particles";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
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

            <div className="relative flex flex-col justify-center items-center bg-base-100 text-base-content rounded-2xl shadow-lg w-full md:w-[900px] h-auto md:h-[500px] overflow-hidden z-10 p-8 max-w-lg">
                

                <h2 className="text-3xl font-bold text-center mb-3" style={{ fontFamily: 'Product Sans, sans-serif' }}>
                    Welcome Back
                </h2>
                <p className="text-primary text-center mb-5" style={{ fontFamily: 'Product Sans, sans-serif' }}>
                    Sign in 
                </p>

                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <div className="mb-5">
                        <label className="block text-secondary font-semibold">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full p-3 rounded-lg border border-primary bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                            style={{ fontFamily: 'Product Sans, sans-serif' }}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-secondary font-semibold">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full p-3 rounded-lg border border-primary bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                                style={{ fontFamily: 'Product Sans, sans-serif' }}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-base-content/40" />
                                ) : (
                                    <Eye className="h-5 w-5 text-base-content/40" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition"
                        style={{ fontFamily: 'Product Sans, sans-serif' }}
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? (
                            <div className="flex justify-center items-center">
                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                Loading...
                            </div>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                <p className="text-sm text-primary text-center mt-5" style={{ fontFamily: 'Product Sans, sans-serif' }}>
                    New here? <Link to="/signup" className="text-secondary font-semibold hover:underline">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
