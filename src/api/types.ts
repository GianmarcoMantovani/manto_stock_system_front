export interface KeyValuePair {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
  
  export interface AuthResponse {
    authToken: {
      token: string;
      expiresIn: number;
    };
    tokenType: string;
    authState: ApplicationUser;
    error: {
      code: string;
      description: string;
    };
  }
  
  export enum UserType {
    Admin,
    User,
  }
  
  export interface ApplicationUser {
    id: string;
    fullName: string;
    email: string;
    password: string;
    userType: UserType;
  }
  
  export interface ApiListResponse<T> {
    items: T[];
    totalCount: number;
  }
  
  export interface FilterItem {
    field: string;
    value: any;
  }
  
  export interface ApiRange {
    start: number;
    end: number;
  }
  
  export interface Sort {
    field: string;
    isAscending: boolean;
  }
  
  export interface PatchObject {
    path: string;
    op: string;
    value: any;
  }

  export interface City {
    id: number;
    name: string;
    zipCode: string;
  }

  export enum ClientTypeEnum {
    Distribuidor,
    Comercio,
    Publico
  }

  export interface Client {
    id: number;
    name: string;
    clientTypeEnum: ClientTypeEnum;
    city: City;
    phoneNumber: string;
    address: string;
    attentionHours: string;
  }

  export interface Product {
    id: number;
    name: string;
    stock: number;
    weight: number;
    description: string;
  }

  export interface ProductionItem {
    id: number;
    product: Product;
    amount: number;
    production: Production;
  }

  export interface ProductionItemCreation {
    productId: number | null;
    amount: number | null;
  }

  export interface Production {
    id: number;
    items: ProductionItem[];
    date: Date;
    totalProduction: number;
  }

  export interface Provider {
    id: number;
    name: string;
    company: string;
    city: City;
    address: string;
    phoneNumber: string;
    products: string;
    attentionHours: string;
  }

  export interface Purchase {
    id: number;
    products: string;
    description: string;
    provider: Provider;
    amount: number;
    date: Date;
  }

  export interface SaleItem {
    id: number;
    product: Product;
    amount: number;
    sale: Sale;
    unitPrice: number;
  }

  export interface SaleItemCreation {
    productId: number | null;
    amount: number | null;
    unitPrice: number | null;
  }

  export interface Sale {
    id: number;
    name: string;
    description: string;
    items: SaleItem[];
    client: Client;
    date: Date;
    totalPrice: number;
    sold: boolean;
  }

  export interface Balance {
    id: number;
    totalCapital: number;
  }
  
