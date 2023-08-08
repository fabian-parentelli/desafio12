export class UserNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    };
};

export class IncorrectLoginCredentials extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    };
};

export class UserAlreadyExist extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    };
};

export class CartNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    };
};

export class SortNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    };
};

export class ThisPageNoExist extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    };
};

export class ProductNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    };
};

export class IncompleteValue extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    };
};

export class TheCodeIsRepeted extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    };
};

export class DontHavePermission extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    };
};

export class TicketNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    };
};