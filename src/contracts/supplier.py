import smartpy as sp

class Storage(sp.Contract):

    def __init__(self):
        self.init(address=sp.address("KT1KS99kZk5WGagQXFSdN7tjgKkAKj1kAr9C"),farmers_rate=0,crops_available=0, customer=sp.address("KT1KS99kZk5WGagQXFSdN7tjgKkAKj1kAr9C"), customer_rate=0,customer_requirement=0,mrp=0,income=0)

    @sp.entry_point
    def get_rate_of_farmers(self,params):
        self.data.farmers_rate=params._rate
        
    @sp.entry_point
    def increment_crops_quantity(self, params):
        self.data.crops_available += params.crops_recived
        
        
    
    @sp.entry_point
    def crop_request_to_farmers(self, params):
        farmers_contract = sp.contract(sp.TIntOrNat, address = params.address, entry_point="supplier_request").open_some()
        farmers_contract_two=sp.contract(sp.TIntOrNat, address = params.address, entry_point="supplier_request_rate").open_some()
        customer_contract_three=sp.contract(sp.TIntOrNat, address = self.data.customer, entry_point="get_suppliers_mrp").open_some()
        sp.transfer(arg=params._rate,amount=sp.tez(0),destination=farmers_contract_two)
        sp.if self.data.farmers_rate<=params._rate:
            self.data.mrp=params._rate+2
            sp.transfer(arg=params.quantity, amount = sp.tez(0), destination=farmers_contract)
            sp.transfer(arg=self.data.mrp,amount=sp.tez(0),destination=customer_contract_three)
            
    
    @sp.entry_point
    def customer_rate_check(self,params):
        self.data.customer_rate=params._rate
        
    @sp.entry_point
    def customer_Requirement(self, params):
        self.data.customer = sp.sender
        self.data.customer_requirement = params.quantity
    
    @sp.entry_point
    def transfer_to_customer(self, params):
        customer_contract = sp.contract(sp.TIntOrNat, address = params.address, entry_point="process_request").open_some()
        sp.transfer(arg = params.customer_request, amount=sp.tez(0), destination=customer_contract)
        self.data.crops_available -= params.customer_request
        self.data.income+=params.customer_request*self.data.customer_rate
        sp.if params.address == self.data.customer:
            self.data.customer = sp.address("KT1KS99kZk5WGagQXFSdN7tjgKkAKj1kAr9C")
            self.data.customer_requirement = 0
            self.data.customer_rate=0
            
@sp.add_test(name="Storage Example")
def test():
    alice = sp.test_account("Alice")
    c1 = Storage()
    scenario = sp.test_scenario()
    scenario.h1("Storage")
    scenario += c1
    scenario += c1.get_rate_of_farmers(_rate = 2)
    scenario += c1.increment_crops_quantity(crops_recived = 20)
    scenario += c1.customer_Requirement(quantity=10).run(sender = alice.address)
    scenario += c1.crop_request_to_farmers(address = sp.address("KT1WuaurQKnFH4vD8xwXSrTG5TBUT5xAFQxi"), quantity=201,_rate=3)
    scenario += c1.customer_rate_check(_rate = 7)
    scenario += c1.transfer_to_customer(address = alice.address, customer_request = 10)