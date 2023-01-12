export interface GroupsInfo {
  len: number;
  records: any[];
}

export interface GroupData {
  _id: string;
  group_number: number;
  name: string;
  users: string[];
  records: object[];
}

/**
 * @title Option groups autocomplete
 */
export interface StateGroup {
  letter: string;
  names: string[];
}
