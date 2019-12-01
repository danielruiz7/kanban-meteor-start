import { Component, OnDestroy, OnInit } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs';

import { addListMethod, removeListMethod } from '../../../api/lists/lists.methods';
import { IList, Lists } from '../../../models/list.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'kanban',
  templateUrl: 'kanban.component.html'
})
export class KanbanComponent implements OnInit, OnDestroy {

  lists: IList[];

  sub: Subscription;
  autorun: Subscription;

  constructor(public us: UserService) { }

  ngOnInit() {
    this.sub = MeteorObservable.subscribe('lists-publication').subscribe(() => {
      this.autorun = MeteorObservable.autorun().subscribe(() => {
        this.lists = Lists.collection.find().fetch();
      });
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
    if (this.autorun) this.autorun.unsubscribe();
  }

  logout() {
    this.us.logout();
  }

  addList(name: string) {
    addListMethod.call({ name }, (err) => { });
  }

  removeList(listId: string) {
    removeListMethod.call({ listId }, (err) => { });
  }
}