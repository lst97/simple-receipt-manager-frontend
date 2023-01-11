import { LoggerService } from './../../log/logger.service';
import { GroupService } from './../../api/group/group.service';
import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};

/**
 * @title Option groups autocomplete
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  groupsName: string[];
  groupList: any;

  footerGroups: string[] = ['Setting', 'Feedback', 'Logout'];

  stateForm = this._formBuilder.group({
    stateGroup: '',
  });

  stateGroups: StateGroup[] = [
    {
      letter: 'A',
      names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas'],
    },
  ];

  stateGroupOptions!: Observable<StateGroup[]>;

  constructor(
    private _formBuilder: FormBuilder,
    private groupService: GroupService,
    @Optional() private loggerService: LoggerService
  ) {
    this.groupsName = [];
  }

  ngOnInit() {
    this.groupService.getGroups().subscribe((response) => {
      this.groupList = response;

      this.loggerService?.success(
        JSON.stringify(this.groupList),
        'navbar.component',
        'this.groupService.getGroups().subscribe()'
      );
    });

    this.groupService.getGroupsName().subscribe((response) => {
      this.loggerService?.success(
        JSON.stringify(response),
        'navbar.component',
        'this.groupService.getGroupsName().subscribe()'
      );

      response.forEach((element: any) => {
        this.groupsName.push(element['name']);
      });
      this.loggerService?.success(
        JSON.stringify(this.groupsName),
        'navbar.component',
        'this.groupService.getGroupsName().subscribe()'
      );
    });

    this.stateGroupOptions = this.stateForm
      .get('stateGroup')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterGroup(value || ''))
      );
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map((group) => ({
          letter: group.letter,
          names: _filter(group.names, value),
        }))
        .filter((group) => group.names.length > 0);
    }

    return this.stateGroups;
  }
}
