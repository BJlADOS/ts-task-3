/**
 * Задание 5 - Власть банков
 * В этой задаче вам нужно реализовать класс контроллер
 * 1. registerVault(): ISecureVaultRequisites - регистрирует хранилище в банке
 * 2. proceedContract(IContract): void - проводит договор между счетами
 * 3. Класс контроллера должен быть реализацией паттерна Singleton
 *
 * Хранилища должны быть сохранены в массив vaultStore: Vault[]
 */
import { IContract, Contract } from "../task_4";
import { ISecureVaultRequisites, Vault } from "../task_3";

export class BankController{
    private static instance: BankController
    public readonly Vaults: Array<Vault>;
    private constructor() {
        this.Vaults = new Array<Vault>();
    }
    public static getInstance() : BankController {
        if (this.instance === null) {
            this.instance = new BankController();
        } else { 
        return this.instance;
        }
    }
    public registerVault(): ISecureVaultRequisites{
        const vault = new Vault();
        this.Vaults.push(vault);
        
        return vault;
    }

    public proceedContract(contract: IContract) : void {
        if (contract instanceof Contract) {
            contract.signAndTransfer();
        } else {
            throw new Error('Некорректный контракт');
        }
    }
}

