
var chai = require('chai');
const {assert}= require('chai');

const KryptoBird= artifacts.require("./KryptoBird");
var chaiAsPromised = require("chai-as-promised");

    chai.use(chaiAsPromised);
    chai.should();

contract ("KryptoBird",(accounts)=>{
    let contract
    before(async()=>{
        contract= await KryptoBird.deployed()
    })
    
    describe("deployment", async()=>{
        //test samples whit writing it
        it("deploys sucessfuly", async()=>{
            const address= contract.address;
            assert.notEqual(address, "");
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
            assert.notEqual(address, 0x0);
        })
        it("check name", async()=>{
            const name= await contract.name();
            assert.equal(name,"KryptoBird");
        })

        it("check symbol", async()=>{
            
            const symbol=await contract.symbol();
            assert.equal (symbol,"KBIRDZ");
        })

        
    })

    describe ("minting", async()=>{
        it("create a new token", async()=>{
            const result= await contract.mint("http...1")
            const totalSupply =await contract.totalSupply()
            assert.equal(totalSupply, 1)
            const event= result.logs[0].args

            //success
            assert.equal(event._from, "0x0000000000000000000000000000000000000000", "from the contract")
            assert.equal(event._to,accounts[0], "to is msg.sender")

            //faliure
            await contract.mint("http...1").should.be.rejected

        })
    })

    describe("indexing", async()=>{
        it("list KryptoBird", async()=>{
            await contract.mint("http...2")
            await contract.mint("http...3")
            await contract.mint("http...4")
            const totalSupply =await contract.totalSupply()

            //loop for
            let result= []
            let KryptoBird
            for(i=1;i<=totalSupply;i++){
            KryptoBird=await contract.kryptobirdz(i-1)
            result.push(KryptoBird)
        }
            
            let expected=["http...1","http...2","http...3","http...4"]
            assert.equal(result.join(","), expected.join(","))
        })
 
    })


})