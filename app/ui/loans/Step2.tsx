// src/components/Step2.tsx
import React, { useState,useEffect  } from 'react';
interface Step2Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleDateChange: (date: any) => void;
  setIsNextStepDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  errors:Record<string, string>

}

const Step2: React.FC<Step2Props> = ({ formData, handleChange ,handleDateChange ,setIsNextStepDisabled ,errors }) => {
  const [error, setError] = useState<string | null>(null);

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    handleDateChange(newDate);

    // اعتبارسنجی تاریخ با فرمت YYYY/MM/DD
    const datePattern = /^\d{4}\/\d{2}\/\d{2}$/;
    if (datePattern.test(newDate)) {
      const [year, month, day] = newDate.split('/').map(Number);
      const date = new Date(year, month - 1, day);

      // بررسی معتبر بودن تاریخ
      if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
        setError(null);
        setIsNextStepDisabled(false)
      } else {
        setError('تاریخ وارد شده معتبر نیست');
        setIsNextStepDisabled(true)
      }
    } else {
      setError('فرمت تاریخ باید YYYY/MM/DD باشد');
      setIsNextStepDisabled(true)
    }
  };
 
  return (
    <fieldset>
      <legend className="text-lg font-semibold mb-4 text-blue-600">اطلاعات متقاضی</legend>
      <div className="flex mt-3 flex-col md:flex-row md:flex-wrap mb-4 w-full">
      <div className=" flex items-center md:mb-0 md:w-1/2">
      <label htmlFor="firstName" className="block w-1/5 text-sm font-medium  text-gray-700 mb-2" >نام:</label>
     
      <div className="w-3/5 ">
      <input id="firstName" name="firstName" className="block w-full   mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.firstName} onChange={handleChange} />
      {errors.firstName && <div role="alert" className="text-red-500 text-xs mt-1">{errors.firstName}</div>}
        </div>
      </div>
      

      <div className=" flex items-center md:mb-0 md:w-1/2">
      <label htmlFor="lastName" className="block w-1/5 text-sm font-medium text-gray-700 mb-2">نام خانوادگی:</label>
      <div className="w-3/5">
      <input id="lastName" name="lastName" className="block  w-full  mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  value={formData.lastName} onChange={handleChange} />
      {errors.lastName && <div role="alert" className="text-red-500 text-xs mt-1">{errors.lastName}</div>}
      </div>
      </div>
   
      </div>

      <div className="flex mt-1 flex-col md:flex-row md:flex-wrap mb-4 w-full">
      <div className="flex items-center md:mb-0 md:w-1/2">
      <label htmlFor="nationalId" className="block w-1/5 text-sm font-medium text-gray-700 mb-2">کد ملی:</label>
      <div className="w-3/5">
      <input id="nationalId" name="nationalId" className="block  w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.nationalId} onChange={handleChange} />
      {errors.nationalId && <div role="alert" className="text-red-500 text-xs mt-1">{errors.nationalId}</div>}
     </div>
      </div>
      <div className="flex items-center md:mb-0 md:w-1/2">
      <label htmlFor="birthDate" className="block w-1/5  text-sm font-medium text-gray-700 mb-2">تاریخ تولد:</label>
      <div>
        <input
        id="birthDate"
        name="birthDate"
        type="text"
        value={formData.birthDate}
        onChange={handleDateOfBirthChange}
        placeholder="YYYY/MM/DD"
        className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
       {errors.birthDate && <div role="alert" className="text-red-500 text-xs mt-1">{errors.birthDate}</div>}
       
       </div>
      </div>
     
      </div>

      <div className="flex items-center md:mb-0 md:w-1/2">
      <label htmlFor="phone" className="block   w-1/5 text-sm font-medium text-gray-700 mb-2">شماره تماس:</label>
      <div className="w-3/5">
      <input id="phone" name="phone" className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.phone} onChange={handleChange} />
      {errors.phone && <div role="alert" className="text-red-500 text-xs mt-1">{errors.phone}</div>}
      </div>
      </div>
    </fieldset>
  );
};

export default Step2;
