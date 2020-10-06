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
        this.id = jsonText._id
        this.title =  jsonText.title
        this.author = jsonText.author
        this.owner = jsonText.owner
        this.take_date = jsonText.take_date
        this.is_available = jsonText.is_available
        
        jsonText.readers?.forEach(reader => {
            this.readers.push(reader)
        });
        
        this.searchString = this.title + this.author + this.owner;
    }

    isMatchQuery(query: string): boolean {
        return this.searchString.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }
}