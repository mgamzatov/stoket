export class FilterParameters {
  public brand:string = null;
  public description:string = null;
  public priceMax:number = null;
  public priceMin:number = null;
  public shopId:number = null;
  public shopName:string = null;
  public shopAddress:string = null;
  public shopPhone:string = null;
  public typeId:number = null;
  public typeName:string = null;
  public gender:number = null;


  constructor(fields?: Partial<FilterParameters>) {
    (<any>Object).assign(this, fields)
  }
}
