
import React from 'react';
import {RepaymentType,FacilityType} from '../../types/facilityTypes';
interface Step4Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  repaymentPeriods:RepaymentType[];
  errors:Record<string, string>

}
const Step4: React.FC<Step4Props> = ({ formData, handleChange ,repaymentPeriods,errors }) => {

  return (
    <fieldset>
      <legend className="text-lg font-semibold mb-4 text-blue-600">شرایط بازپرداخت</legend>
      <div className="flex mt-3 flex-col md:flex-row md:flex-wrap mb-4 w-full">
   
      <div className=" flex items-center md:mb-0 md:w-1/2">
      <label htmlFor="repaymentPeriod" className="block w-2/5 text-sm font-medium  text-gray-700 ">مدت زمان بازپرداخت (ماه):</label>
      <select
          id="repaymentPeriod"
          name="repaymentPeriod"
          className="block w-3/5 mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={formData.repaymentPeriod}
          onChange={handleChange}
        >
          <option value="">انتخاب کنید</option>
          {repaymentPeriods.map((period) => (
            <option key={period.value} value={period.value}>
              {period.name}
            </option>
          ))}
        </select>
      </div>
     
      </div>
      {errors?.repaymentPeriod && <div  role="alert" className="text-red-500 text-xs mt-1">{errors?.repaymentPeriod}</div>}
    </fieldset>
  );
};

export default Step4;
