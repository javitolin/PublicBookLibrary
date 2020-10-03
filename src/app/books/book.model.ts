import { Reader } from '../readers/reader.model';


export class Book {
    constructor(public id: number, public title: string, public author: string,
        public owner: string, public is_available: boolean, public readers: Reader[] = []) { }

    isAvailable(): boolean {
        return this.is_available;
    }

    takeBook(reader: string): boolean {
        if (!this.is_available) {
            return false;
        }

        this.is_available = false;
        this.readers.push(new Reader(reader));
        return true;
    }
}