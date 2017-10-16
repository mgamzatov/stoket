import {Type} from "./Type";
import {Shop} from "./Shop";

export class Product {
  public id:number;
  public brand:string;
  public description:string;
  public price:number;
  public imageUrls:string[];
  public type:Type;
  public shop:Shop;
  public gender:number;
}
