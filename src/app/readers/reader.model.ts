import { formatDate } from '@angular/common';

export class Reader {
    public name: string
    public taken_date: string
    
    constructor(jsonString) {
        console.log(jsonString)
        this.name = jsonString.readerName
        this.taken_date = jsonString.taken_date
     }

    printVersion() : string {
        // return formatDate(this.taken_date, "dd/MM/yyyy", "en-US");
        return this.taken_date
    }
}