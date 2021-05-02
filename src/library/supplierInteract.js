import * as config from "./supplierConfig.json";

//crop_request_to_farmers
//transfer_to_customer

export const crop_request_to_farmers = (
  Tezos,
  { rateOfCrop, address, amtOfCrop },
  setStatus
) => {
  Tezos.wallet
    .at(config.contractAddr)
    .then((contract) => {
      return contract.methods
        .crop_request_to_farmers(rateOfCrop, address, amtOfCrop)
        .send();
    })
    .then((op) => {
      setStatus(`Awaiting for the transaction to be confirmed.....`);
      return op.confirmation(1).then(() => {
        op.opHash;
      });
    })
    .then((hash) => {
      setStatus(
        `Operation injected: <a target="#" href="https://edo2net.tzkt.io/${hash}">Check Here</a>`
      );
    });
};

export const transfer_to_customer = (
  Tezos,
  { address, amtOfCrop },
  setStatus
) => {
  Tezos.wallet
    .at(config.contractAddr)
    .then((contract) => {
      return contract.methods.transfer_to_customer(address, amtOfCrop).send();
    })
    .then((op) => {
      setStatus(`Awaiting for the transaction to be confirmed.....`);
      return op.confirmation(1).then(() => {
        op.opHash;
      });
    })
    .then((hash) => {
      setStatus(
        `Operation injected: <a target="#" href="https://edo2net.tzkt.io/${hash}">Check Here</a>`
      );
    });
};

//cropsAvail, customerRate, income, msp, mrp
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

export const getCustomerRate = (Tezos) => {
  Tezos.wallet
    .at(config.contractAddr)
    .then((contract) => {
      contract.storage();
    })
    .then((storage) => {
      return storage.customer_rate.toSting();
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

export const getMrp = (Tezos) => {
  Tezos.wallet
    .at(config.contractAddr)
    .then((contract) => {
      contract.storage();
    })
    .then((storage) => {
      return storage.mrp.toSting();
    });
};

export const getMsp = (Tezos) => {
  Tezos.wallet
    .at(config.contractAddr)
    .then((contract) => {
      contract.storage();
    })
    .then((storage) => {
      return storage.farmers_rate.toSting();
    });
};
