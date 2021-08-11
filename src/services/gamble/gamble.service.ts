import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { flatMap, map, mergeMap, tap } from 'rxjs/operators';
import Web3 from 'web3';
declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class GambleService {
  private readonly web3: Web3 = new Web3();
  private enable = false;
  private contractAbi = require('src/contracts/Gambler.json').abi;
  private myGambleContractAddress =
    '0x5e18e1f042F2E1D5633937c169d45768010B42b2';
  private contract!: any;
  private account: any;
  private accountPromise!: Promise<any>;
  constructor() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider;
      } else {
        this.web3 = new Web3(
          new Web3.providers.HttpProvider('http://localhost:8545')
        );
      }
      console.log('transfer.service :: constructor :: window.ethereum');
      window.web3 = new Web3(window.ethereum);
      console.log('transfer.service :: constructor :: this.web3');
      console.log(this.web3);
      console.log(this.contractAbi);
      const contract = new window.web3.eth.Contract(
        this.contractAbi,
        this.myGambleContractAddress
      );
      console.log('contract', contract);
      this.contract = contract;
    }
  }

  makeBet() {
    return from(
      window.ethereum.request({ method: 'eth_requestAccounts' })
    ).pipe(
      tap((accounts: any) => (this.account = accounts[0])),
      mergeMap((accounts: string[]) => {
        return this.contract.methods
          .createBet('sam', 'shichao')
          .send({ from: accounts[0] });
      })
    );
    // console.log('this.account', this.account);
    // await this.contract.methods
    //   .createBet('sam', 'shichao')
    //   .send({ from: this.account })
    //   .then((x: any) => console.log(x))
    //   .catch((e: any) => console.log(e));
  }
}
