import { Reader } from '../readers/reader.model';


export class Book {
    private static _id: number = 0;
    public id: number;
    public is_available: boolean = true
    public readers: Reader[] = []

    constructor(public title: string, public author: string, public owner: string) {
        this.id = Book._id++;
    }

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

    returnBook(reader: string): boolean {
        if (this.is_available) {
            return false;
        }

        if (this.readers[this.readers.length - 1].name.toLowerCase() != reader.toLowerCase()) {
            return false;
        }

        this.is_available = true;
        return true;
    }

    getLastReader(): Reader {
        if (this.readers.length == 0) {
            return null;
        }

        return this.readers[this.readers.length - 1];
    }
}