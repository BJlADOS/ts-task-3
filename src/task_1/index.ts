/** Задача 1 - Сущность любой монетки
 * Опишите класс валюты
 * Он должен определять имя(name) валюты, String
 * Содержать количество(_value) валюты, Number
 * Содержать количественный тип(unit), в котором исчисляется валюта, String
 * Класс должен предоставлять информацию о типе валюты: Материальная, криптовалюта или металл-депозит
 * Example new Currency("DOGE", 12.5, "satoshi")
 */

export class Currency{
    public readonly name: string;
    private _value: number;
    public readonly unit: string;
    public readonly Type: CurrencyType;
    constructor(name: string, value: number, unit: string, type? : CurrencyType) {
        if(value < 0 || !name || !unit) {
            throw new Error("Неверные аргументы");
        }        
        this.name = name;
        this._value = value;
        this.unit = unit;
        if (!type) {           
            for (let i = 1; i < 4; i++) {
                if (Names[i - 1].includes(name)) {
                    this.Type = i;
                    break;
                }               
            }
            if (!this.Type) {
                throw new Error('Такой валюты не существует');
            }
        } else {
            this.Type = type
        }
    }

    get value() {
        return this._value;
    }
    set value(newValue: number) {
        if (newValue >= 0) {
            this._value = newValue;
        } else {
            throw new Error('Значение некорректно');
        }
    }
}

export enum CurrencyType {
    Material = 1,
    Crypto = 2,
    Metal = 3,   
}

const MaterialCurrencyNames = ['ru', 'Dollar', 'Ruble'];
const CryptoCurrencyNames = ['Etherium', 'XRP',];
const MetalNames = ['Gold'];
const Names = [MaterialCurrencyNames, CryptoCurrencyNames, MetalNames]