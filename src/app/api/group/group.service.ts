import { LoggerService } from './../../log/logger.service';
import { AppConfig } from './../../AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from './../../AppConfig/appconfig.service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateGroup } from './group';
import { startWith, map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  stateForm!: FormGroup;
  stateGroups: StateGroup[] = [];
  stateGroupOptions!: Observable<StateGroup[]>;

  private _constructSearchBar(res: any): void {
    res.forEach((element: any) => {
      let firstLetter = element.name[0];
      let groupIndex = this.stateGroups.findIndex(
        (letter) => letter['letter'][0] == firstLetter
      );

      // create the object if not found
      if (groupIndex == -1) {
        let state: StateGroup = {
          letter: firstLetter,
          names: [element.name],
        };
        this.stateGroups.push(state);
      } else {
        this.stateGroups[groupIndex]['names'].push(element.name);
      }
    });
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

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient,
    private log: LoggerService
  ) {
    this.log.info('GroupService Initialized.');
  }

  // Method for making a GET request
  getGroups(): Observable<any> {
    return this.http.get<string>(`${this.config.apiEndpoint}/groups`);
  }

  // TODO: fix duplicated subscribe call use sharReplay?
  getGroupsName(): Observable<any> {
    let observable = this.http.get<any>(
      `${this.config.apiEndpoint}/groups_name`
    );
    observable.subscribe((response) => {
      this._constructSearchBar(response);
    });
    return observable;
  }

  getStateGroupOptions(): Observable<StateGroup[]> {
    this.stateGroupOptions = this.stateForm
      .get('stateGroup')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterGroup(value || ''))
      );
    return this.stateGroupOptions;
  }

  // Method for making a POST request
  post(url: string, body: any): Observable<any> {
    return this.http.post<any>(url, body);
  }

  // Method for making a PUT request
  put(url: string, body: any): Observable<any> {
    return this.http.put<any>(url, body);
  }

  // Method for making a DELETE request
  delete(url: string): Observable<any> {
    return this.http.delete<any>(url);
  }
}
