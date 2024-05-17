import React from "react";
import { Navbar, TextInput, Button, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import logout from "./utils/axios_requests/auth/logout";

export default function Header() {
  const { currentUser, accessToken } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const path = useLocation().pathname;

  const handleLogout = () => {
    logout(dispatch, accessToken);
  };

  return (
    <Navbar className="border-b-2">
      <Logo />
      <form>
        <TextInput
          type="text"
          placeholder="Find your ideal job"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={currentUser.avatar} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signup">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign in
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {currentUser && !currentUser.company ? (
          <Navbar.Link active={path == "/cvs"} as="div">
            <Link to="/cvs">CVs</Link>
          </Navbar.Link>
        ) : (
          <Navbar.Link active={path == "/company"} as="div">
            <Link to="/company">Company</Link>
          </Navbar.Link>
        )}
        {/* // <Navbar.Link active={path === "/about"} as="div">
        //   <Link to="/about">About</Link>
        // </Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
