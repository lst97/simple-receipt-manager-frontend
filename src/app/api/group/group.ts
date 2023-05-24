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

export interface Groups {
  group_number: number;
  name: string;
  users: string[];
  records: Record[];
}

export interface Record {
  hash: string;
  receipt: Receipt;
  base64: string;
}

export interface Receipt {
  ABN: string;
  date: string;
  file_name: string;
  merchant_name: string;
  merchant_phone: string;
  payer: string;
  payment_method: string;
  payment_status: string;
  receipt_no: string;
  share_with: string[];
  time: string;
  total: string;
}
