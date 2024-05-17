import { Sidebar } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { HiArrowSmRight, HiBriefcase, HiDocumentText, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import logout from "../utils/axios_requests/auth/logout";
import { useDispatch, useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              as="div"
              active={tab == "profile"}
              icon={HiUser}
              label={
                currentUser.company
                  ? "Employee"
                  : currentUser.isAdmin
                  ? "Admin"
                  : "User"
              }
              labelColor="dark"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.company && (
            <Link to="/dashboard?tab=company">
              <Sidebar.Item
                active={tab == "company"}
                icon={HiBriefcase}
                as="div"
              >
                Company
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            onClick={handleLogout}
            icon={HiArrowSmRight}
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
