
export interface IProduct {
    id :  string
    name :string 
    description :string
    price: number
    quantity: number
    image :IFiles
    stock :  boolean
    createdAt : Date
    categoriesId: string
}


export interface IFiles {
  name: string;
  data: Data;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
}

interface Data {
  type: string;
  data: any[];
}