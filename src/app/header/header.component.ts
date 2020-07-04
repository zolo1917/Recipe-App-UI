import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() emitHeaderSelect = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(choice : string ){
    this.emitHeaderSelect.emit(choice);
  }
}
