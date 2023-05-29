export interface ReceiptRecordElement {
  merchant_name: string;
  receipt_no: string;
  date: string;
  payer: string;
  total: number;
  payment_method: string;
  share_with: string[];
}
