import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";
import api from "../../../../utils/api";
import { LOGOUT } from "../../../../redux/actions/types";

const Submenu = ({ items, isOpen }) => (
  <ul className={`submenu ${isOpen ? "open" : ""}`}>
    {items.map((item, index) => (
      <li key={index}>
        {item.title}
        {item.submenus && <Submenu items={item.submenus} isOpen={isOpen} />}
      </li>
    ))}
  </ul>
);

const MenuItem = ({
  title,
  submenus,
  path,
  activeMenuItem,
  setActiveMenuItem,
  externalPath,
  unread,
  closeMenu
}) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPath === path) {
      setActiveMenuItem(title);
      return;
    }
  }, [currentPath]);

  const toggleSubmenu = () => {
    if (submenus.length !== 0) {
      setShowSubmenu(!showSubmenu);
    }

    if (path) {
      setActiveMenuItem(title);
      // if (closeMenu) {
        // closeMenu();  // Check if closeMenu is provided
      // }
      navigate(path);
    }
    if (externalPath) {
      window.open(externalPath, '_blank');
    }
  };

  return (
    <li className="menu-item" style={{ position: "relative" }}>
      <span
        className={`title_submenu ${activeMenuItem === title ? "active" : ""}`}
        onClick={toggleSubmenu}
      >
        {title}{" "}
        {submenus.length > 0 && (
          <i
            className={`fas fa-chevron-down`}
            style={{ transform: `${showSubmenu ? "scaleY(-1)" : ""}` }}
          ></i>
        )}
      </span>
      {showSubmenu && submenus && (
        <div className="submenu-container">
          <ul>
            {submenus.length > 0 &&
              submenus.map((submenu, index) => (
                <MenuItem
                  key={index}
                  setActiveMenuItem={setActiveMenuItem}
                  activeMenuItem={activeMenuItem}
                  title={submenu.title}
                  path={submenu.path}
                  submenus={submenu.submenus}
                  closeMenu={closeMenu}
                />
              ))}
          </ul>
        </div>
      )}
      {title === "Messages" && unread > 0 ? (
        <p style={{ position: "absolute", top: "50%", right: "20px", transform: "translateY(-50%)", backgroundColor: "red", padding: "2px 8px", borderRadius: "5px" }}>
          {`${unread}`}
        </p>
      ) : null}
    </li>
  );
};

const Sidebar = ({ unread, closeMenu }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState(user);
  console.log(user);
  

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  const menuItems = [
    {
      title: "Home",
      submenus: [],
      path: "/home",
    },
    {
      title: "My Interactions",
      submenus: [
        {
          title: "Friends",
          submenus: [
            { title: "My Friends", submenus: [], path: "/my_friends" },
            { title: "Sent", submenus: [], path: "/sent_request" },
            { title: "Received", submenus: [], path: "/recieved_request" },
          ],
        },
        // {
        //   title: "Hot List",
        //   submenus: [
        //     { title: "Sent", submenus: [], path: "/sent_superlike" },
        //     { title: "Received", submenus: [], path: "/recieved_superlike" },
        //   ],
        // },
        // {
        //   title: "Gifts/Tips",
        //   submenus: [
        //     { title: "Sent", submenus: [] },
        //     { title: "Received", submenus: [] },
        //   ],
        // },
      ],
    },
    {
      title: "Live Chat",
      submenus: [],
      path: "/live-chat"
    },
    {
      title: "Messages",
      submenus: [],
      path: "/messaging"
    },
    {
      title: "Search",
      submenus: [
        { title: "Search Users", submenus: [], path: "/allusers" },
        { title: "Advanced Search", submenus: [], path: "/advanced-search" },
        {
          title: "Who Viewed Me",
          submenus: [],
          path: "/visited-users"
        },
        { title: "New Members", submenus: [], path: "/recentuser" },
        { title: "Near Members", submenus: [], path: "/nearusers" },
        { title: "Who Is On", submenus: [], path: "/onlineusers" },
      ],
    },
    {
      title: "Actions",
      submenus: [
        { title: "Events", submenus: [], path: "/event-page" },
        { title: "My Events", submenus: [], path: "/my-event" },
        { title: "Clubs", submenus: [], path: "/club-page" },
        // {
        //   title: "Live Action",
        //   submenus: [
        //     { title: "Member Webcam", submenus: [] },
        //     { title: "Model Webcam", submenus: [] },
        //   ],
        // },
      ],
    },
    {
      title: "FAQ",
      submenus: [
        { title: "Know Your Kinky FAQ!", submenus: [], path: "/faq" },
      ],
    },
    {
      title: "Shop",
      submenus: [],
    },
    {
      title: "Situationship",
      submenus: [],
      path: "/travel-page",
    },
    { title: "Membership", submenus: [], path: "/membership" },
    {
      title: "Setting",
      submenus: [
        { title: "My Profile", submenus: [], path: "/user-detail" },
        // { title: "My Posts", submenus: [] },
        { title: "Edit Profile", submenus: [], path: userInfo?.profile_type === "couple" ? "/editcouple-detail" : "/edit-detail" },
        { title: "My Media", submenus: [], path: "/my-media" },
        { title: "Account", submenus: [], path: "/myaccount" },
        // {
        //   title: "My Points",
        //   submenus: [{ title: "Top up points", submenus: [] }],
        // },
        { title: "About", submenus: [], path: "/about" },
        { title: "Blocked", submenus: [], path: "/blocked_users" }
      ],
    },
  ];

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogout = async () => {
    await api.post(`/logout/${userInfo?._id}`).then((res) => {
      dispatch({ type: LOGOUT }).then(() => {
        navigate("/login");
      });
    }).catch((err) => console.log(err))
  };

  return (
    <div className="sidebar xl:w-60" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <div>
        <Link to={'/user-detail'} style={{width: '230px', height: '230px', display: 'block'}}>
          {userInfo?.profile_type === "couple" ?
            <img src={userInfo?.image ? userInfo?.image : "images/couple-avatar.jpg"} />
            :
            <img
              src={userInfo?.image ? userInfo?.image : userInfo?.gender === "male" ? "/images/boy-avatar.jpg" : userInfo?.gender === "female" ? "/images/girl-avatar.jpg" : "/images/trans avatar.png"}
              className="hidden aspect-square object-cover xl:block"
            />
          }
        </Link>
        <div className="pt-0 pb-8 xl:py-4">
          <Link to={'/user-detail'}>
            <h3 className="font-semibold text-22px mb-3 ">{userInfo.username}</h3> 
          </Link>
          <p className="flex items-center justify-between gap-4 mb-3 hover:text-orange font-body_font text-lg">
            {userInfo?.location ? `${userInfo?.location?.city}, ${userInfo?.location?.state}` : "Country name"}
            <Link className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
              >
                <mask
                  id="mask0_47_207"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="18"
                  height="19"
                >
                  <path d="M0 0.5H18V18.5H0V0.5Z" fill="white" />
                </mask>
                <g mask="url(#mask0_47_207)">
                  <path
                    d="M9 17.9727C6.89063 14.8086 3.19922 10.5195 3.19922 6.82812C3.19922 3.62957 5.80145 1.02734 9 1.02734C12.1986 1.02734 14.8008 3.62957 14.8008 6.82812C14.8008 10.5195 11.1094 14.8086 9 17.9727Z"
                    stroke="white"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 9.46484C7.54618 9.46484 6.36328 8.28194 6.36328 6.82812C6.36328 5.37431 7.54618 4.19141 9 4.19141C10.4538 4.19141 11.6367 5.37431 11.6367 6.82812C11.6367 8.28194 10.4538 9.46484 9 9.46484Z"
                    stroke="white"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </Link>
          </p>
        </div>
      </div>
        <nav className="menu">
          <ul className="gap_lists">
            {menuItems.map((menuItem, index) => (
              <MenuItem
                key={index}
                setActiveMenuItem={setActiveMenuItem}
                activeMenuItem={activeMenuItem}
                title={menuItem.title}
                path={menuItem.path}
                submenus={menuItem.submenus}
                externalPath={menuItem.externalPath ? menuItem.externalPath : null}
                unread={unread}
                closeMenu={closeMenu} // Pass closeMenu correctly here
              />
            ))}
            <li>
              <button
                className="menu-item primary_btn logout_btn !p-3 !flex !justify-start !text-sm sm:!text-base w-full"
                onClick={handlelogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
    </div>
  );
};

export default Sidebar;
