import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Sign in</Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleGoogleLogin}>
            Sign in with Google
          </Button>
          <Button variant="outlined" onClick={handleGithubLogin}>
            Sign in with GitHub
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
export default Login;