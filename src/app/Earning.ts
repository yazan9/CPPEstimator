export class Earning {
  Year: string;
  Value: number;
  Selected: boolean;
  
  public constructor(init?:Partial<Earning>) {
        Object.assign(this, init);
    }
}