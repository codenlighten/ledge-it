import './card.css';
import React from 'react';

export default ({ ledgeit }) => {
  const handleClick = () => {
    const publicKey = prompt("Please enter the public key of the new owner")
    if(publicKey) ledgeit.setOwner(publicKey)
  }

  return ledgeit
    ? (<div className="card" onClick={handleClick}>
        <div className="container">
          <b>{ledgeit.date}</b><br />
          <b>{ledgeit.name}</b><br />
          <b>{ledgeit.statement}</b><br />

        </div>
      </div>)
    : <div></div>
}
