import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { IList } from '../../../../models/list.model';

@Component({
  selector: 'kanban-board',
  templateUrl: 'kanban-board.component.html',
  styleUrls: ['kanban-board.component.scss']
})

export class KanbanBoardComponent implements OnInit {
  @ViewChild('newListNameInput', { static: true }) newListNameInput: ElementRef;

  @Input() lists: IList[];

  @Output() onAddList = new EventEmitter<String>();
  @Output() onRemoveList = new EventEmitter<String>();

  newListName = '';

  constructor() { }

  ngOnInit() { }

  addList() {
    this.onAddList.emit(this.newListName);
    this.newListName = '';
    this.newListNameInput.nativeElement.focus();
  }

  removeList(listId) {
    this.onRemoveList.emit(listId);
  }
}