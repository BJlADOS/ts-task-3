/** Задача 2 - Много стран, много валют
 * Определите классы следующих валют
 * Dollar
 * Ruble
 * XRP
 * Etherium
 * Gold
*/

import { Currency, CurrencyType } from "../task_1";

export class Dollar extends Currency{
    constructor(value: number) {
        super('Dollar', value, 'USD', CurrencyType.Material);
    }
}

export class Ruble extends Currency{
    constructor(value: number) {
        super('Ruble', value, 'RUB', CurrencyType.Material);
    }
}

export class XRP extends Currency{
    constructor(value: number) {
        super('XRP', value, 'XRP', CurrencyType.Crypto);
    }
}

export class Etherium extends Currency{
    constructor(value: number) {
        super('Etherium', value, 'ETH', CurrencyType.Crypto);
    }
}

export class Gold extends Currency{
    constructor(value: number) {
        super('Gold', value, 'gramm', CurrencyType.Metal);
    }
}