import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authslice";
import { Briefcase, CircleHelp, House, User, Search, ShoppingCartIcon } from "lucide-react";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); 
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center gap-2">
        <House />
        <span className="font-bold">Other</span>
      </div>
      
      {/*Nav item */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center">
            <Briefcase size={20} className="mr-1"/>
            <span>Swiggy corporate</span>
        </div>
        <div className="flex items-center">
            <Search size={20} className="mr-1"/>
            <span>Search</span>
        </div>
        <div className="flex items-center">
            <CircleHelp size={20} className="mr-1"/>
            <span>Help</span>
        </div>
        <div className="flex items-center">
            <User size={20} className="mr-1"/>
            <span>Sign in</span>
        </div>
        <div className="flex items-center"> {/* ✅ fixed class */}
            <div className="relative">
                <ShoppingCartIcon size={20}/>
                <span className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full w-5 h-5 flex items-center justify-center text-sm font-bold">0</span>
                <span className="ml-1">1</span>
            </div>
        </div>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
