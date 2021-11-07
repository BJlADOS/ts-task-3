/**
 * Задание 4 - Гарантия доставки
 * Денюжки со счета на счет перевести легко, а вот дотащить 3 килограмма палладия, может быть затруднительно
 * Изучите интервейс IContract
 * Опищите и реализуйте функционал сущности Договора-контракта
 * BankingContract - банковский перевод, без задержки
 * SmartContract - перевод через блокчейн, задержка 3000мс
 * LogisticContract - перевозка металла, задержка 6000мс
 */
import { Currency, CurrencyType } from "../task_1";
import { Vault } from "../task_3";

export abstract class Contract implements IContract{
    private readonly delay: number;
    public readonly id: number;
    private static lastId = 1;
    private _state: ContractState;
    public readonly value: Currency;
    public readonly sender: Vault;
    public readonly receiver: Vault;
    private Timer: NodeJS.Timeout;
    constructor(value: Currency, sender: Vault, receiver: Vault, type: CurrencyType, delay: number) {
        if (!sender || !receiver || value.value < 0) {
            throw new Error('Неверные аргументы');
        }
        if (value.Type !== type) {
            throw new Error('Неверная валюта');
        }
        this.delay = delay;
        this.id = Contract.lastId;
        Contract.lastId++;
        this.value = value;
        this.sender = sender;
        this.receiver = receiver;
        this._state = ContractState.pending;
    }
    get state() {
        return this._state;
    }
    public signAndTransfer() : void {
        if (this._state === ContractState.rejected || this.state === ContractState.close) {
            console.log('Контракт уже был выполнен или отменён, проверьте через свойтво state');
        } else {
        this._state = ContractState.transfer;
        console.log('Контракт отправлен на выполнение')
        this.Timer = setTimeout(() => {
            try {
                this.sender.transfer(this.value, this.receiver);
                this._state = ContractState.close;
                this.closeTransfer();               
            } catch(e) {
                this.rejectTransfer();
                console.log(e);
            }
        }, this.delay);   
        }        
    }
    public closeTransfer() : void {
        switch(this._state) {
            case ContractState.rejected: 
                console.log('Контракт был отменён, выполнение невозможно');            
                break;
            case ContractState.transfer: 
                console.log('Подождите, контракт выполняется');
                break;
            case ContractState.close:
                console.log('Контракт успешно выполнен');
                break;
            case ContractState.pending:
                this.signAndTransfer();
                break;          
        }
    }
    public rejectTransfer() : void {
        clearTimeout(this.Timer);
        if (this._state !== ContractState.rejected) {
            this._state = ContractState.rejected;
            console.log('Контракт отменён');
        } else {
            console.log('Контракт уже и так был отменён');
        }
    }
}
export class SmartContract extends Contract{
    constructor(value: Currency, sender: Vault, receiver: Vault) {
        super(value, sender, receiver, CurrencyType.Crypto, 3000);
    }
}
export class BankingContract extends Contract{
    constructor(value: Currency, sender: Vault, receiver: Vault) {
        super(value, sender, receiver, CurrencyType.Material, 0);
    }
}

export class LogisticContract extends Contract{
    constructor(value: Currency, sender: Vault, receiver: Vault) {
        super(value, sender, receiver, CurrencyType.Metal, 6000);
    }
}


export interface IContract{
    /**
     * Уникальный номер контракта
     */
    id: number,
    /**
     * Текущее состояние контракта
     */
    state: ContractState,
    /**
     * Предмет контракта
     */
    value: Currency,
    /**
     * Реквизиты отправителя
     */
    sender: Vault,
    /**
     * Реквизиты получателя
     */
    receiver: Vault,
    /**
     * Начало исполнения контракта
     */
    signAndTransfer: () => void,
    /**
     * Успешное завершение контракта
     */
    closeTransfer: () => void,
    /**
     * Отмена исполнения контракта
     */
    rejectTransfer: () => void
}

export enum ContractState{
    /**
     * Контракт находится в ожидании исполнения
     */
    pending,
    /**
     * Контракт находится в исполнении
     */
    transfer,
    /**
     * Контракт исполнен успешно
     */
    close,
    /**
     * Контракт отменен, либо отклонен
     */
    rejected
}