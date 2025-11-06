import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authslice";
import { 
  Briefcase, 
  CircleHelp, 
  MapPin, 
  User, 
  Search, 
  ShoppingCart,
  Menu,
  X,
  ChevronDown
} from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Location */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div 
              className="flex items-center gap-2 cursor-pointer hover:text-orange-500 transition-colors"
              onClick={() => navigate("/home")}
            >
              <div className="text-orange-500 font-bold text-xl sm:text-2xl">
                🍽️ Swiggy
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-gray-700 cursor-pointer hover:text-orange-500 transition-colors border-b-2 border-transparent hover:border-orange-500 pb-1">
              <MapPin size={18} />
              <span className="font-semibold text-sm">Other</span>
              <ChevronDown size={16} />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors font-medium text-sm lg:text-base">
              <Briefcase size={18} />
              <span className="hidden lg:inline">Corporate</span>
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors font-medium text-sm lg:text-base">
              <Search size={18} />
              <span className="hidden lg:inline">Search</span>
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors font-medium text-sm lg:text-base">
              <CircleHelp size={18} />
              <span className="hidden lg:inline">Help</span>
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors font-medium text-sm lg:text-base">
              <User size={18} />
              <span className="hidden lg:inline">Sign In</span>
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors font-medium text-sm lg:text-base relative">
              <ShoppingCart size={18} />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                0
              </span>
              <span className="hidden lg:inline">Cart</span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95 text-sm lg:text-base"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-orange-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4 bg-white">
            <button className="flex items-center gap-3 text-gray-700 hover:text-orange-500 transition-colors font-medium w-full py-2">
              <Briefcase size={20} />
              <span>Swiggy Corporate</span>
            </button>
            <button className="flex items-center gap-3 text-gray-700 hover:text-orange-500 transition-colors font-medium w-full py-2">
              <Search size={20} />
              <span>Search</span>
            </button>
            <button className="flex items-center gap-3 text-gray-700 hover:text-orange-500 transition-colors font-medium w-full py-2">
              <CircleHelp size={20} />
              <span>Help</span>
            </button>
            <button className="flex items-center gap-3 text-gray-700 hover:text-orange-500 transition-colors font-medium w-full py-2">
              <User size={20} />
              <span>Sign In</span>
            </button>
            <button className="flex items-center gap-3 text-gray-700 hover:text-orange-500 transition-colors font-medium w-full py-2 relative">
              <ShoppingCart size={20} />
              <span>Cart (0)</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 mt-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
