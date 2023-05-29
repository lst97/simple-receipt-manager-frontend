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
      // JSON response to String[]
      //  {
      //   "data": [
      //     {
      //       "id": "6472af7b086d0d10ccc4928f",
      //       "name": "ST Zita",
      //       "records": [
      //         "6472af7b086d0d10ccc49285"
      //       ],
      //       "users": [
      //         "6472af7a086d0d10ccc4926c"
      //       ]
      //     },
      //     {
      //       "id": "6472af7b086d0d10ccc49290",
      //       "name": "Deakin",
      //       "records": [
      //         "6472af7b086d0d10ccc49286"
      //       ],
      //       "users": [
      //         "6472af7a086d0d10ccc4926d"
      //       ]
      //     },
      //     {
      //       "id": "6472af7b086d0d10ccc49291",
      //       "name": "Glen Waverley",
      //       "records": [
      //         "6472af7b086d0d10ccc49287"
      //       ],
      //       "users": [
      //         "6472af7a086d0d10ccc4926e"
      //       ]
      //     }
      //   ],
      //   "message": "Success",
      //   "meta_data": null,
      //   "pagination": null,
      //   "status_code": 200
      // }

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
