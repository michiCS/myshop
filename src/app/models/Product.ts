export class Product{
    id : number;
    name: string;
    price: number;
    encodedImage : string;
    isInWishlist: boolean = false;
    imagePath: string;
    description: string;
    deleted: boolean;
}