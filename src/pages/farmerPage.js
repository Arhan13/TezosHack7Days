import React, { useEffect, useState } from "react";

import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";
import { ThanosWallet } from "@thanos-wallet/dapp";

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
  const [wallet, setWallet] = useState(null);
  // const [toggler, setToggler] = useState(false);

  // useEffect(async () => {
  //   const tezos = new TezosToolkit("https://testnet-tezos.giganode.io");
  //   setTezos(tezos);
  //   // Tezos.setProvider({
  //   //   signer: await InMemorySigner.fromSecretKey(
  //   //     "edsk2rKA8YEExg9Zo2qNPiQnnYheF1DhqjLVmfKdxiFfu5GyGRZRnb"
  //   //   ),
  //   // });
  //   console.log(tezos);
  // }, []);

  useEffect(() => {
    ThanosWallet.isAvailable()
      .then(async () => {
        const WWallet = new ThanosWallet("Storage Example");
        console.log(WWallet);
        setWallet(WWallet);
        const TezosI = await wallet.toTezos();
        setTezos(TezosI);
        await wallet.connect("edo2net").then(() => {
          Tezos.setWalletProvider(wallet);
          console.log(`Your address: ${wallet.pkh}`);
        });
      })
      .catch((err) => console.log(err));
  });

  //Set Crop Available
  useEffect(() => {
    if (Tezos === undefined) {
      return;
    }
    Tezos.contract
      .at("KT1DTddm2dzkUVh17SzSrD2AZCUFf5SyxAMd")
      .then((contract) => contract.storage())
      .then((storage) => {
        setCropsAvail(storage.crops_available.toString());
      })
      .then(() => setLoader(false))
      .catch(console.error);
    const timer = setInterval(() => {
      Tezos.contract
        .at("KT1DTddm2dzkUVh17SzSrD2AZCUFf5SyxAMd")
        .then((contract) => contract.storage())
        .then((storage) => {
          setCropsAvail(storage.crops_available.toString());
        })
        .catch(console.error);
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, [Tezos]);

  //Set MSP
  useEffect(() => {
    if (Tezos === undefined) {
      return;
    }
    Tezos.contract
      .at("KT1DTddm2dzkUVh17SzSrD2AZCUFf5SyxAMd")
      .then((contract) => contract.storage())
      .then((storage) => {
        setMsp(storage.farmer_rate.toString());
      })
      .then(() => setLoader(false))
      .catch(console.error);
    const timer = setInterval(() => {
      Tezos.contract
        .at("KT1DTddm2dzkUVh17SzSrD2AZCUFf5SyxAMd")
        .then((contract) => contract.storage())
        .then((storage) => {
          setMsp(storage.farmer_rate.toString());
        })
        .catch(console.error);
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, [Tezos]);

  //Set Income
  useEffect(() => {
    if (Tezos === undefined) {
      return;
    }
    Tezos.contract
      .at("KT1DTddm2dzkUVh17SzSrD2AZCUFf5SyxAMd")
      .then((contract) => contract.storage())
      .then((storage) => {
        setIncome(storage.income.toString());
      })
      .then(() => setLoader(false))
      .catch(console.error);
    const timer = setInterval(() => {
      Tezos.contract
        .at("KT1DTddm2dzkUVh17SzSrD2AZCUFf5SyxAMd")
        .then((contract) => contract.storage())
        .then((storage) => {
          setIncome(storage.income.toString());
        })
        .catch(console.error);
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, [Tezos]);

  //Set Supplier Rate
  useEffect(() => {
    if (Tezos === undefined) {
      return;
    }
    Tezos.contract
      .at("KT1DTddm2dzkUVh17SzSrD2AZCUFf5SyxAMd")
      .then((contract) => contract.storage())
      .then((storage) => {
        setSupplierRate(storage.supplier_rate.toString());
      })
      .then(() => setLoader(false))
      .catch(console.error);
    const timer = setInterval(() => {
      Tezos.contract
        .at("KT1DTddm2dzkUVh17SzSrD2AZCUFf5SyxAMd")
        .then((contract) => contract.storage())
        .then((storage) => {
          setSupplierRate(storage.supplier_rate.toString());
        })
        .catch(console.error);
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, [Tezos]);

  //Set get request from supplier
  useEffect(() => {
    if (Tezos === undefined) {
      return;
    }
    Tezos.contract
      .at("KT1DTddm2dzkUVh17SzSrD2AZCUFf5SyxAMd")
      .then((contract) => contract.storage())
      .then((storage) => {
        setRequestFromSupplier(storage.request_from_supplier.toString());
      })
      .then(() => setLoader(false))
      .catch(console.error);
    const timer = setInterval(() => {
      Tezos.contract
        .at("KT1DTddm2dzkUVh17SzSrD2AZCUFf5SyxAMd")
        .then((contract) => contract.storage())
        .then((storage) => {
          setRequestFromSupplier(storage.request_from_supplier.toString());
        })
        .catch(console.error);
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, [Tezos]);

  // useEffect(() => {
  //   if (Tezos === undefined) return;
  //   getCropsAvailable(Tezos)
  //     .then(setCropsAvail)
  //     .then(() => setLoader(false))
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

  //Set get request from supplier
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

  const handleEvent = async (e, func, params) => {
    e.preventDefault();
    try {
      ThanosWallet.isAvailable()
        .then(() => {
          const WWallet = new ThanosWallet("Storage Example");
          setWallet(WWallet);
          wallet.connect("edo2net").then(() => {
            Tezos.setWalletProvider(wallet);
            console.log(`Your address: ${wallet.pkh}`);
          });
        })
        .catch((err) => console.log(err));

      setLoader(true);
      await func(Tezos, params, setStatus);
      // await getCropsAvailable(Tezos)
      //   .then(setCropsAvail)
      //   .then(() => setLoader(false));
      // await getMsp(Tezos)
      //   .then(setMsp)
      //   .then(() => setLoader(false));
      // await getIncome(Tezos)
      //   .then(setIncome)
      //   .then(() => setLoader(false));
      // await getSupplierRate(Tezos)
      //   .then(setSupplierRate)
      //   .then(() => setLoader(false));
      // await getRequestFromSupplier(Tezos)
      //   .then(setRequestFromSupplier)
      //   .then(() => setLoader(false));
    } catch (err) {
      console.error(err);
      alert("Couldn't connect wallet");
    }
  };

  const handleEventUpdateCropsAvail = async (
    e,
    update_crops_available,
    params
  ) => {
    e.preventDefault();
    try {
      // const avail = await ThanosWallet.isAvailable();
      // if (!avail) {
      //   throw new Error("Thanos Wallet is not installed");
      // }

      // const wallet = new ThanosWallet("Storage Example");
      // await wallet.connect("edo2net");
      // console.log(wallet);
      // const tezos = await wallet.toTezos();
      // console.log(tezos);
      // setTezos(tezos);

      // Tezos.setWalletProvider(wallet);

      ThanosWallet.isAvailable()
        .then(async () => {
          const WWallet = new ThanosWallet("Storage Example");
          console.log(WWallet);
          setWallet(WWallet);
          const TezosI = await wallet.toTezos();
          setTezos(TezosI);
          await wallet.connect("edo2net").then(() => {
            Tezos.setWalletProvider(wallet);
            console.log(`Your address: ${wallet.pkh}`);
          });
        })
        .catch((err) => console.log(err));

      // ThanosWallet.isAvailable()
      //   .then(() => {
      //     const wallet = new ThanosWallet("Storage Example");
      //     wallet.connect("edo2net").then(() => {
      //       Tezos.setWalletProvider(wallet);
      //       console.log(`Your address: ${wallet.pkh}`);
      //     });
      //   })
      //   .catch((err) => console.log(err));

      // await update_crops_available(Tezos, params, setStatus);
      console.log(Tezos);
      Tezos.contract
        .at("KT1DTddm2dzkUVh17SzSrD2AZCUFf5SyxAMd")
        .then((contract) => {
          return contract.methods
            .update_crops_available(
              params.cropAvailable,
              params.rateOfCrop,
              params.address
            )
            .send();
        })
        .then((op) => {
          return op.confirmation(3).then(() => op.hash);
        })
        .then((hash) =>
          console.log(`Operation injected: https://edo.tzstats.com/${hash}`)
        )
        .catch((error) =>
          console.log(`Error: ${JSON.stringify(error, null, 2)}`)
        );
      // const testContract = await Tezos.contract.at(
      //   "KT1DTddm2dzkUVh17SzSrD2AZCUFf5SyxAMd"
      // );
      // const operation = await testContract.methods
      //   .update_crops_available(
      //     params.cropAvailable,
      //     params.rateOfCrop,
      //     params.address
      //   )
      //   .send();
      // console.log(operation);
      // await operation.confirmation();
      setLoader(false);
      // await getCropsAvailable(Tezos)
      //   .then(setCropsAvail)
      //   .then(() => setLoader(false));
      // await getMsp(Tezos)
      //   .then(setMsp)
      //   .then(() => setLoader(false));
      // await getIncome(Tezos)
      //   .then(setIncome)
      //   .then(() => setLoader(false));
      // await getSupplierRate(Tezos)
      //   .then(setSupplierRate)
      //   .then(() => setLoader(false));
      // await getRequestFromSupplier(Tezos)
      //   .then(setRequestFromSupplier)
      //   .then(() => setLoader(false));
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
                await handleEventUpdateCropsAvail(e, update_crops_available, {
                  cropAvailable: e.target.cropAvailable.value,
                  rateOfCrop: e.target.rateOfCrop.value,
                  address: e.target.address.value,
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
