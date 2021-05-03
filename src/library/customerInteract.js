import * as config from "./customerConfig.json";

// request_crops_from_supplier
//Variables : stock= 0,mrp=0
export const request_crops_from_supplier = (
  Tezos,
  { rateOfCrop, address, amtOfCrop },
  setStatus
) => {
  Tezos.wallet
    .at(config.contractAddr)
    .then((contract) => {
      return contract.methods
        .request_crops_from_supplier(rateOfCrop, address, amtOfCrop)
        .send();
    })
    .then((op) => {
      setStatus(`Awaiting for transaction to be confirmed.....`);
      return op.confirmation(1).then(() => op.hash);
    })
    .then((hash) => {
      setStatus(
        `Operation injected: <a target="#" href="https://edo2net.tzkt.io/${hash}">Check Here</a>`
      );
    });
};

export const getStock = (Tezos) => {
  Tezos.wallet
    .at(config.contractAddr)
    .then((contract) => {
      contract.storage();
    })
    .then((storage) => {
      return storage.stock.toString();
    });
};

export const getMrp = (Tezos) => {
  Tezos.wallet
    .at(config.contractAddr)
    .then((contract) => {
      contract.storage();
    })
    .then((storage) => {
      return storage.mrp.toString();
    });
};
