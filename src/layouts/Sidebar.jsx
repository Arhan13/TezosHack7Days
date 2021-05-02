import React from "react";
import { Menu } from "antd";
import {
  UserSwitchOutlined,
  TeamOutlined,
  BankOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";

//import { useDispatch } from 'react-redux';

function Sidebar() {
  //const dispatch = useDispatch();

  //   const Logout = async () => {
  //     localStorage.removeItem("access-token");
  //     localStorage.removeItem("user-id");
  //     dispatch(logout());

  //   }
  let history = useHistory();

  return (
    <Router>
      <div className='sidebar'>
        <Menu theme='dark' mode='inline'>
          <Menu.Item
            key='/dashboard/expensetracker'
            icon={<AppstoreOutlined />}
            onClick={() => {
              history.push("/");
            }}
          >
            Welcome
          </Menu.Item>
          <Menu.Item
            key='/dashboard/home'
            icon={<BankOutlined />}
            onClick={() => {
              history.push("/farmer");
            }}
          >
            <Link to='/farmer'>Farmer</Link>
          </Menu.Item>

          <Menu.Item
            key='/dashboard/profile'
            icon={<UserSwitchOutlined />}
            onClick={() => {
              history.push("/supplier");
            }}
          >
            Supplier
          </Menu.Item>
          <Menu.Item
            key='/dashboard/personalfinance'
            icon={<TeamOutlined />}
            onClick={() => {
              history.push("/customer");
            }}
          >
            Customer
          </Menu.Item>
        </Menu>
      </div>
    </Router>
  );
}

export default Sidebar;
