import React, { useState, useEffect } from 'react'
import Computer from 'bitcoin-computer'
import './App.css'
import Card from './card'
import Ledgeit from './artwork'

function App() {
  const [computer, setComputer] = useState(new Computer({ 
    seed: 'apart agent divert fence gravity alter rib ten normal always annual federal worth express wire', chain: 'BSV',
    network: 'testnet', // testnet or livenet
    path: "m/44'/0'/0'/0"}))
 


  const [balance, setBalance] = useState(0)

  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [statement, setStatement] = useState('')

  const [revs, setRevs] = useState([])
  const [ledgeits, setLedgeits] = useState([])
  const [refresh, setRefresh] = useState(0)
  
  
  useEffect(() => {
    const fetchRevs = async () => {
      setBalance(await computer.db.wallet.getBalance())
      setRevs(await computer.getRevs(computer.db.wallet.getPublicKey()))
      setTimeout(() => setRefresh(refresh + 1), 3500)
    }
    fetchRevs()
  }, [computer.db.wallet, refresh])

  useEffect(() => {
  const fetchLedgeits = async () => {
    setLedgeits(await Promise.all(revs.map(async rev => computer.sync(rev))))
  }
    fetchLedgeits()
  }, [revs, computer])

  useEffect(() => console.log('revs', revs), [revs])
  useEffect(() => console.log('ledgeits', ledgeits), [ledgeits])

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const ledgeit = await computer.new(Ledgeit, [date, name, statement])
    console.log('created ledgeit', ledgeit)
  }

  return (
    <div className="App">
    <div className="navbar">
      <img src="paper-pen.png" className="pen-paper-icon"></img>
    <h1>LedgeIt!</h1>
    <h2>It's Your Statement...Make it Count!</h2>
    </div>
     <br/>
      {/* <h2>Create new Ledgeit</h2> */}
      <div className="newLedgeit">
      <form onSubmit={handleSubmit}>
        Date<br />
        <input type="date" placeholder="Today's Date" value={date} onChange={e => setDate(e.target.value)} />

        Name<br />
        <input type="string" placeholder="Your Name or Pseudonym" value={name} onChange={e => setName(e.target.value)} />

        Statement<br />
        <textarea type="string" placeholder="what's on your mind?" value={statement} onChange={e => setStatement(e.target.value)} />
        <br/>
<h4 className="warning">***This is permanent, use responsibly!</h4>
        <button className="createbutton" type="submit" value="Send Bitcoin">Create Ledgeit</button>
      </form>
      </div>
<div className="legitimized">
      <h2>You are Ledgeit!</h2>
      <ul className="flex-container">
      {ledgeits.map(ledgeit => <Card ledgeit={ledgeit} key={ledgeit.date + ledgeit.name + ledgeit.statement} />)}
      </ul>
      </div>
      <br/>
      {/* <div className="qrc">
        <h3>Load up your account by scanning here.</h3>
        {/* need to create code that autogenerates new qrc with new wallet creations */}
        {/* <img src="ledgeit-public.png" alt="qrc-ledgeit"></img>
      </div> */}
      <div className = "newWallet">
      <h3>Your Wallet</h3>
      <b>Address</b>&nbsp;{computer.db.wallet.getAddress().toString()}<br />
      <b>Public Key</b>&nbsp;{computer.db.wallet.getPublicKey().toString()}<br />
      <b>Balance</b>&nbsp;{balance/1e8} {computer.db.wallet.restClient.chain}<br />
      {/* <button type="submit" onClick={() => setComputer(new Computer())}>Generate New Wallet</button> */}
      
      <h4>Thanks for using LedgeIt!</h4>
      <h4>Created using <a href="https://bitcoincomputer.io">BitcoinComputer</a></h4>
      </div>
    
    </div>
  );
}

export default App;
