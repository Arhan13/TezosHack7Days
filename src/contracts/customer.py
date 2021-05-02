import smartpy as sp

class Storage(sp.Contract):
    def __init__(self):
        self.init(stock= 0,mrp=0)
    
    @sp.entry_point
    def get_suppliers_mrp(self, params):
        self.data.mrp = params._mrp
        
    @sp.entry_point
    def request_crops_from_supplier(self, params):
        supplier_contract = sp.contract(sp.TIntOrNat, address = params.address, entry_point="customer_Requirement").open_some()
        supplier_contract_two = sp.contract(sp.TIntOrNat, address = params.address, entry_point="customer_rate_check").open_some()
        sp.if params._rate<=self.data.mrp:
            sp.transfer(arg=params.quantity, amount=sp.tez(0), destination = supplier_contract)
            sp.transfer(arg=params._rate,amount=sp.tez(0),destination=supplier_contract_two)

    @sp.entry_point
    def process_request(self, params):
        self.data.stock += params.quantity
        self.data.mrp=0
        
@sp.add_test(name="Storage Example")
def test():
    alice = sp.test_account("Alice")
    c1 = Storage()
    scenario = sp.test_scenario()
    scenario.h1("Storage")
    scenario += c1
    scenario += c1.get_suppliers_mrp(_mrp=2)
    scenario += c1.request_crops_from_supplier(address=alice.address, quantity=20,_rate=3)
    scenario += c1.process_request(quantity=20)
    