// src/components/Step5.tsx
import React,{ useEffect , useState } from 'react';
import { FacilityType } from '../../types/facilityTypes';
import {ArrowLeftIcon } from '@heroicons/react/20/solid';
interface Step5Props {
  formData: any;
  selectedFacility:FacilityType | undefined;
  message:string | null;
  monthlyamount:number;
  penalty:number;
}
const Step5: React.FC<Step5Props> = ({formData,selectedFacility,message,monthlyamount,penalty}) => {

  return (
    <fieldset className='text-center'>

      
      {message &&<div className="bg-blue-50 p-4 rounded-lg shadow-md mb-4">
     <p className="mb-4 text-gray-700">{message}</p>

      </div>}
   
        <div className='flex justify-around'>
        <div><span>نوع تسهیلات: </span>{selectedFacility?.name}</div>
        <div><span>مبلغ: </span>{selectedFacility?.amount.toLocaleString('fa-IR')}</div>
        <div><span>مدت زمان پرداخت: </span>{formData.repaymentPeriod}ماه</div>
        <div><span>تعداد اقساط: </span>{formData.repaymentPeriod}</div>
      </div>
      <div  className='flex  justify-around mt-3'>
      <div><span>مبلغ قسط ماهیانه: </span>{monthlyamount?.toLocaleString('fa-IR')}</div>
      <div><span>مبلغ جریمه دیرکرد: </span>{penalty?.toLocaleString('fa-IR')}</div>
      <div><span> درصد سود سالیانه: </span>{`${selectedFacility?.interestRate}%`}</div>
      
      </div>
    </fieldset>
  );
};

export default Step5;
