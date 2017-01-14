import {Component, OnInit, sequence, ViewChild} from '@angular/core';
import {Sequence} from "../_models/sequence";
import {SequenceListService} from "../_services/sequence-list.service";
import {PopupComponent} from "../popup/popup.component";

@Component({
  selector: 'ef-sequence-list',
  templateUrl: './sequence-list.component.html',
  styleUrls: ['./sequence-list.component.css']
})
export class SequenceListComponent implements OnInit {

  private filter: string;
  private page: number;
  private itemsPerPage: number;
  private sequenceList: Sequence[];
  private totalPages: number;
  @ViewChild(PopupComponent)
  private popupComponent: PopupComponent;

  constructor(private sequenceListService: SequenceListService) {
    this.filter = "";
    this.page = 1;
    this.itemsPerPage = 5;
    this.sequenceList = [];
    this.totalPages = 1;

  }

  ngOnInit() {
    console.log('Fetching the initial data');
    this.getPage();
  }

  getPage(){
    this.sequenceListService.getPageFromServer(localStorage.getItem('token'), this.page, this.itemsPerPage, this.filter)
      .subscribe(
        data => {
          this.sequenceList = [];
          console.log(data);
          this.totalPages = data.totalPages;
          data.list.forEach((arrayItem)=>{

            this.sequenceList.push(new Sequence(arrayItem.sequenceNumber, arrayItem.byUser, arrayItem.purpose, arrayItem.date));
          });
        },
        error => {
          console.log('Error fetching data');
          console.log(error.toString());
        });
  }

  filterData() {
    console.log('Attempting to filter data');
    this.page = 1;
    this.getPage();
  }

  nextPage() {
    console.log('Requesting next page');
    console.log('Current page:' + this.page);
    console.log('Total pages:' + this.totalPages);
    if(this.page < this.totalPages){
      this.sequenceListService.getPageFromServer(localStorage.getItem('token'), this.page + 1, this.itemsPerPage, this.filter)
        .subscribe(
          data => {
            this.sequenceList = [];
            this.totalPages = data.totalPages;
            this.page ++;
            data.list.forEach((arrayItem)=>{
              this.sequenceList.push(new Sequence(arrayItem.sequenceNumber, arrayItem.byUser, arrayItem.purpose, arrayItem.date));
            });
          },
          error => {
            console.log('Error fetching data');
          });
    }
  }
  previousPage() {
    console.log('Requesting previous page');
    console.log('Current page:' + this.page);
    console.log('Total pages:' + this.totalPages);
    if(this.page > 1){
      this.sequenceListService.getPageFromServer(localStorage.getItem('token'), this.page - 1, this.itemsPerPage, this.filter)
        .subscribe(
          data => {
            this.sequenceList = [];
            this.totalPages = data.totalPages;
            this.page --;
            data.list.forEach((arrayItem)=>{
              this.sequenceList.push(new Sequence(arrayItem.sequenceNumber, arrayItem.byUser, arrayItem.purpose, arrayItem.date));
            });
          },
          error => {
            console.log('Error fetching data');
          });
    }
  }

  onEnter() {
    this.page = 1;
    this.getPage();
  }

  onKey(){

  }

  doShowModal(sequenceNumber: number){
    this.popupComponent.isNewSequence = false;
    this.popupComponent.openModal(sequenceNumber);


  }

  doClaimNew(){
    this.popupComponent.isNewSequence = true;
    this.popupComponent.openModal(0);

  }
}
