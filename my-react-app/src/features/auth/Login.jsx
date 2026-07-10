import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { loginWithGoogle, loginWithGithub } = useAuth();
  const navigate = useNavigate();

  async function handleGoogleLogin() {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  }

  async function handleGithubLogin() {
    try {
      await loginWithGithub();
      navigate("/");
    } catch (error) {
      console.error("GitHub login failed:", error);
    }
  }

  return (
    <div className="login-page">
      <h2>Sign in</h2>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
      <button onClick={handleGithubLogin}>Sign in with GitHub</button>
    </div>
  );
}

export default Login;