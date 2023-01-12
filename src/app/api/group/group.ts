export interface GroupsInfo {
  len: number;
  names: string[];
}

export interface Group {
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
