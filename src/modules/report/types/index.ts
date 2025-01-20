export type ServiceFee = {
  id: number;
  acquirerId: number;
  acquirerCode: string;
  acquirerName: string;
  createdDate: string;
  updatedDate: string;
  startPeriodTrx: string;
  endPeriodTrx: string;
  prepaidCount: number;
  postpaidCount: number;
  nontaglisCount: number;
  prepaidRp: number;
  postpaidRp: number;
  nontaglisRp: number;
  prepaidFee: number;
  postpaidFee: number;
  nontaglisFee: number;
};
