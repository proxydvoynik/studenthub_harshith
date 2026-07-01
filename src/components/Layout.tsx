import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t py-6 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} React Router App</p>
      </footer>
    </div>
  );
}
