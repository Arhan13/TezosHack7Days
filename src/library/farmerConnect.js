import { TezosToolkit } from "@taquito/taquito";
import { ThanosWallet } from "@thanos-wallet/dapp";
import * as config from "./farmerConfig.json";

export const setup = async () => {
  console.log("I am here at EDO");
  //const Tezos = new TezosToolkit("https://edonet.smartpy.io");
  const Tezos = new TezosToolkit(config.rpc);
  console.log(Tezos);
  return Tezos;
};

export const connectWallet = async () => {
  const available = await ThanosWallet.isAvailable();
  if (!available) {
    throw new Error("Thanos Wallet is not installed");
  }
  const wallet = new ThanosWallet(config.name);
  await wallet.connect(config.network);

  return wallet;
};
