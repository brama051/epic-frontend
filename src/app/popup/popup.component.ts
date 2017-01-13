import {Component, OnInit, Input} from '@angular/core';

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
  @Input() public hideModal: boolean = false;

  constructor() {}

  ngOnInit() {
  }

  closeModal(){
    this.hideModal = true;
  }
}
