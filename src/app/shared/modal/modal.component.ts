import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations:[
    trigger('modalAnimation', [
      state('open', style({opacity: 1, top: '0'})),
      state('close', style({opacity: 1,  top: '20px'})),
      transition('close => open', [ animate('.2s')]),
      transition('open => close', [ animate('.2s')])

    ])
    

    // transition: {}
  ],
  encapsulation: ViewEncapsulation.None 
})
export class ModalComponent implements OnInit {

  isopenModal: boolean = false

  @ViewChild('modal') modal: ElementRef;

  constructor(private client: Renderer2) { }

  ngOnInit(): void {
  }

  open(){
    this.modal.nativeElement.display = 'block';
    // this.modal.on.show('modal')
    this.client.setStyle( this.modal.nativeElement, 'display', 'block');
    this.client.addClass( this.modal.nativeElement, 'show');
    this.isopenModal = true;
  }

  close(){
    this.isopenModal = false;
    this.client.removeClass( this.modal.nativeElement, 'show');
    this.client.setStyle( this.modal.nativeElement, 'display', 'none');

  }


}
 