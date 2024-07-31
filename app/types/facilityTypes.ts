export interface RepaymentType {
    name: string;
    value: number;
  }
  export interface Personal{
    firstName:string,
    lastName: string,
    nationalId:string,
    birthDate:string,
    phone:string,
  }
  export interface FacilityType {
    id: string;
    createdDate: string;
    name: string;
    repaymentType: RepaymentType[];
    amount: number;
    percentageRate?: number;
    interestRate?: number;
    penaltyRate: number;
    personal:Personal;
    repaymentPeriod:string;
    monthlyamount:number| undefined;
    penalty:number | undefined;

  }