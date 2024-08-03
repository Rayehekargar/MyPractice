'use client'
import React, { useState ,useEffect} from 'react';
import { FacilityType } from "../../types/facilityTypes";
interface ModalProps {

  myFacilities: FacilityType[];
}
function toPersianNumber(number:any) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return number.toString().replace(/\d/g, (digit:any) => persianDigits[digit]);
}
const ModalComponent:React.FC<ModalProps> = ({myFacilities}) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log('myFacilities',myFacilities)

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {myFacilities.length !==0  &&<button onClick={openModal} className="bg-green-500 hover:bg-green-600 mt-4 text-white font-semibold py-2 px-4 rounded shadow">
        نمایش تسهیلات
      </button>}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">لیست تسهیلات</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            <div className="p-4 h-custom overflow-x-auto overflow-y-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">نوع</th>
                    <th className="px-4 py-2">مقدار</th>
                    <th className="px-4 py-2">مبلغ قسط ماهیانه</th>
                    <th className="px-4 py-2">مبلغ جریمه دیرکرد</th>
                    <th className="px-4 py-2">نرخ بهره</th>
                    <th className="px-4 py-2">نرخ جریمه</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {myFacilities.map((facility, index) => (
                    <tr key={facility.id} className="border-t">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{facility.name}</td>
                      <td className="px-4 py-2">{facility.amount.toLocaleString('fa-IR')}</td>
                      <td className="px-4 py-2">{facility.monthlyamount.toLocaleString('fa-IR')}</td>
                      <td className="px-4 py-2">{facility.penalty.toLocaleString('fa-IR')}</td>
                      <td className="px-4 py-2">{toPersianNumber(facility.interestRate)}%</td>
                      <td className="px-4 py-2">{toPersianNumber(facility.penaltyRate)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t">
              <button onClick={closeModal} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalComponent;
