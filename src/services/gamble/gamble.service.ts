import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, shareReplay, tap } from 'rxjs/operators';
import { v4 } from 'uuid';
import Web3 from 'web3';
import { AuthenticationService } from '../auth/authentication.service';
import { ConfigService } from '../config/config.service';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class GambleService {
  private baseUrl: string;
  private readonly web3: Web3 = new Web3();
  private contractAbi = require('src/contracts/Gambler.json').abi;
  private myGambleContractAddress = new BehaviorSubject<string>('');
  public newContractSubject = new BehaviorSubject<string>('');
  public $createContract: Observable<string> = this.newContractSubject
    .asObservable()
    .pipe(
      mergeMap((resp) => {
        if (!resp) {
          return of('');
        }
        return from(
          window.ethereum.request({ method: 'eth_requestAccounts' })
        ).pipe(
          mergeMap((accounts: any) => {
            this.account = accounts[0];
            return combineLatest([
              this.createContract(this.account),
              this.auth.email$,
            ]).pipe(
              mergeMap(([deployment, email]: [any, string]) => {
                return this.http.post<string>(
                  `${this.baseUrl}/gamble/${email}`,
                  {
                    address: deployment.options.address,
                  }
                );
              })
            );
          })
        );
      }),
      catchError((error: any) => {
        console.error(error);
        return of('');
      })
    );

  private contract!: any;
  private account = '';

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private config: ConfigService
  ) {
    console.log('you rang?');
    this.baseUrl = this.config.getConfig('API_URL');
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.ethereum;
      } else {
        this.web3 = new Web3(
          new Web3.providers.HttpProvider('http://localhost:8545')
        );
      }
      window.web3 = new Web3(window.ethereum);
    }
    this.$vm = combineLatest([
      this.getAccountInfo(),
      this.$createContract,
    ]).pipe(
      tap(console.log),
      map(([accountInfo, contractAddress]) => ({
        ...accountInfo,
        smartContractAddress:
          accountInfo.smartContractAddress || contractAddress,
      })),
      shareReplay(1)
    );
  }

  createNewContract() {
    this.newContractSubject.next('new');
  }

  createContract(account: string) {
    this.contract = new window.web3.eth.Contract(this.contractAbi);
    const bytecode = require('src/contracts/bytes.json').bytes;
    return from(
      this.contract
        .deploy({
          data: bytecode,
        })
        .send({
          from: account,
        })
    );
  }

  makeBet() {
    return from(
      window.ethereum.request({ method: 'eth_requestAccounts' })
    ).pipe(
      tap((accounts: any) => (this.account = accounts[0])),
      mergeMap((accounts: string[]) => {
        console.log('account', accounts);
        const key = Web3.utils.asciiToHex(v4()).substring(0, 66);
        const now = new Date();
        const cutoffDate = Math.floor(now.getTime() / 1000);
        now.setDate(now.getDate() + 5);
        const settleDate = Math.floor(now.getTime() / 1000);
        return this.contract.methods
          .createBet('sam', 'shichao', true, key, cutoffDate, settleDate)
          .send({ from: accounts[0] });
      })
    );
  }

  getAccountInfo(): Observable<AccountInfo> {
    return this.auth.email$.pipe(
      mergeMap((email) =>
        this.http.get<AccountInfo>(`${this.baseUrl}/gamble/${email}`)
      )
    );
  }

  public $vm: Observable<AccountInfo>;
}

export interface AccountInfo {
  bets: Bet[];
  smartContractAddress: string;
}

interface Bet {}
