import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeProvider';
import { CheckCircle2, Chrome, Loader2 } from 'lucide-react';
import { authService } from '@/Services/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const { theme } = useTheme();
  const [name, setName] = React.useState('');
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
      await authService.register({ name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-editor-background' : 'bg-background'}`}>
      <div className="container mx-auto px-4 pt-24 pb-20 max-w-md">
        <div className={`p-8 rounded-xl shadow-lg ${
          theme === 'dark' 
            ? 'bg-code-background text-code-foreground' 
            : 'bg-card text-foreground'
        }`}>
          <h1 className="text-2xl font-bold mb-8 text-center">Create Account</h1>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-2 rounded-md border peer ${
                    theme === 'dark'
                      ? 'bg-code-foreground/10 border-editor-line'
                      : 'bg-background border-input'
                  }`}
                  placeholder=" "
                />
                <label className="absolute left-4 top-2.5 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm">
                  Username
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <div className="relative">
                <input
                  type="email"
                  className={`w-full px-4 py-2 rounded-md border peer ${
                    theme === 'dark'
                      ? 'bg-code-foreground/10 border-editor-line'
                      : 'bg-background border-input'
                  }`}
                  placeholder=" "
                  pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                />
                <label className="absolute left-4 top-2.5 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm">
                  Email
                </label>
                <CheckCircle2 className="h-5 w-5 text-green-500 absolute right-4 top-3.5 opacity-0 peer-valid:opacity-100 transition-opacity" />
              </div>
              <span className="text-xs text-muted-foreground">Must be a valid email address</span>
            </div>

            <div className="space-y-1">
              <div className="relative">
                <input
                  type="password"
                  className={`w-full px-4 py-2 rounded-md border peer ${
                    theme === 'dark'
                      ? 'bg-code-foreground/10 border-editor-line'
                      : 'bg-background border-input'
                  }`}
                  placeholder=" "
                  minLength={8}
                />
                <label className="absolute left-4 top-2.5 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm">
                  Password
                </label>
              </div>
              <span className="text-xs text-muted-foreground">Minimum 8 characters</span>
            </div>

            <Button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              disabled={loading}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Create Account
            </Button>
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-card text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full gap-2">
            <Chrome className="h-4 w-4" />
            Google
          </Button>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}