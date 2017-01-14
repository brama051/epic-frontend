import {Component, OnInit, Input} from '@angular/core';
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

  constructor(private sequenceService: SequenceService) {
    this.sequence = new Sequence(0, "", "", "");
    this.isNewSequence = false;
    this.sequence.sequenceNumber = 0;
    this.sequence.purpose = "";
    this.sequence.byUser = localStorage.getItem('username');
  }

  ngOnInit() {
  }

  openModal(){
    if(this.isNewSequence){
      this.sequence.purpose = "";
      this.requestNewSequence();
    }else{
      this.getSequence();
    }
  }

  closeModal(){
    this.showSelf = false;
  }

  getSequence(){
    this.sequenceService.getSequence(localStorage.getItem('token'), this.sequence.sequenceNumber)
      .subscribe(
        data => {
          console.log("Existing sequence fetched:");
          console.log(data);
          this.sequence.sequenceNumber = data.sequenceNumber;
          this.sequence.byUser = data.byUser;
          this.sequence.purpose = data.purpose;
          //console.log(data.date);
          //console.log(new Date(data.date).toLocaleDateString());
          this.sequence.date = data.date;
          this.showSelf = true;
        },
        error => {
          console.log('Error fetching data');
          console.log(error.toString());
        });
  }

  requestNewSequence(){
    this.sequenceService.requestNewSequence(localStorage.getItem('token'))
      .subscribe(
        data => {
          console.log("New sequence granted:");
          console.log(data);
          this.sequence.sequenceNumber = data.sequenceNumber;
          this.sequence.byUser = localStorage.getItem('username');
          let date: string = new Date().toJSON();
          this.sequence.date = date.slice(0, date.indexOf('T'));

          this.showSelf = true;
        },
        error => {
          console.log('Error fetching data');
          console.log(error.toString());
        });
  }

  claimNewSequence(){
    this.sequenceService.createNewSequence(localStorage.getItem('token'), this.sequence)
      .subscribe(
        data => {
          console.log("New sequence granted:");
          console.log(data);
          this.sequence.sequenceNumber = data.sequenceNumber;
          this.sequence.byUser = localStorage.getItem('username');
          let date: string = new Date().toJSON();
          this.sequence.date = date.slice(0, date.indexOf('T'));

          this.showSelf = true;
        },
        error => {
          console.log('Error fetching data');
          console.log(error.toString());
        });
  }
}
