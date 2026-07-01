import { Link, useLocation } from 'react-router-dom';
import { Home, Info } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-blue-600 font-semibold" : "text-slate-600 hover:text-blue-500";
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span className="bg-blue-600 text-white p-1.5 rounded-lg">
            <Home size={20} />
          </span>
          My App
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/" className={`flex items-center gap-1.5 transition-colors ${isActive('/')}`}>
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link to="/about" className={`flex items-center gap-1.5 transition-colors ${isActive('/about')}`}>
            <Info size={18} />
            <span>About</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
