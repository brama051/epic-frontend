import {Component, OnInit, sequence} from '@angular/core';
import {Sequence} from "../_models/sequence";
import {SequenceListService} from "../_services/sequence-list.service";

@Component({
  selector: 'ef-sequence-list',
  templateUrl: './sequence-list.component.html',
  styleUrls: ['./sequence-list.component.css']
})
export class SequenceListComponent implements OnInit {

  filter: string;
  page: number;
  itemsPerPage: number;
  sequenceList: Sequence[];



  constructor(private sequenceListService: SequenceListService) {
    this.filter = "";
    this.page = 1;
    this.itemsPerPage = 5;
  }

  ngOnInit() {

  }

  getPage(){
    this.sequenceListService.getPageFromServer(localStorage.getItem('token'), this.page, this.itemsPerPage, this.filter)
      .subscribe(
        data => {
          console.log(data);
          this.sequenceList = data.list;

        },
        error => {
          //this.alertService.error(error);
          //this.loading = false;
        });
  }

  filterData(){
    console.log('Attempting to filter data');
    this.getPage();
  }


}
