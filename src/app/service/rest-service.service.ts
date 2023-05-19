import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { map } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Hero {
  exp: number;
  heroid: string;
  trophy: number;
  powerPoint: number;
  thetanCoin: number;
  winrate: number;
  premiumBattleCount: number;
  initialPrice: number;
  roi: number;
  heroName: String;
  premiumBattleCountUsed:number;
  heroLevel:number;
  heroImage:String;
  heroImageSmall:String;
  statsByEventType: StatsByEventType[];
}

export interface ChartData {
  data: number[];
  labels: String[];
  totalTHC: number;
}

export interface StatsDashboardResponse {
  chartDataList: ChartData[];
  chartDataByEventType: ChartData[];
  winRate: number;
}

export interface StatsByEventType {
  thetanCoin: number;
  winrate: string;
  premiumBattleCount: number;
  premiumBattleWonCount: number;
  modeType: String;
}

export interface Account {
    avatarId: number;
    pcountry: string;
    created: string;
    email: string;
    frameId: number;
    id: string;
    isCheckBehaviorPoint: boolean;
    isCreator: boolean;
    isCreatorProgram: boolean;
    lastOnline: number;
    lastTimeBattle: string;
    playerStatistic: PlayerStatistics;
    rankingLevel: number;
    rankingLevelHighest: number;
    trophy: number;
    trophyHighest: number;
    userProfile: UserProfile;
    username: string;

}

export interface PlayerStatistics {
    battle: number;
    behaviorPoint: number;
    curStreak: number;
    gameCountCheckin: number;
    hero: number;
    lose: number;
    mega: number;
    mvp: number;
    streak: number;
    triple: number;
    victory: number;
    }

    export interface UserProfile {
      level: number;
      levelUpGPP: number;
      xp: number;
     }

  const endpoint = 'http://localhost:8102/';

@Injectable({
  providedIn: 'root'
})
export class RestService {

//   hero : Hero;
  constructor(private _http:HttpClient) { }


  dailyTHC(){
    return this._http.get("http://localhost:8102/").pipe(map((result : any) =>result));
  }

   getData(): Observable<any> {
      return this._http.get<Hero>(endpoint +"thetan/"+ "63c955b00b2fc6626a0f6e48"+"/stats?userId=619252fd3e00ff3b8f8b54e0").pipe(
        map(((result : Hero) =>result)),
        catchError(this.handleError)
      );
    }

    getDataChart(): Observable<any> {
//         return this._http.get<ChartData[]>(endpoint +"hero/"+ "63c955b00b2fc6626a0f6e48"+"/lineChart").pipe(
return this._http.get<StatsDashboardResponse>(endpoint +"thetan/"+ "~"+"/dashboard?mode=0&userId=619252fd3e00ff3b8f8b54e0").pipe(
          map(((result : StatsDashboardResponse) =>result)),
          catchError(this.handleError)
        );
      }

   getAllStats(): Observable<any> {
      return this._http.get<Hero[]>(endpoint +"thetan/stats?userId=619252fd3e00ff3b8f8b54e0").pipe(
        map(((result : Hero[]) =>result)),
        catchError(this.handleError)
      );
    }

    getAccountStats(): Observable<any> {
          return this._http.get<Account>(endpoint +"thetan/accountStats?userId=619252fd3e00ff3b8f8b54e0").pipe(
            map(((result : Account) =>result)),
            catchError(this.handleError)
          );
        }


  private handleError(error: HttpErrorResponse): any {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError(
        'Something bad happened; please try again later.');
    }
}
