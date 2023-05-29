// {
//   "abn": "123456789",
//   "date": "2023-05-23T12:34:56Z",
//   "file_name": "test",
//   "merchant_name": "test",
//   "merchant_phone": "123456789",
//   "payer": "123456789",
//   "payment_method": "test",
//   "status": "unpaid",
//   "receipt_no": "123456789",
//   "share_with": [],
//   "time": "09:00PM",
//   "total": 123.45
// }
export interface Receipt {
  abn: string;
  date: string;
  file_name: string;
  merchant_name: string;
  merchant_phone: string;
  payer: string;
  payment_method: string;
  status: string;
  receipt_no: string;
  share_with: string[];
  time: string;
  total: number;
}
