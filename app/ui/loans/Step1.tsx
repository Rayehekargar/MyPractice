// src/components/Step1.tsxs
import React from "react";
import { FacilityType } from "../../types/facilityTypes";

interface Step1Props {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  facilityTypes: FacilityType[];
  errors:Record<string, string>
}

const Step1: React.FC<Step1Props> = ({
  formData,
  handleChange,
  facilityTypes,
  errors
}) => {
  return (
    <fieldset>
      <legend className="text-lg font-semibold mb-4 text-blue-600">
        {" "}
        نوع تسهیلات
      </legend>
      <div className="flex mt-3 flex-col md:flex-row md:flex-wrap mb-4 w-full">
        <div className=" flex items-center md:mb-0 md:w-1/2">
          <label
            htmlFor="facilityType"
            className="block w-1/5 text-sm font-medium  text-gray-700 mb-2"
          >
            نوع تسهیلات:
          </label>
          <select
            id="facilityType"
            name="facilityType"
            className="block w-3/5   mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.facilityType}
            onChange={handleChange}
          >
            <option value="">انتخاب کنید</option>
            {facilityTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
         
        </div>
      
      </div>
      {errors?.facilityType && <div role="alert" className="text-red-500 text-xs mt-1">{errors?.facilityType}</div>}
    </fieldset>
  );
};

export default Step1;
