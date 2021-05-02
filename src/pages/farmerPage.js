import { LikeOutlined } from "@ant-design/icons";
import { Row, Col, Statistic } from "antd";
import Layout from "antd/lib/layout/layout";
import { Header } from "antd/lib/layout/layout";
import React from "react";
import DashboardLayout from "../layouts/DashBoardLayout";

export default function farmerPage() {
  return (
    <DashboardLayout>
      <Layout className='dashboard-layout'>
        <Header
          className=''
          style={{
            padding: 0,
            backgroundColor: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          <h1>Farmer Section</h1>
        </Header>
        <Row
          style={{ marginTop: "5vh", minHeight: "10vh", textAlign: "center" }}
        >
          <Col span={8} style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              Stocks Left
            </div>
            <div style={{ fontWeight: "bold", fontSize: "1.3rem" }}>1000</div>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Income</div>
            <div style={{ fontWeight: "bold", fontSize: "1.3rem" }}>1000</div>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>MSP</div>
            <div style={{ fontWeight: "bold", fontSize: "1.3rem" }}>1000</div>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ backgroundColor: "grey" }}>
            col-12
          </Col>
          <Col span={12} style={{ backgroundColor: "grey" }}>
            col-12
          </Col>
        </Row>
        <h1>I am Farmer Page</h1>
      </Layout>
    </DashboardLayout>
  );
}
