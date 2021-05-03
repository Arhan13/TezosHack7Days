import React, { useState } from "react";
import { Layout } from "antd";
import PropTypes from "prop-types";

import Sidebar from "./Sidebar";
import Logo from "../assets/FINITY LOGO white (2).png";

const { Sider, Content, Footer } = Layout;

function DashboardLayout(props) {
  const { children } = props;
  //const [collapsed, setCollapsed] = useState(true);
  const [year] = useState(new Date().getFullYear());

  // function toggle() {
  //   setCollapsed(!collapsed);
  // }

  return (
    <Layout>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={(broken) => {
          //console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          //console.log(collapsed, type);
        }}
      >
        <img src={Logo} alt='fintysoft' className='logo' />
        <Sidebar />
      </Sider>
      <Layout className='dashboard-layout'>
        <Content
          className='dashboard-layout-content'
          style={{
            background: "#396afc" /* fallback for old browsers */,
            background:
              " -webkit-linear-gradient(to right, #2948ff, #396afc)" /* Chrome 10-25, Safari 5.1-6 */,
            background:
              "linear-gradient(to right, #2948ff, #396afc)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
          }}
        >
          {children}
        </Content>
        <Footer className='dashboard-layout-footer'>
          <b>Farm Management</b> &copy; {year} A &nbsp;
          <a href='#srm'>Tezos Club Srm</a> product.
        </Footer>
      </Layout>
    </Layout>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default DashboardLayout;
