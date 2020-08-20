import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  //aspetta che arrivi un valore da auth component
  @Input() message: string
  @Output() close = new EventEmitter<void>();

  constructor() { }

  onClose(){
    this.close.emit();
  }


}
