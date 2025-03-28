import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeProvider';
import { Loader2 } from 'lucide-react';
import { authService } from '@/Services/auth';

export default function Login() {
  const { theme } = useTheme();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-editor-background' : 'bg-background'}`}>
      <div className="container mx-auto px-4 pt-24 pb-10 max-w-md">
        <div className={`p-8 rounded-xl shadow-lg ${
          theme === 'dark' 
            ? 'bg-code-background text-code-foreground' 
            : 'bg-card text-foreground'
        }`}>
          <h1 className="text-2xl font-bold mb-6 text-center">Welcome to CodeWays</h1>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-2 rounded-md border ${
                  theme === 'dark'
                    ? 'bg-code-foreground/10 border-editor-line text-white'
                    : 'bg-background border-input text-black'
                }`}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-4 py-2 rounded-md border ${
                  theme === 'dark'
                    ? 'bg-code-foreground/10 border-editor-line text-white'
                    : 'bg-background border-input text-black'
                }`}
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign In
            </Button>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm text-center mt-2">
                {error}
              </div>
            )}
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link
              to="/signup"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
