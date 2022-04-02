import React, {Component} from 'react';
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from '../abis/abis/KryptoBird.json'
import KryptoBird2 from '../abis/abis-2/KryptoBird2.json'
import KryptoBird3 from '../abis/abis-3/KryptoBird3.json'
import {MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn} from 'mdb-react-ui-kit';
import './App.css';
import { event } from 'jquery';


class App extends Component{

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    // first up is to detect ethereum provider
    async loadWeb3() {
        const provider = await detectEthereumProvider();

        // modern browsers
        // if there is a provider then lets
        // lets log that it's working and access the window from the doc
        // to set Web3 to the provider 
        
        if(provider) {
            console.log('ethereum wallet is connected')
            window.web3 = new Web3(provider)
        } else {
            // no ethereum provider
            console.log('no ethereum wallet detected')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({account:accounts[0]})

        // create a constant js variable networkId which 
        //is set to blockchain network id 
        const networkId = await web3.eth.net.getId()
        const networkData = KryptoBird.networks[networkId]||KryptoBird2.networks[networkId]||KryptoBird3.networks[networkId]
         if(networkData) {
             // EXERCISE TIME!!!! :)
             // 1. create a var abi set to the Kryptobird abi
             // 2. create a var address set to networkData address
             // 3. create a var contract which grabs a 
             //new instance of web3 eth Contract  
             // 4. log in the console the var contract successfully - GOOD LUCK!!!!

             const abi = KryptoBird.abi||KryptoBird2.abi||KryptoBird3.abi;
             const address = networkData.address; 
             const contract = new web3.eth.Contract(abi, address)
             this.setState({contract})

             // call the total supply of our Krypto Birdz 
             // grab the total supply on the front end and log the results
             // go to web3 doc and read up on methods and call 
             const totalSupply = await contract.methods.totalSupply().call()
            this.setState({totalSupply})
            // set up an array to keep track of tokens 
            // load KryptoBirdz

            for(let i = 1; i <= totalSupply; i++) {
                const KryptoBird = await contract.methods.kryptoBirdz(i - 1).call()
                // how should we handle the state on the front end? 
                this.setState({
                    kryptoBirdz:[...this.state.kryptoBirdz, KryptoBird]
                })


            }
         } else {
             window.alert('Smart contract not deployed')
         }
    }

    // with minting we are sending information and we need to specify the account
    
    mint = (kryptoBird) => {
        this.state.contract.methods.mint(kryptoBird).send({from:this.state.account})
        .once('receipt', (receipt)=> {
            this.setState({
                kryptoBirdz:[...this.state.kryptoBirdz, KryptoBird]
            })
        })  
    };
    //burn function-------------------------------------------------------------------------------------------------------------

    //burn = (kryptoBird) => {
        //this.state.contract.methods.burn(kryptoBird).send({from:this.state.account})
        //.once('receipt', (receipt)=> {
            //this.setState({
                //kryptoBirdz:[...this.state.kryptoBirdz, KryptoBird]
            //})
        //})  
    //}


    async connectMetamask () {
        const provider = await detectEthereumProvider();
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()

        

        console.log( "WE ARE IN META MASK CONNECT" );
          if (provider) {
              // let web3InstanceCopy = new Web3(currentProvider);
              // setWeb3Instance(web3InstanceCopy);
              if (!window.ethereum.selectedAddress) {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
              }
              await window.ethereum.enable();
              let currentAddress = window.ethereum.selectedAddress;
              console.log(currentAddress);
              this.setState({account:accounts[0]})
              //const web3 = new Web3(provider);
              //let amount = await web3.eth.getBalance(currentAddress);
              //amount = web3.utils.fromWei(web3.utils.toBN(amount), "ether");
          } else {
              console.log('Please install MetaMask!');
          }
    
      }


    constructor(props){
        super(props);
        this.state={
            contract:null,
            account:"",
            totalSupply:0,
            kryptoBirdz:[],


        }
    }

            // BUILDING THE MINTING FORM
            // 1. Create a text input with a place holder 
            //'add file location'
            // 2. Create another input button with the type submit

    render() {
        return (
            <div className='container-filled'>
                {console.log(this.state.kryptoBirdz)}
                <nav className='navbar navbar-dark fixed-top 
                bg-dark flex-md-nowrap p-0 shadow'>
                <div className='navbar-brand col-sm-3 col-md-3 
                mr-0' style={{color:'white'}}>
                      Zingularity NFT
                </div>
                <ul className='navbar-nav px-3'>
                <li className='nav-item text-nowrap
                d-none d-sm-none d-sm-block
                '>
                {/*                <small className='text-white'>
                    //{this.state.account}
                </small>*/}

                </li>
                <li className='nav-item text-nowrap
                d-none d-sm-none d-sm-block
                '><button  className='btn btn-sm bg-white color' onClick={ (event)=>{
                    event.preventDefault()
                    const account=this.state.account
                    this.connectMetamask(account);

                 }}><p className='text-sm' style={{color:'black'}}>Wallet</p></button>
                 <li className='nav-item text-nowrap
                d-none d-sm-none d-sm-block
                '><lavel className='text-md font-weight-bold' style={{color:"white"}}>{this.state.account.substr(0,5)+' ... '+this.state.account.substr(36,42)}</lavel></li>
                 
                 
                </li>
                </ul>
                </nav>



                <div className='container-fluid mt-1 py-5'>
                    <div className='row'>
                        <main role='main' 
                        className='col-lg-12 d-flex text-center'>
                            <div className='content mr-auto ml-auto'
                            style={{opacity:'0.8'}}>
                                <h1 style={{color:'black'}}>
                                    KryptoBirdz - NFT Marketplace</h1>
                            <form onSubmit={(event)=>{
                                event.preventDefault()
                                const kryptoBird = this.kryptoBird.value
                                this.mint(kryptoBird)
                            }}>
                                <input
                                type='text'
                                placeholder='Add a file location'
                                className='form-control mb-1'
                                ref={(input)=>this.kryptoBird = input}
                                />
                                <input style={{margin:'6px'}}
                                type='submit'
                                className='btn btn-primary btn-black'
                                value='MINT'
                                />
                                </form>

                            </div>
                        </main>
                    </div>
                    
                    {/*aqui van las cartas*/}
                    <hr></hr>
                    <div className='row text-center'>
                        {this.state.kryptoBirdz.map((kryptoBird, key)=>{
                            return(
                               <div >
                                   <div>
                                       <MDBCard className='token img'style={{maxWidth:'22rem'}}>
                                       <MDBCardImage src={kryptoBird} position='top' height={'250rem'} style={{marginRight:'4px'}}/>
                                       <MDBCardBody>
                                           <MDBCardTitle>KryptoBirdz</MDBCardTitle>
                                           <MDBCardText>lorem ipsu</MDBCardText>
                                           <MDBBtn href={kryptoBird}>Download</MDBBtn>
                                           
                                       </MDBCardBody>
                                       </MDBCard>
                                   </div>
                               </div> 
                            )
                        })}
                    </div>        


                </div>
            </div>
        )
    }
}

export default App;
