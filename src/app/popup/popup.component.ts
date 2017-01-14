import {Component, OnInit, Input, sequence, EventEmitter, Output} from '@angular/core';
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
  @Input() public showSelf: boolean = false;
  private token: string;
  private message: string;
  @Output() onNewSequence = new EventEmitter<boolean>();

  constructor(private sequenceService: SequenceService) {
    this.sequence = new Sequence(0, "", "", "");
    this.isNewSequence = false;
    this.sequence.sequenceNumber = 0;
    this.sequence.purpose = "";
    this.sequence.byUser = localStorage.getItem('username');
    this.token = localStorage.getItem('token');
    this.message = "";
  }

  ngOnInit() {
  }

  openModal(sequenceNumber: number){
    this.sequence = new Sequence(0, "", "", "");
    this.message = "";
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
    this.message = "";
    console.log(this.sequence);

    if(this.sequence.purpose.length < 1){
      this.message += "Opis mora biti minimalno duljine jednog znaka. ";
    }else{
      this.sequenceService.createNewSequence(this.token, this.sequence)
        .subscribe(
          data => {
            console.log(data);
            let success:boolean = true;
            if(this.sequence.sequenceNumber !== data.sequenceNumber){
              success = false;
              this.message += "Greška, sekvenca se promijenila, pokušajte ponovo. ";
              this.sequence.sequenceNumber = data.sequenceNumber;
            }

            if(this.sequence.byUser !== data.byUser){
              success = false;
              this.message += "Greška, krivi korisnik.";
              this.sequence.byUser = data.byUser;
            }

            if(success){
            this.onNewSequence.emit(true);
              this.closeModal();

            }

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


}
