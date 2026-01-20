import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  BarChart3, 
  BarChart2, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  FileQuestionIcon,
  Image
} from "lucide-react";

const Sidebar = () => {
  // Mobile menu state
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Desktop collapse state
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved === null ? true : saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", isOpen);
  }, [isOpen]);

  const baseClass = "flex items-center gap-3 px-4 py-2 rounded-sm transition-all";

  // Helper to close mobile menu when a link is clicked
  const handleNavLinkClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* MOBILE HAMBURGER BUTTON - Visible only on small screens */}
      <div className="md:hidden flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-999">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
        >
          <Menu size={24} />
        </button>
        <span className="ml-4 font-semibold text-gray-800">AI Tools</span>
      </div>

      {/* MOBILE OVERLAY/BACKDROP */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          /* Positioning */
          fixed inset-y-0 left-0 z-50 md:sticky md:top-0 
          /* Sizing */
          h-screen md:h-[calc(100vh-64px)]
          ${isOpen ? "w-64" : "w-20"} 
          /* Mobile specific transition */
          transform ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform duration-300 ease-in-out md:transition-all
          /* Styling */
          border-r border-gray-200 bg-white py-4 px-2 flex flex-col
        `}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between mb-6 px-2">
          {(isOpen || isMobileOpen) && (
            <h2 className="text-sm font-semibold text-gray-800">AI Tools</h2>
          )}

          {/* Close button for mobile OR Collapse button for desktop */}
          <button
            onClick={() => isMobileOpen ? setIsMobileOpen(false) : setIsOpen((p) => !p)}
            className="p-2 rounded-sm hover:bg-gray-100"
          >
            <div className="md:hidden">
                <X size={20} /> {/* Show X on mobile */}
            </div>
            <div className="hidden md:block">
                {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </div>
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col space-y-2">
          <NavItem to="/" icon={<LayoutDashboard size={18} />} label="Community" isOpen={isOpen} isMobileOpen={isMobileOpen} onClick={handleNavLinkClick} baseClass={baseClass} />
          <NavItem to="/create-post" icon={<Image size={18} />} label="Create Image" isOpen={isOpen} isMobileOpen={isMobileOpen} onClick={handleNavLinkClick} baseClass={baseClass} />
          <NavItem to="/askmeanything" icon={<FileQuestionIcon size={18} />} label="Ask Me Anything" isOpen={isOpen} isMobileOpen={isMobileOpen} onClick={handleNavLinkClick} baseClass={baseClass} />
          <NavItem to="/summarize" icon={<BarChart3 size={18} />} label="Summarizer" isOpen={isOpen} isMobileOpen={isMobileOpen} onClick={handleNavLinkClick} baseClass={baseClass} />
          <NavItem to="/pdf-analyzer" icon={<BarChart2 size={18} />} label="Pdf Analyzer" isOpen={isOpen} isMobileOpen={isMobileOpen} onClick={handleNavLinkClick} baseClass={baseClass} />
          
        </nav>
      </aside>
    </>
  );
};

// Reusable NavItem component to keep code clean
const NavItem = ({ to, icon, label, isOpen, isMobileOpen, onClick, baseClass }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `${baseClass} ${
        isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
      }`
    }
  >
    {icon}
    {(isOpen || isMobileOpen) && <span className="whitespace-nowrap">{label}</span>}
  </NavLink>
);

export default Sidebar;