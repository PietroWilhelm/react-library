class BookModel {
    id: number;
    title: string;
    author?: string;
    description?: string;
    copies?: number;
    copiesAvalable?: number;
    category?: string;
    img?: string;

    constructor(id: number, title: string, author?: string, copies?: number, copiesAvalable?: number, category?: string, description?: string, img?: string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.copies = copies;
        this.copiesAvalable = copiesAvalable;
        this.category = category;
        this.description = description;
        this.img = img;
    }
}

export default BookModel;