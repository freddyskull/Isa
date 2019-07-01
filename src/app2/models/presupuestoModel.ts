export interface presupuesto{
    id?:number;
    name?:string;
    stock?:number;
    price?:number;
    priceAll?:number;
    price2?:number;
    price3?:number;
    price4?:number;
    priceB?: string;
    priceS?: string;
    recibo?: string;
    create_at?: Date;
    description?: string;
    description2?: string;
    category?: string;
    img?: string;
    iva?: boolean;
    direccion?:"";
}