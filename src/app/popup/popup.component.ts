import {Component, OnInit, Input, sequence} from '@angular/core';
import {SequenceService} from "../_services/sequence.service";
import {Sequence} from "../_models/sequence";

@Component({
  selector: 'ef-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() public isNewSequence: boolean;
  public sequence: Sequence;
  //public sequenceNumber: number;
  //public byUser: string;
  //public purpose: string;
  //public date: string;
  @Input() public showSelf: boolean = false;
  private token;

  constructor(private sequenceService: SequenceService) {
    this.sequence = new Sequence(0, "", "", "");
    this.isNewSequence = false;
    this.sequence.sequenceNumber = 0;
    this.sequence.purpose = "";
    this.sequence.byUser = localStorage.getItem('username');
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
  }

  openModal(sequenceNumber: number){
    this.sequence = new Sequence(0, "", "", "");
    if(this.isNewSequence){
      this.sequence.purpose = "";
      this.requestNewSequence();
    }else{
      this.sequence.sequenceNumber = sequenceNumber;
      this.getSequence();
    }
  }

  closeModal(){
    this.showSelf = false;
  }

  getSequence(){
    this.sequenceService.getSequence(this.token, this.sequence.sequenceNumber)
      .subscribe(
        data => {
          this.sequence.sequenceNumber = data.sequenceNumber;
          this.sequence.byUser = data.byUser;
          this.sequence.purpose = data.purpose;
          this.sequence.date = data.date;

        },
        error => {
          console.log('Error fetching data');
          console.log(error.toString());
        },
        () => {
          console.log('Done');
          this.showSelf = true;
        });
  }

  requestNewSequence(){
    this.sequenceService.requestNewSequence(this.token)
      .subscribe(
        data => {
          this.sequence.sequenceNumber = data.sequenceNumber;
          this.sequence.byUser = localStorage.getItem('username');
          let date: string = new Date().toJSON();
          this.sequence.date = date.slice(0, date.indexOf('T'));
        },
        error => {
          console.log('Error fetching data');
          console.log(error.toString());
        },
        () => {
          console.log('Done');
          this.showSelf = true;
        }
      );
  }

  claimNewSequence(){
    this.sequenceService.createNewSequence(this.token, this.sequence)
      .subscribe(
        data => {
          this.sequence.sequenceNumber = data.sequenceNumber;
          this.sequence.byUser = data.byUser();//localStorage.getItem('username');
          let date: string = new Date().toJSON();
          this.sequence.date = date.slice(0, date.indexOf('T'));
        },
        error => {
          console.log('Error fetching data');
          console.log(error.toString());
        },
        () => {
          console.log('Done');
        }
      );
  }


}
