import {ErrorMSG, Success, WebSocket} from "./utils";
import axios from 'axios';
import * as https from "https";

require('dotenv').config();

export class ServiceMobile {

    private static instanz: ServiceMobile;

    public static getInstanz(): ServiceMobile {
        if (this.instanz == undefined) {
            this.instanz = new ServiceMobile();
        }

        return this.instanz;
    }

    private _items: Map<string, Map<string, Item>> = new Map<string, Map<string, Item>>();
    private _playerData: Map<string, PlayerData> = new Map<string, PlayerData>;
    private _serverWS: any;

    private agent = new https.Agent({rejectUnauthorized: false});

    get serverWS() {
        return this._serverWS;
    }

    set serverWS(value: WebSocket) {
        this._serverWS = value;
    }

    get items(): Map<string, Map<string, Item>> {
        return this._items;
    }

    get playerData(): Map<string, PlayerData> {
        return this._playerData;
    }

    checkPassword(password: string) {
        let envPassword = process.env.SECRET_KEY;

        return password == envPassword;
    }

    async doesPlayerExists(userID: string) {
        try {
            const res = await axios.get(process.env.API_URL + "/user/" + userID, {httpsAgent: this.agent});

            return res.status === 200;
        } catch (error) {
            return false;
        }
    }

    async login(userID: string, ws: WebSocket) {
        let res = await axios.get(process.env.API_URL + "/user/points/" + userID, {httpsAgent: this.agent});
        let money = res.data;

        this.playerData.set(userID, {money: money, ws: ws, active: false});

        if (!this.items.has(userID)) {
            this.items.set(userID, this.initItems());
        }
    }

    private initItems(): Map<string, Item> {
        let map = new Map<string, Item>;

        for (let i = 0; i < 37; i++) {
            map.set(i.toString(), {values: [i], jetonAmount: 0, payoutFactor: 35})
        }

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 12; y++) {
                if (x == 2) {
                    let num1 = ((y + 1) * 3 - x);
                    let num2 = ((y + 1) * 3 - (x - 1));
                    let num3 = ((y + 1) * 3 - (x - 2));

                    map.set([num1, num2, num3].toString(), {
                        values: [num1, num2, num3],
                        jetonAmount: 0,
                        payoutFactor: 11
                    })
                } else {
                    let num1 = ((y + 1) * 3 - x);
                    let num2 = ((y + 1) * 3 - (x + 1));

                    map.set([num1, num2].toString(), {values: [num1, num2], jetonAmount: 0, payoutFactor: 17})
                }
            }
        }

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 12 - 1; y++) {
                let num1 = ((y + 1) * 3 - x);
                let num2 = ((y + 2) * 3 - x);

                map.set([num1, num2].toString(), {values: [num1, num2], jetonAmount: 0, payoutFactor: 17})
            }
        }

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 12 - 1; y++) {
                if (x == 2) {
                    let num1 = ((y + 1) * 3 - x);
                    let num2 = ((y + 1) * 3 - (x - 1));
                    let num3 = ((y + 1) * 3 - (x - 2));
                    let num4 = ((y + 2) * 3 - x);
                    let num5 = ((y + 2) * 3 - (x - 1));
                    let num6 = ((y + 2) * 3 - (x - 2));

                    map.set([num1, num2, num3, num4, num5, num6].toString(), {
                        values: [num1, num2, num3, num4, num5, num6],
                        jetonAmount: 0,
                        payoutFactor: 5
                    })
                } else {
                    let num1 = ((y + 1) * 3 - x);
                    let num2 = ((y + 1) * 3 - (x + 1));
                    let num3 = ((y + 2) * 3 - x);
                    let num4 = ((y + 2) * 3 - (x + 1));

                    map.set([num1, num2, num3, num4].toString(), {
                        values: [num1, num2, num3, num4],
                        jetonAmount: 0,
                        payoutFactor: 8
                    })
                }

            }
        }

        map.set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].toString(), {
            values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            jetonAmount: 0,
            payoutFactor: 2
        })
        map.set([13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].toString(), {
            values: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            jetonAmount: 0,
            payoutFactor: 2
        })
        map.set([25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36].toString(), {
            values: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
            jetonAmount: 0,
            payoutFactor: 2
        })

        map.set([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].toString(), {
            values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
            jetonAmount: 0,
            payoutFactor: 2
        })
        map.set([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].toString(), {
            values: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
            jetonAmount: 0,
            payoutFactor: 2
        })
        map.set([1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].toString(), {
            values: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
            jetonAmount: 0,
            payoutFactor: 2
        })

        map.set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].toString(), {
            values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
            jetonAmount: 0,
            payoutFactor: 1
        })
        map.set([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36].toString(), {
            values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
            jetonAmount: 0,
            payoutFactor: 1
        })
        map.set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].toString(), {
            values: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
            jetonAmount: 0,
            payoutFactor: 1
        })
        map.set([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35].toString(), {
            values: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
            jetonAmount: 0,
            payoutFactor: 1
        })
        map.set([1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35].toString(), {
            values: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35],
            jetonAmount: 0,
            payoutFactor: 1
        })
        map.set([19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36].toString(), {
            values: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
            jetonAmount: 0,
            payoutFactor: 1
        })

        return map;
    }


    async payout(userID: string, number: number) {
        for (let value of this._items.get(userID)!.values()) {
            if (value.jetonAmount == 0) continue
            if (!value.values.includes(number)) continue;

            let amount = value.jetonAmount;
            amount += value.jetonAmount * value.payoutFactor;

            await axios.get(process.env.API_URL + "/user/points/change/?userID=" + userID + "&points=" + amount, {httpsAgent: this.agent})

            let res = await axios.get(process.env.API_URL + "/user/points/" + userID, {httpsAgent: this.agent});
            this.playerData.get(userID)!.money = res.data;

            console.log("money sent to: " + userID)
        }
    }

    async add(userID: string, itemName: string, amount: number) {
        if (!this.items.has(userID)) return ErrorMSG.playerNotExists;
        if (!this.items.get(userID)!.has(itemName)) return ErrorMSG.error;
        if (this.getMoneyOfPlayer(userID) < amount) return ErrorMSG.notEnoughMoney;

        this.items.get(userID)!.get(itemName)!.jetonAmount += amount;
        this.playerData.get(userID)!.active = true;

        await axios.get(process.env.API_URL + "/user/points/change/?userID=" + userID + "&points=" + -amount, {httpsAgent: this.agent});

        let res = await axios.get(process.env.API_URL + "/user/points/" + userID, {httpsAgent: this.agent});
        this.playerData.get(userID)!.money = res.data;

        if (this.serverWS != undefined)
            this.itemToMain(itemName, amount);

        return Success.success;
    }

    private itemToMain(itemName: string, amount: number) {
        this.serverWS.emit("table", {jetons: amount, itemName: itemName})
    }

    async delete(userID: string) {
        if (!this.items.has(userID)) return ErrorMSG.playerNotExists;

        if (this.serverWS != undefined) {
            this.serverWS.emit("delete", (JSON.stringify(Array.from(this.items.get(userID)!.entries()))))
        }

        let money = 0;

        for (let value of this.items.get(userID)!.values()) {
            money += value.jetonAmount;
            value.jetonAmount = 0;
        }

        await axios.get(process.env.API_URL + "/user/points/change/?userID=" + userID + "&points=" + money, {httpsAgent: this.agent});

        let res = await axios.get(process.env.API_URL + "/user/points/" + userID, {httpsAgent: this.agent});
        this.playerData.get(userID)!.money = res.data;

        this.playerData.get(userID)!.active = false;
    }

    getMoneyOfPlayer(userID: string): number {
        return this.playerData.get(userID) == undefined ? 0 : this.playerData.get(userID)!.money;
    }


    remainingTime: number = 0;

    async countdownAndDoSomething() {
        while (true) {
            for (let i = 60; i >= 0; i--) {
                console.log(`Noch ${i} Sekunden`);

                this.remainingTime = i;
                await new Promise(resolve => setTimeout(resolve, 1000));

                if (this.serverWS != undefined) this.serverWS.emit("remainingTime", i);
                this.emitToMobile("remainingTime", i);
            }

            this.emitToMobile("running");

            let randNum = this.getRandomNumber(0, 36);
            console.log("randNum: " + randNum);

            if (this.serverWS != undefined) this.serverWS.emit("number", {randNum: randNum})

            await new Promise(resolve => setTimeout(resolve, 7500));

            for (let key of this.items.keys()) {
                if (!this.playerData.get(key)!.active) continue;

                await this.payout(key, randNum)
                this.items.set(key, this.initItems())

                this.playerData.get(key)!.ws.emit("payOut", this.playerData.get(key)!.money)
            }

            await new Promise(resolve => setTimeout(resolve, 8000));

            for (let key of this.items.keys()) {
                if (!this.playerData.get(key)!.active) continue;

                this.playerData.get(key)!.active = false;
                this.playerData.get(key)!.ws.emit("roundEnd");
            }

            if (this.serverWS != undefined) this.serverWS.emit("end");

            this.emitToMobile("runnable")
        }
    }

    private emitToMobile(message: string, val?: any) {
        for (let value of this.playerData.values()) {
            value.ws.emit(message, val);
        }
    }

    private getRandomNumber(min: number, max: number): number {
        const randomDecimal = Math.random();

        return Math.floor(randomDecimal * (max - min + 1)) + min;
    }
}

export type Item = {
    values: number[],
    payoutFactor: number,
    jetonAmount: number
}

export type PlayerData = { money: number, ws: WebSocket, active: boolean }