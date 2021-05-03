import { TezosToolkit } from "@taquito/taquito";
import { ThanosWallet } from "@thanos-wallet/dapp";
import * as config from "./customerConfig.json";

export const setup = async () => {
  const Tezos = new TezosToolkit("https://edonet.smartpy.io");
  return Tezos;
};

export const connectWallet = async () => {
  const available = await ThanosWallet.isAvailable();
  if (!available) {
    throw new Error("Thanos Wallet is not installed");
  }
  console.log(config.name);
  const wallet = new ThanosWallet(config.name);
  await wallet.connect("edo2net");
  return wallet;
};
