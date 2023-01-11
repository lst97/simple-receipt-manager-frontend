export interface Groups {
  totalGroups: number;
}

export interface GroupList {
  groupNumber: number;
  id: string;
  name: string;
  users: string[];
  records: object[];
}
