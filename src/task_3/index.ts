/** Задача 3 - Моё хранилище
 *	Напишите класс хранилища(Vault)
 *	Из хранилища можно снимать валюту с помощью withdraw(Currency)
 *	В хранилище можно вкладывать валюту через deposit(Currency)
 *	Из хранлилища, можно переводить валюту через transfer(Currency, Vault)
*/
import { Currency } from "../task_1";

export class Vault implements ISecureVaultRequisites{
	private static lastId = 1;
    public readonly id: number;
	public store: Set<Currency> = new Set<Currency>();
    constructor() {
        this.id = Vault.lastId;
        Vault.lastId++;
    }
    public withdraw(currency: Currency) : void {
        let has = false;
        this.store.forEach(curr => {
            if (!has && curr.name === currency.name) {
                has = true;
                if (curr.value >= currency.value) {
                    curr.value -= currency.value;                    
                } else {
                    throw new Error('Суммы недостаточно');
                }
            }
        });
        if(!has) {
            throw new Error('Нету такой валюты в хранилище')
        }
    }

    public deposit(currency: Currency) : void {
        let has = false;
        this.store.forEach(curr => {
            if (!has && curr.name === currency.name) {
                has = true;
                curr.value += currency.value;                    
            }
        });
        if(!has) {
            this.store.add(currency);
        }
    }

    public transfer(currency: Currency, vault: Vault) : void {
        if(this.id !== vault.id) {
            this.withdraw(currency);
            vault.deposit(currency);
        } else {
            throw new Error('Нельзя производить трансфер в то же хранилище');
        }
    }
}

export interface ISecureVaultRequisites{
	id: number,
    store: Set<Currency>,
    withdraw: (currency: Currency) => void,
    deposit: (currency: Currency) => void,
    transfer: (currency: Currency, vault: Vault) => void
}
