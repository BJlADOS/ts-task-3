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
        try {
            this.store.forEach(curr => {
                if (curr.name === currency.name) {
                    if (curr.value >= currency.value) {
                        curr.value -= currency.value;
                        throw new Error();                    
                    } else {
                        throw new Error('Суммы недостаточно');
                    }
                }
            });
        } catch(e) {
            if((e as Error).message) {
                throw new Error('Суммы недостаточно');
            }

            return;
        }
        throw new Error('Нету такой валюты в хранилище')        
    }

    public deposit(currency: Currency) : void {
        try {
            this.store.forEach(curr => {
                if (curr.name === currency.name) {
                     curr.value += currency.value;
                     throw new Error();                    
                }
            });
        } catch {
            return;        
        }
        this.store.add(currency); 
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