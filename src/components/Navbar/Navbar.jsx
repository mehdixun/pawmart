import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FaPaw } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navLinks = (
    <>
      <li><NavLink to="/" className="hover:text-primary">Home</NavLink></li>
      <li><NavLink to="/pets-and-supplies" className="hover:text-primary">Pets & Supplies</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/add-listing" className="hover:text-primary">Add Listing</NavLink></li>
          <li><NavLink to="/my-listings" className="hover:text-primary">My Listings</NavLink></li>
          <li><NavLink to="/my-orders" className="hover:text-primary">My Orders</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar container mx-auto">
        {/* Left: Logo + Name */}
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <FaPaw className="text-primary text-2xl" />
            <span className="text-gray-800">PawMart</span>
          </Link>
        </div>

        {/* Middle: Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium">
            {navLinks}
          </ul>
        </div>

        {/* Right: Auth Buttons or Profile */}
        <div className="flex-none">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border border-primary">
                  <img src={user.photoURL || "https://i.ibb.co/0Jmshvb/user.png"} alt="profile" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                <li className="text-center font-semibold">{user.displayName || "User"}</li>
                <li><button onClick={logout} className="text-error">Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
            {!user && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
