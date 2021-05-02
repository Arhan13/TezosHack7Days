import smartpy as sp

class Storage(sp.Contract):
    def __init__(self):
        self.init(address=sp.address("KT1KbeMFA3fksoVdH21QVTCkANEYUxtGNJzQ"), farmer_rate=0, crops_available=0,request_from_supplier=0,supplier_rate=0,income=0)
    
    @sp.entry_point
    def update_crops_available(self, params):
        self.data.address = params.address
        self.data.crops_available = params._crops_available
        self.data.farmer_rate=params._rate
        suppliers_contract=sp.contract(sp.TIntOrNat, address=params.address,entry_point="get_rate_of_farmers").open_some()
        sp.transfer(arg=params._rate,amount=sp.tez(0),destination=suppliers_contract)

    @sp.entry_point
    def supplier_request(self, params):
        self.data.address = sp.sender
        self.data.request_from_supplier = params.quantity
        
    @sp.entry_point
    def supplier_request_rate(self, params):
        self.data.address = sp.sender
        self.data.supplier_rate= params._rate
        

    @sp.entry_point
    def transfer_crops_to_supplier(self, params):
        self.data.address = params.address
        c = sp.contract(sp.TInt, address=self.data.address, entry_point="increment_crops_quantity").open_some()
        sp.transfer(arg=params.crops_quantity, amount=sp.tez(0), destination = c)
        self.data.crops_available -= params.crops_quantity
        self.data.income+=self.data.supplier_rate*params.crops_quantity
        sp.if params.address==self.data.address:
            self.data.address = sp.address("KT1KbeMFA3fksoVdH21QVTCkANEYUxtGNJzQ")
            self.data.request_from_supplier = 0
            self.data.supplier_rate=0

@sp.add_test(name="Storage Example")
def test():
    alice = sp.test_account("Alice")
    c1 = Storage()
    scenario = sp.test_scenario()
    scenario.h1("Storage")
    scenario += c1
    scenario += c1.update_crops_available(_crops_available=100,_rate=20,address=alice.address)
    scenario += c1.supplier_request_rate(_rate=3).run(sender = alice.address)
    scenario += c1.supplier_request(quantity=50).run(sender = alice.address)
    scenario += c1.transfer_crops_to_supplier(address=alice.address, crops_quantity=40)