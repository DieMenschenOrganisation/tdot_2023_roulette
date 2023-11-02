import {StoreMobile} from "./store.mobile";
import {ErrorMSG} from "./utils";

export class ServiceMobile {
    private storeMobile: StoreMobile = new StoreMobile();
    login(name: string) {
        this.storeMobile.login(name);
    }

    add(name: string, itemName: string, amount: number) {
        if (!this.checkName(name)) return ErrorMSG.playerNotExists;
        if (this.storeMobile.money.get(name)! < amount) return ErrorMSG.notEnoughMoney;

        return this.storeMobile.add(name, itemName, amount);
    }

    private checkName(name: string) {
        return this.storeMobile.items.has(name);
    }

    getMoneyOfPlayer(name: string) {
        return this.storeMobile.getMoneyOfPlayer(name);
    }
}