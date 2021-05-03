import * as config from "./farmerConfig.json";

//update_crops_available, transfer_crops_to_supplier

export const update_crops_available = (
  Tezos,
  { cropAvailable, rateOfCrop, address },
  setStatus
) => {
  Tezos.wallet
    .at(config.contractAddr)
    .then((contract) => {
      return contract.methods
        .update_crops_available(cropAvailable, rateOfCrop, address)
        .send();
    })
    .then((op) => {
      setStatus(`Awaiting for the transaction to be confirmed.....`);
      return op.confirmation(1).then(() => op.hash);
    })
    .then((hash) => {
      setStatus(
        `Operation injected: <a target="#" href="https://edo2net.tzkt.io/${hash}">Check Here</a>`
      );
    });
};

export const transfer_crops_to_supplier = (
  Tezos,
  { address, amtOfCrop },
  setStatus
) => {
  Tezos.wallet
    .at(config.contractAddr)
    .then((contract) => {
      return contract.methods
        .transfer_crops_to_supplier(address, amtOfCrop)
        .send();
    })
    .then((op) => {
      setStatus(`Awaiting for the transaction to be confirmed.....`);
      return op.confirmation(1).then(() => op.hash);
    })
    .then((hash) => {
      setStatus(
        `Operation injected: <a target="#" href="https://edo2net.tzkt.io/${hash}">Check Here</a>`
      );
    });
};

export const getCropsAvailable = (Tezos) => {
  Tezos.wallet
    .at(config.contractAddr)
    .then((contract) => {
      contract.storage();
    })
    .then((storage) => {
      return storage.crops_available.toSting();
    });
};

export const getSupplierRate = (Tezos) => {
  Tezos.wallet
    .at(config.contractAddr)
    .then((contract) => {
      contract.storage();
    })
    .then((storage) => {
      return storage.supplier_rate.toSting();
    });
};

export const getIncome = (Tezos) => {
  Tezos.wallet
    .at(config.contractAddr)
    .then((contract) => {
      contract.storage();
    })
    .then((storage) => {
      return storage.income.toSting();
    });
};

export const getRequestFromSupplier = (Tezos) => {
  Tezos.wallet
    .at(config.contractAddr)
    .then((contract) => {
      contract.storage();
    })
    .then((storage) => {
      return storage.request_from_supplier.toSting();
    });
};

export const getMsp = (Tezos) => {
  Tezos.wallet
    .at(config.contractAddr)
    .then((contract) => {
      contract.storage();
    })
    .then((storage) => {
      return storage.farmer_rate.toSting();
    });
};
