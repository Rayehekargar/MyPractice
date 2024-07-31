
import React from 'react';

interface Step3Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors:Record<string, string>
}

const Step3: React.FC<Step3Props> = ({ formData, handleChange,errors }) => {
  return (
    <fieldset>
      <legend className="text-lg font-semibold mb-4 text-blue-600">اطلاعات بانکی</legend>
      <div className="flex mt-3 flex-col md:flex-row md:flex-wrap mb-4 w-full">
      <div className=" flex items-center md:mb-0 md:w-1/2">
      <label htmlFor="accountNumber" className="block w-2/5 text-sm font-medium  text-gray-700 mb-2">شماره حساب:</label>
      <div className="w-3/5">
       <input id="accountNumber" name="accountNumber" className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.accountNumber} onChange={handleChange} />
       {errors.accountNumber && <div role="alert" className="text-red-500 text-xs mt-1">{errors.accountNumber}</div>}
      </div>
      </div>
      <div className=" flex items-center md:mb-0 md:w-1/2">
      <label htmlFor="iban" className="flex justify-center file:block w-2/5 text-sm font-medium  text-gray-700 mb-2">شماره شبا:</label>
      <div className="w-3/5">
      <input id="iban" name="iban" className="block w-full  mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  placeholder="IRxxxxxxxxxxxxxxxxxxxxxxxx"  value={formData.iban} onChange={handleChange} />
      {errors.iban && <div role="alert" className="text-red-500 text-xs mt-1">{errors.iban}</div>}
      </div>
      </div>
      </div>

      <div className=" flex items-center md:mb-0 md:w-1/2">
      <label htmlFor="averageBalance" className="file:block w-2/5 text-sm font-medium  text-gray-700 mb-2">میانگین موجودی سالیانه:</label>
      <div className="w-3/5">
      <input type="input" id="averageBalance" name="averageBalance" className="block w-full   mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.averageBalance} onChange={handleChange} />
      {errors.averageBalance && <div role="alert" className="text-red-500 text-xs mt-1">{errors.averageBalance}</div>}
      </div>
      </div>
    </fieldset>
  );
};

export default Step3;
