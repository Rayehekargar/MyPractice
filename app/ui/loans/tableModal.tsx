'use client'
import React, { useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');
const facilities = [
  {
    id: "1",
    createdDate: "2021-12-10T08:15:00.987Z",
    name: "وام تحصیلی",
    repaymentType: [
      {
        name: "84 ماهه",
        value: 84
      }
    ],
    amount: 2000000000,
    interestRate: 3.8,
    penaltyRate: 3.5
  },
  {
    id: "2",
    createdDate: "2021-12-10T08:15:00.987Z",
    name: "وام تحصیلی",
    repaymentType: [
      {
        name: "84 ماهه",
        value: 84
      }
    ],
    amount: 2000000000,
    interestRate: 3.8,
    penaltyRate: 3.5
  },
  {
    id: "3",
    createdDate: "2024-04-28T11:57:17.315Z",
    name: "وام ازدواج",
    repaymentType: [
      {
        name: "120 ماهه",
        value: 120
      }
    ],
    amount: 3000000000,
    interestRate: 4,
    penaltyRate: 3.5
  }
];

const FacilityTableModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      <button onClick={openModal} className="bg-blue-500 text-white py-2 px-4 rounded">نمایش اطلاعات</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Facility Table"
        className="modal"
        overlayClassName="overlay"
        appElement={document.getElementById('root')!}
      >
        <h2 className="text-2xl font-bold mb-4">اطلاعات تسهیلات</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">نام</th>
              <th className="py-2 px-4 border-b">تاریخ ایجاد</th>
              <th className="py-2 px-4 border-b">مقدار</th>
              <th className="py-2 px-4 border-b">نرخ بهره</th>
              <th className="py-2 px-4 border-b">نرخ جریمه</th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((facility) => (
              <tr key={facility.id}>
                <td className="py-2 px-4 border-b">{facility.id}</td>
                <td className="py-2 px-4 border-b">{facility.name}</td>
                <td className="py-2 px-4 border-b">{new Date(facility.createdDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{facility.amount.toLocaleString()} تومان</td>
                <td className="py-2 px-4 border-b">{facility.interestRate} %</td>
                <td className="py-2 px-4 border-b">{facility.penaltyRate} %</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={closeModal} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">بستن</button>
      </Modal>
    </div>
  );
};

export default FacilityTableModal;
