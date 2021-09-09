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
  public exchangeRate$: Observable<string>;
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
  public $vm: Observable<AccountInfo>;

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
      }))
    );

    this.exchangeRate$ = this.getExchangeRate().pipe(
      map((data: any) => data.data.rates.USD),
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

  makeBet(betDetails: BetDetails, smartAddress: string) {
    const key = Web3.utils.asciiToHex(v4().replace(/-/g, '')).substring(0, 66);
    console.log(
      v4(),
      'key',
      key,
      'one',
      Web3.utils.asciiToHex(v4().replace(/-/g, ''))
    );
    return from(
      window.ethereum.request({ method: 'eth_requestAccounts' })
    ).pipe(
      mergeMap((accounts: any) => {
        const key = Web3.utils.asciiToHex(v4()).substring(0, 66);
        const cutoffDate = Math.floor(betDetails.cutoffDate.getTime() / 1000);
        const settleDate = Math.floor(
          betDetails.settlementDate.getTime() / 1000
        );

        this.contract = new window.web3.eth.Contract(
          this.contractAbi,
          smartAddress
        );

        return combineLatest([
          from(
            this.contract.methods
              .createBet(
                betDetails.sport,
                betDetails.chosenFighter,
                betDetails.nonChosenFighter,
                betDetails.event,
                cutoffDate,
                settleDate,
                key
              )
              .send({
                from: accounts[0],
                value: parseInt(
                  window.web3.utils.toWei(String(betDetails.amount), 'ether')
                ),
              })
          ),
          this.auth.email$,
        ]).pipe(
          mergeMap(([resp, email]) =>
            this.postBet(key, betDetails, email, smartAddress)
          )
        );
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

  getExchangeRate() {
    return this.http.get<any>(
      'https://api.coinbase.com/v2/exchange-rates?currency=ETH'
    );
  }

  postBet(
    key: string,
    betDetails: BetDetails,
    email: string,
    smartContractAddress: string
  ) {
    return this.http.post<any>(`${this.baseUrl}/gamble/bet/${email}`, {
      betId: key,
      betDetails,
      smartContractAddress,
    });
  }

  getBetInfo(betId: string) {
    return this.http.get<FullBetDetails>(
      `${this.baseUrl}/gamble/betInfo/${betId}`
    );
  }

  confirmBet(betId: string, contractAddress: string, amount: number) {
    this.contract = new window.web3.eth.Contract(
      this.contractAbi,
      contractAddress
    );
    return from(
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts: string[]) => {
          this.contract.methods.acceptBet(betId).send({
            from: accounts[0],
            value: parseInt(window.web3.utils.toWei(String(amount), 'ether')),
          });
        })
    );
  }
}

export interface AccountInfo {
  bets: Bet[];
  smartContractAddress: string;
}

export interface BetDetails {
  sport: string;
  event: string;
  chosenFighter: string;
  amount: number;
  nonChosenFighter: string;
  cutoffDate: Date;
  settlementDate: Date;
}

export interface FullBetDetails extends BetDetails {
  smartContractAddress: string;
  sort_key: string;
}

interface Bet {}
