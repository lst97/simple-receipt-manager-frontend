export interface GroupsInfo {
  len: number;
  records: any[];
}

export interface GroupData {
  id: string;
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
