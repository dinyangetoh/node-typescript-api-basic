export default class BaseController {
    constructor() {
        this.bindMethods();
    }

    private bindMethods(): void {
        const prototype = Object.getPrototypeOf(this);
        const propertyNames = Object.getOwnPropertyNames(prototype);

        for (const name of propertyNames) {
            if (name !== 'constructor' && typeof this[name] === 'function') {
                this[name] = this[name].bind(this);
            }
        }
    }
}
