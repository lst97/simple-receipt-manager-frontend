import { NewGroupDialogComponent } from './new-group-dialog/new-group-dialog.component';
import { LoggerService } from '../../logger/logger.service';
import { GroupService } from './../../api/group/group.service';
import { GroupsInfo, GroupData, StateGroup } from './../../api/group/group';
import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
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
    @Optional() private loggerService: LoggerService,
    private dialog: MatDialog
  ) {
    this.groupInfo = { len: 0, records: [] };
    this.groupList = [];
    this.groupService.stateForm = this.stateForm;
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
    this.groupService.getGroupsName().subscribe((response) => {
      this.loggerService?.success(
        JSON.stringify(response),
        'navbar.component',
        'this.groupService.getGroupsName().subscribe()'
      );

      // JSON response to String[]
      // EX: [{"name":"group_1"},{"name":"group_2"}] -> ["group_1", "group_2"]
      this.groupInfo.len = response.length;
      response.forEach((element: any) => {
        this.groupInfo.records.push({
          name: element.name,
          id: element._id.$oid,
        });
      });
    });

    this.stateGroupOptions = this.groupService.getStateGroupOptions();
  }
}
