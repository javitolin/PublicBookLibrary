import { Reader } from '../readers/reader.model';


export class Book {
    private searchString: string;
    public is_available: boolean = true
    public readers: string[] = []
    public id: number
    public take_date: Date
    public title: string
    public author: string
    public owner: string

    constructor(jsonText) {
        this.id = jsonText.id
        this.title =  jsonText.title
        this.author = jsonText.author
        this.owner = jsonText.owner
        this.take_date = jsonText.take_date
        this.is_available = jsonText.is_available
        
        jsonText.readers.forEach(reader => {
            this.readers.push(reader)
        });
        
        this.searchString = this.title + this.author + this.owner;
    }

    isAvailable(): boolean {
        return this.is_available;
    }

    canTakeBook(reader: string): boolean {
        if (!this.is_available) {
            return false;
        }

        this.is_available = false;
        this.readers.push(reader);
        return true;
    }

    returnBook(reader: string): boolean {
        if (this.is_available) {
            return false;
        }

        if (this.readers[this.readers.length - 1].toLowerCase() != reader.toLowerCase()) {
            return false;
        }

        this.is_available = true;
        return true;
    }

    getLastReader(): String {
        if (this.readers.length == 0) {
            return null;
        }

        return this.readers[this.readers.length - 1];
    }

    isMatchQuery(query: string): boolean {
        return this.searchString.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }
}