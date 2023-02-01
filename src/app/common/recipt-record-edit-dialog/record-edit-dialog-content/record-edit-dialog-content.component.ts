import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'record-edit-dialog-content',
  templateUrl: './record-edit-dialog-content.component.html',
  styleUrls: ['./record-edit-dialog-content.component.scss'],
})
export class RecordEditDialogContentComponent implements OnChanges {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  formCtrl = new FormControl('', [
    Validators.required,
    this.NmaeValidator.bind(this),
  ]);
  payerCtrlList: FormControl[] = [];
  shareWithCtrlList: FormControl[] = [];
  filteredPayersList: Observable<string[]>[] = [];
  filteredShareWithsList: Observable<string[]>[] = [];
  allMembers: string[][] = [];
  formGroups: FormGroup[] = [];

  @Input() result: any;

  @ViewChildren('payerInput') payerInputList!: QueryList<
    ElementRef<HTMLInputElement>
  >;

  @ViewChildren(MatAutocompleteTrigger)
  payerAutoCompleteList!: QueryList<MatAutocompleteTrigger>;

  @ViewChildren('shareWithInput') shareWithInputList!: QueryList<
    ElementRef<HTMLInputElement>
  >;

  @ViewChildren(MatAutocompleteTrigger)
  shareWithAutoCompleteList!: QueryList<MatAutocompleteTrigger>;

  payerPlaceHolderString: string = 'Select or Insert payer';
  constructor(private formBuilder: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['result'] && changes['result'].currentValue) {
      const response = changes['result'].currentValue;
      if (response.files && response.files.length) {
        for (const file of response.files) {
          this.payerCtrlList.push(new FormControl());
          this.shareWithCtrlList.push(new FormControl());
          this.allMembers.push(response.users);
          this.formGroups.push(
            this.formBuilder.group({
              file_name: file.receipt.file_name,
            })
          );
          this.refreshMembers(this.formGroups.length - 1);
        }
        this.result = { ...response };
      }
    }
  }

  private refreshMembers(idx: number) {
    this.allMembers[idx].sort();
    this.filteredPayersList[idx] = this.payerCtrlList[idx].valueChanges.pipe(
      startWith(null),
      map((payer: string | null) =>
        payer ? this._filter(payer, idx) : this.allMembers[idx].slice()
      )
    );

    this.filteredShareWithsList[idx] = this.shareWithCtrlList[
      idx
    ].valueChanges.pipe(
      startWith(null),
      map((shareWith: string | null) =>
        shareWith ? this._filter(shareWith, idx) : this.allMembers[idx].slice()
      )
    );

    console.log(this.result);
  }

  addPayer(event: MatChipInputEvent, idx: number): void {
    const value = (event.value || '').trim();

    // Add our payer
    if (value) {
      this.result['files'][idx]['receipt']['payer'] = value;
      this.payerPlaceHolderString = '';
      this.payerCtrlList[idx].disable();
      this.payerAutoCompleteList.toArray()[idx].closePanel();
    }

    // Clear the input value
    event.chipInput!.clear();

    this.payerCtrlList[idx].setValue(null);
  }

  removePayer(payer: string, idx: number): void {
    this.allMembers[idx].push(payer);
    this.refreshMembers(idx);
    this.result['files'][idx]['receipt']['payer'] = '';
    this.payerCtrlList[idx].enable();
    this.payerPlaceHolderString = 'Select or Insert Payer';
  }

  selectedPayer(event: MatAutocompleteSelectedEvent, idx: number): void {
    this.result['files'][idx]['receipt']['payer'] = event.option.viewValue;
    this.payerCtrlList[idx].disable();
    this.payerCtrlList[idx].setValue(null);
    this.payerPlaceHolderString = '';
    this.allMembers[idx] = this.allMembers[idx].filter(
      (member) => member !== event.option.viewValue
    );
    this.refreshMembers(idx);
  }

  private _filter(value: string, idx: number): string[] {
    const filterValue = value.toLowerCase();

    return this.allMembers[idx].filter((value) =>
      value.toLowerCase().includes(filterValue)
    );
  }

  addShareWith(event: MatChipInputEvent, idx: number): void {
    const value = (event.value || '').trim();

    if (value) {
      this.result['files'][idx]['receipt']['share_with'].push(value);
      this.shareWithAutoCompleteList.toArray()[idx].closePanel();
    }

    // Clear the input value
    event.chipInput!.clear();

    this.shareWithCtrlList[idx].setValue(null);
  }

  removeShareWith(shareWith: string, idx: number): void {
    const index =
      this.result['files'][idx]['receipt']['share_with'].indexOf(shareWith);

    if (index >= 0) {
      this.allMembers[idx].push(shareWith);
      this.refreshMembers(idx);
      this.result['files'][idx]['receipt']['share_with'].splice(index, 1);
      this.shareWithCtrlList[idx].enable();
    }
  }

  selectedShareWith(event: MatAutocompleteSelectedEvent, idx: number): void {
    this.result['files'][idx]['receipt']['share_with'].push(
      event.option.viewValue
    );
    this.shareWithInputList.toArray()[idx].nativeElement.value = '';
    this.shareWithCtrlList[idx].setValue(null);
    this.allMembers[idx] = this.allMembers[idx].filter(
      (member) => member !== event.option.viewValue
    );
    this.filteredShareWithsList.push(
      this.shareWithCtrlList[idx].valueChanges.pipe(
        startWith(null),
        map((shareWith: string | null) =>
          shareWith
            ? this._filter(shareWith, idx)
            : this.allMembers[idx].slice()
        )
      )
    );

    this.refreshMembers(idx);
  }

  NmaeValidator(control: FormControl) {
    const nameRegex = /^\w[\w.\-#&\s]*$/;
    const name = control.value;
    if (!nameRegex.test(name)) {
      return { invalidName: true };
    }
    return null;
  }
}
