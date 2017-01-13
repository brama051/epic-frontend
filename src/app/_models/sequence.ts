export class Sequence {

  public sequenceNumber: number;
  public byUser: string;
  public purpose: string;
  public date: string;

  constructor(sequenceNumber: number, byUser: string, purpose: string, date: string) {
    this.sequenceNumber = sequenceNumber;
    this.byUser = byUser;
    this.purpose = purpose;
    this.date = date;
  }


}
