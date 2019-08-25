export class Earning {
  Year: string;
  Value: number;
  
  public constructor(init?:Partial<Earning>) {
        Object.assign(this, init);
    }
}