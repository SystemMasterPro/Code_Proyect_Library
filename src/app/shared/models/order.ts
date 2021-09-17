export class Order {
    user: number | undefined;
    book: number | undefined;
    state?: boolean;
    deliver_date: string | undefined;
}

export class Book {
    id?: number;
    title?: string;
    author?: string;
    state?: boolean;
    stock?: number;
    borrowed?: number;
    image?: string;
    category?: number;
}
