import {Component, OnInit, Input} from '@angular/core';
import {SequenceService} from "../_services/sequence.service";

@Component({
  selector: 'ef-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() public isNewSequence: boolean;
  @Input() public sequenceNumber: number;
  @Input() public byUser: string;
  @Input() public purpose: string;
  @Input() public date: string;
  @Input() public showSelf: boolean = false;

  constructor(private sequenceService: SequenceService) {
    this.isNewSequence = false;
    this.sequenceNumber = 0;
    this.purpose = "";
    this.byUser = localStorage.getItem('username');
  }

  ngOnInit() {
  }

  openModal(){
    this.showSelf = true;
    if(this.isNewSequence){
      this.requestNewSequence();
    }else{
      this.getSequence();
    }
  }

  closeModal(){
    this.showSelf = false;
  }

  getSequence(){
    this.sequenceService.getSequence(localStorage.getItem('token'), this.sequenceNumber)
      .subscribe(
        data => {

          console.log(data);

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

          console.log(data);

        },
        error => {
          console.log('Error fetching data');
          console.log(error.toString());
        });
  }
}
