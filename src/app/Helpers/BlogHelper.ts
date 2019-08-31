import { Month } from '../Models/Months'

export class BlogHelper
{
    public static PrintDate(UnformattedDate: Date) : string
    {
      return Month[UnformattedDate.getMonth()].toUpperCase() + ' ' + UnformattedDate.getDate() + ', '+ UnformattedDate.getFullYear()
    }
}