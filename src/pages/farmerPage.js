import React, { useEffect, useState } from "react";

import { LikeOutlined } from "@ant-design/icons";
import { Row, Col, Statistic } from "antd";
import Layout from "antd/lib/layout/layout";
import { Header } from "antd/lib/layout/layout";

import DashboardLayout from "../layouts/DashBoardLayout";

//CSS
//import "../style.css";

//Functions

import { connectWallet, setup } from "../library/farmerConnect";
import {
  transfer_crops_to_supplier,
  update_crops_available,
  getIncome,
  getMsp,
  getCropsAvailable,
  getSupplierRate,
  getRequestFromSupplier,
} from "../library/farmerInteract";

const FarmerPage = () => {
  const [Tezos, setTezos] = useState(undefined);
  const [status, setStatus] = useState("No Operations Performed");
  const [loader, setLoader] = useState(true);

  const [cropsAvail, setCropsAvail] = useState("");
  const [msp, setMsp] = useState("");
  const [income, setIncome] = useState("");
  const [supplierRate, setSupplierRate] = useState("");
  const [requestFromSupplier, setRequestFromSupplier] = useState("");
  // const [toggler, setToggler] = useState(false);

  useEffect(() => {
    console.log("run");
    setup().then(setTezos).catch(console.error);
  }, []);

  // //Set Crop Available
  // useEffect(() => {
  //   if (Tezos === undefined) return;
  //   getCropsAvailable(Tezos)
  //     .then(setCropsAvail)
  //     .then(() => {
  //       setLoader(false);
  //     })
  //     .catch(console.error);
  //   const timer = setInterval(() => {
  //     getCropsAvailable(Tezos).then(setCropsAvail).catch(console.error);
  //   }, 60000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [Tezos]);

  // //Set MSP
  // useEffect(() => {
  //   if (Tezos === undefined) return;
  //   getMsp(Tezos)
  //     .then(setMsp)
  //     .then(() => {
  //       setLoader(false);
  //     })
  //     .catch(console.error);
  //   const timer = setInterval(() => {
  //     getMsp(Tezos).then(setMsp).catch(console.error);
  //   }, 60000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [Tezos]);

  // //Set get income
  // useEffect(() => {
  //   if (Tezos === undefined) return;
  //   getIncome(Tezos)
  //     .then(setIncome)
  //     .then(() => {
  //       setLoader(false);
  //     })
  //     .catch(console.error);
  //   const timer = setInterval(() => {
  //     getIncome(Tezos).then(setIncome).catch(console.error);
  //   }, 60000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [Tezos]);

  // //Set get supplier rate
  // useEffect(() => {
  //   if (Tezos === undefined) return;
  //   getSupplierRate(Tezos)
  //     .then(setSupplierRate)
  //     .then(() => {
  //       setLoader(false);
  //     })
  //     .catch(console.error);
  //   const timer = setInterval(() => {
  //     getSupplierRate(Tezos).then(setSupplierRate).catch(console.error);
  //   }, 60000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [Tezos]);

  // //Set get request from supplier
  // useEffect(() => {
  //   if (Tezos === undefined) return;
  //   getRequestFromSupplier(Tezos)
  //     .then(setRequestFromSupplier)
  //     .then(() => {
  //       setLoader(false);
  //     })
  //     .catch(console.error);
  //   const timer = setInterval(() => {
  //     getRequestFromSupplier(Tezos)
  //       .then(setRequestFromSupplier)
  //       .catch(console.error);
  //   }, 60000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [Tezos]);

  // useEffect(() => {
  //   effect;
  //   return () => {
  //     cleanup;
  //   };
  // }, [input]);

  // useEffect(() => {
  //   if (Tezos === undefined) return;
  //   getValue(Tezos)
  //     .then(setValue)
  //     .then(() => setLoader(false))
  //     .catch(console.error);
  //   const timer = setInterval(() => {
  //     getValue(Tezos).then(setValue).catch(console.error);
  //   }, 60000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [Tezos]);

  const handleEvent = async (e, func, params) => {
    e.preventDefault();
    try {
      const wal = await connectWallet();
      Tezos.setWalletProvider(wal);
      setLoader(true);
      await func(Tezos, params, setStatus);
      // await getValue(Tezos)
      //   .then(setValue)
      //   .then(() => setLoader(false));
      await getCropsAvailable(Tezos)
        .then(setCropsAvail)
        .then(() => setLoader(false));
      await getMsp(Tezos)
        .then(setMsp)
        .then(() => setLoader(false));
      await getIncome(Tezos)
        .then(setIncome)
        .then(() => setLoader(false));
      await getSupplierRate(Tezos)
        .then(setSupplierRate)
        .then(() => setLoader(false));
      await getRequestFromSupplier(Tezos)
        .then(setRequestFromSupplier)
        .then(() => setLoader(false));
    } catch (err) {
      console.error(err);
      alert("Couldn't connect wallet");
    }
  };

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
            <div style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
              {cropsAvail}
            </div>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Income</div>
            <div style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
              {income}
            </div>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>MSP</div>
            <div style={{ fontWeight: "bold", fontSize: "1.3rem" }}>{msp}</div>
          </Col>
        </Row>

        <Row style={{ background: "transparent" }}>
          <Col
            span={12}
            style={{
              backgroundColor: "transparent",
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <form
              onSubmit={async (e) => {
                await handleEvent(e, update_crops_available, {
                  address: e.target.address.value,
                  cropAvailable: e.target.cropAvailable.value,
                  rateOfCrop: e.target.rateOfCrop.value,
                });
              }}
              style={{
                textAlign: "center",
                background: "rgba( 43, 75, 255, 0.50 )",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 10.0px )",
                WebkitBackdropFilter: "blur( 10.0px )",
                borderRadius: "1rem",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
                width: "90%",
                display: "inline-block",
                padding: "1%",
                minHeight: "23.5vh",
              }}
            >
              <div>
                <input
                  type='string'
                  name='address'
                  step='1'
                  placeholder='Hash Address of the supplier'
                  style={{
                    background: "rgba( 255, 255, 255, 0.25 )",
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backdropFilter: "blur( 4px )",
                    WebkitBackdropFilter: "blur( 4px )",
                    borderRadius: "2rem",
                    border: "1px solid rgba( 255, 255, 255, 0.18 )",
                    width: "70%",
                    marginTop: "1%",
                    fontSize: "1.3rem",
                    textDecoration: "none",
                    padding: ".9%",
                    textAlign: "center",
                  }}
                />
              </div>
              <div>
                <input
                  type='number'
                  name='cropAvailable'
                  step='1'
                  placeholder='Units of Crops available with farmer'
                  style={{
                    background: "rgba( 255, 255, 255, 0.25 )",
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backdropFilter: "blur( 4px )",
                    WebkitBackdropFilter: "blur( 4px )",
                    borderRadius: "2rem",
                    border: "1px solid rgba( 255, 255, 255, 0.18 )",
                    width: "70%",
                    marginTop: "1%",
                    fontSize: "1.3rem",
                    textDecoration: "none",
                    padding: ".7%",
                    textAlign: "center",
                  }}
                />
              </div>
              <div>
                <input
                  type='number'
                  name='rateOfCrop'
                  step='1'
                  placeholder='Rate specified by the farmer'
                  style={{
                    background: "rgba( 255, 255, 255, 0.25 )",
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backdropFilter: "blur( 4px )",
                    WebkitBackdropFilter: "blur( 4px )",
                    borderRadius: "2rem",
                    border: "1px solid rgba( 255, 255, 255, 0.18 )",
                    width: "70%",
                    marginTop: "1%",
                    fontSize: "1.3rem",
                    textDecoration: "none",
                    padding: ".7%",
                    textAlign: "center",
                  }}
                />
              </div>
              <div>
                <input
                  type='submit'
                  className='submitBtn'
                  value='Update crop available'
                  style={{
                    background: "rgba( 255, 255, 255, 0.25 )",
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backdropFilter: "blur( 4px )",
                    WebkitBackdropFilter: "blur( 4px )",
                    borderRadius: "2rem",
                    border: "1px solid rgba( 255, 255, 255, 0.18 )",
                    width: "30%",
                    marginTop: "2%",
                    fontSize: "1.3rem",
                    textDecoration: "none",
                    padding: ".2%",
                    color: "lightgray",
                  }}
                />
              </div>
            </form>
          </Col>

          <Col
            span={12}
            style={{
              backgroundColor: "transparent",
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <form
              onSubmit={async (e) => {
                await handleEvent(e, transfer_crops_to_supplier, {
                  address: e.target.address.value,
                  amtOfCrop: e.target.reqCrop.value,
                });
              }}
              style={{
                textAlign: "center",
                background: "rgba( 43, 75, 255, 0.50 )",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 10.0px )",
                WebkitBackdropFilter: "blur( 10.0px )",
                borderRadius: "1rem",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
                width: "90%",
                display: "inline-block",
                padding: "1%",
                minHeight: "23.5vh",
              }}
            >
              <div>
                <input
                  type='string'
                  name='address'
                  step='1'
                  placeholder='Hash Address of the supplier'
                  style={{
                    background: "rgba( 255, 255, 255, 0.25 )",
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backdropFilter: "blur( 4px )",
                    WebkitBackdropFilter: "blur( 4px )",
                    borderRadius: "2rem",
                    border: "1px solid rgba( 255, 255, 255, 0.18 )",
                    width: "70%",
                    marginTop: "1%",
                    fontSize: "1.3rem",
                    textDecoration: "none",
                    padding: ".9%",
                    textAlign: "center",
                  }}
                />
              </div>

              <div>
                <input
                  type='number'
                  name='reqCrop'
                  step='1'
                  placeholder='Units of crops to be sent'
                  style={{
                    background: "rgba( 255, 255, 255, 0.25 )",
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backdropFilter: "blur( 4px )",
                    WebkitBackdropFilter: "blur( 4px )",
                    borderRadius: "2rem",
                    border: "1px solid rgba( 255, 255, 255, 0.18 )",
                    width: "70%",
                    marginTop: "1%",
                    fontSize: "1.3rem",
                    textDecoration: "none",
                    padding: ".9%",
                    textAlign: "center",
                  }}
                />
              </div>
              <div>
                <input
                  type='submit'
                  className='submitBtn'
                  value='Transfer crop to supplier'
                  style={{
                    background: "rgba( 255, 255, 255, 0.25 )",
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backdropFilter: "blur( 4px )",
                    WebkitBackdropFilter: "blur( 4px )",
                    borderRadius: "2rem",
                    border: "1px solid rgba( 255, 255, 255, 0.18 )",
                    width: "35%",
                    marginTop: "2%",
                    fontSize: "1.3rem",
                    textDecoration: "none",
                    padding: ".2%",
                    color: "lightgray",
                  }}
                />
              </div>
            </form>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "5vh", minHeight: "10vh", textAlign: "center" }}
        >
          <Col span={12} style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              Suppliers Rate
            </div>
            <div style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
              {supplierRate}
            </div>
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              Request from supplier
            </div>
            <div style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
              {requestFromSupplier}
            </div>
          </Col>
        </Row>
      </Layout>
    </DashboardLayout>
  );
};

const Loader = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      style={{
        display: "block",
      }}
      width='3vw'
      height='3vw'
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
    >
      <circle
        cx='50'
        cy='50'
        fill='none'
        stroke='#cc085a'
        strokeWidth='10'
        r='35'
        strokeDasharray='164.93361431346415 56.97787143782138'
      >
        <animateTransform
          attributeName='transform'
          type='rotate'
          repeatCount='indefinite'
          dur='1s'
          values='0 50 50;360 50 50'
          keyTimes='0;1'
        ></animateTransform>
      </circle>
    </svg>
  );
};

export default FarmerPage;
