import { NewGroupDialogComponent } from './new-group-dialog/new-group-dialog.component';
import { LoggerService } from '../../logger/logger.service';
import { GroupService } from './../../api/group/group.service';
import { GroupsInfo, GroupData, StateGroup } from './../../api/group/group';
import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { EventBusService } from 'src/app/services/event-bus/event-bus.service';
import { UserLoginEvent } from 'src/app/services/event-bus/events/user-login.event';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  groupInfo: GroupsInfo;
  groupList: GroupData[];
  stateForm = this._formBuilder.group({
    stateGroup: '',
  });
  stateGroupOptions!: Observable<StateGroup[]>;

  footerGroups: string[] = ['Setting', 'Feedback', 'Logout'];

  constructor(
    private groupService: GroupService,
    private _formBuilder: FormBuilder,
    private eventBusService: EventBusService,
    @Optional() private loggerService: LoggerService,
    private dialog: MatDialog
  ) {
    this.groupInfo = { len: 0, records: [] };
    this.groupList = [];
    this.groupService.stateForm = this.stateForm;
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  openNewGroupDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.maxHeight = 'none';
    dialogConfig.enterAnimationDuration = enterAnimationDuration;
    dialogConfig.exitAnimationDuration = exitAnimationDuration;

    this.dialog.open(NewGroupDialogComponent, dialogConfig);
  }

  ngOnInit() {
    // Subscribe to the UserLoggedInEvent
    this.eventBusService.subscribe((event: any) => {
      if (event instanceof UserLoginEvent) {
        this.getGroupList();
      }
    });
  }

  getGroupList() {
    this.groupService.getGroupsName().subscribe((response) => {
      let data = response.data;
      this.groupInfo.len = data.length;
      data.forEach((element: any) => {
        this.groupInfo.records.push({
          name: element.name,
          id: element.id,
        });
      });
    });

    this.stateGroupOptions = this.groupService.getStateGroupOptions();
  }
}
