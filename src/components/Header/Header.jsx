import { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import userImg from "../../assets/images/avatar-icon.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { useUser } from "../../UserContext.jsx";
import { logOutUser } from "../../firebase";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Hospital",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
  {
    path: "/pricing",
    display: "Buy Premium",
  },
];

const Header = () => {
  const { user } = useUser();

  const [isDarkModeToggle, setIsDarkModeToggle] = useState(false);

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  function loginBtn() {
    return (
      <Link to="/login">
        <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
          Login
        </button>
      </Link>
    );
  }
  function userDropDown() {
    return (
      <Menu
        allowHover
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <MenuHandler className="w-[50px] h-[50px] rounded-full cursor-pointer">
          <img
            src={user?.photoURL || "https://avatar.vercel.sh/test"}
            className="w-full rounded-full"
            alt="user"
          />
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={logOutUser}>Logout</MenuItem>
        </MenuList>
      </Menu>
    );
  }
  function toggleDarkMode() {
    return (
      <div
        onClick={() => setIsDarkModeToggle(!isDarkModeToggle)}
        className={`flex w-16 h-8 bg-gray-300 rounded-[50px] cursor-pointer`}
      >
        <span
          className={`w-8 h-8 rounded-[50px] bg-primaryColor dark:bg-primaryColorDark border-solid border-4 border-gray-300 transition-all duration-500 ${
            isDarkModeToggle ? "ml-8" : ""
          }`}
        ></span>
      </div>
    );
  }

  useEffect(() => {
    const userPrefersMode = window.matchMedia("(prefers-color-scheme:dark)");
    setIsDarkModeToggle(userPrefersMode.matches);
    console.log(isDarkModeToggle);
  }, []);

  useEffect(() => {
    if (isDarkModeToggle === true) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkModeToggle, setIsDarkModeToggle]);

  return (
    <header
      className="header flex items-center bg-generalBackgroundColor"
      ref={headerRef}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo  */}
          <div>
            <img src={logo} alt="" />
          </div>

          {/* menu  */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* nav right  */}
          <div className="flex items-center gap-4">
            <div className="hidden">
              <Link to="/">
                <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                  <img src={userImg} className="w-full rounded-full" alt="" />
                </figure>
              </Link>
            </div>
            {user === null ? loginBtn() : userDropDown()}
            {toggleDarkMode()}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

// npm run dev
