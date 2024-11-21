export interface Product {
    id:                  number;
    product_name:        string;
    price:               number;
    discount_price:      number;
    discount:            boolean;
    product_description: string;
    image:               null;
    stock:               number;
    brand_id:            number;
    presentation_id:     number;
    status:              boolean;
    createdAt:           Date;
    updatedAt:           Date;
    presentation:        Presentation;
    brand:               Brand;
}

export interface Brand {
    id:                 number;
    brand_name?:        string;
    createdAt:          Date;
    updatedAt:          Date;
}

export interface Presentation {
    id:        number;
    presentation_name: string;
    createdAt: Date;
    updatedAt: Date;
}