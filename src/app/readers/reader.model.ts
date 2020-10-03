import { formatDate } from '@angular/common';

export class Reader {
    constructor(public name: string, public taken_date: Date = new Date()) { }

    printVersion() : string {
        return formatDate(this.taken_date, "dd/MM/yyyy", "en-US");
    }
}