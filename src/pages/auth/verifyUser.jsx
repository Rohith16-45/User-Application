import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { emailVerify } from "../../services/authService";

export default function VerifyEmail() {
  const { userId, token } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("verifyEmail");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleVerify = () => {
    setLoading(true);

    emailVerify(userId, token)
      .then(() => {
        localStorage.removeItem("verifyEmail");
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 w-full max-w-md rounded-2xl shadow-xl border relative">
        <div className="absolute inset-0 rounded-2xl p-0.5 bg-linear-to-r from-purple-500 to-indigo-600 -z-10"></div>

        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Verify Your Email
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-200 text-gray-700 cursor-not-allowed"
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={loading || !userId || !token}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              loading || !userId || !token
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </div>
      </div>
    </div>
  );
}
