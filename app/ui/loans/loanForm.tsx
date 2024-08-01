
'use client'
import React, { useState, useEffect } from 'react';
import { useActionState } from 'react';
import { createFacility,getMyFacilities, State } from '../../lib/actions';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import StepIndicator from './StepIndictator';
import ModalComponent from "./modal";
import { FacilityType , RepaymentType} from '../../types/facilityTypes';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';



const LoanForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    facilityType: '',
    firstName: '',
    lastName: '',
    nationalId: '',
    birthDate: '',
    phone: '',
    accountNumber: '',
    iban: '',
    averageBalance: '',
    repaymentPeriod: '',

  });
  const [facilityTypes, setFacilityTypes] = useState<FacilityType[]>([]);
  const [repaymentPeriods, setRepaymentPeriods] = useState<RepaymentType[]>([]);
  const [selectedFacility,setSelectedFacility]= useState<FacilityType | undefined>();
  const[myFacilities,setMyFacilities] =useState([]);
  const [isNextStepDisabled, setIsNextStepDisabled] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [monthlyamount,setMonthlyamount]= useState<number | undefined>();
  const [penalty,setPenalty]= useState<number | undefined>();
  const [requestStatus, setRequestStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  useEffect(() => {
    fetch('http://localhost:4000/data')
      .then(response => response.json())
      .then(data => setFacilityTypes(data))
      .catch(error => console.error('Error fetching facility types:', error));
      getMyFacilities().then(data => {
        setMyFacilities(data);
      }).catch(error => {
        console.error('Error fetching facilities:', error);
      })

  
  }, []);

  useEffect(() => {
    validateForm();
  }, [formData,step]);
  useEffect(() => {
    calculate();
  }, [formData.repaymentPeriod]);

  const calculate=()=>{
    if(selectedFacility!= undefined){
     
      const interestRate = selectedFacility?.interestRate ?? 0;

     const monthlyamount=(selectedFacility?.amount+(selectedFacility?.amount * interestRate))/parseInt(formData.repaymentPeriod);
     setMonthlyamount(monthlyamount);
     const penaltyRatePercentage = selectedFacility?.penaltyRate / 100; 
     const penalty=penaltyRatePercentage * selectedFacility?.amount;
     setPenalty(penalty);
    }
  }
  const validateNationalId = (nationalId: string): boolean => {
    if (!/^\d{10}$/.test(nationalId)) {
      return false;
    }

 
    const check = parseInt(nationalId[9], 10);
    const sum = Array.from(nationalId.substr(0, 9)).reduce((acc, digit, index) => acc + parseInt(digit, 10) * (10 - index), 0);
    const remainder = sum % 11;

    return (remainder < 2 && check === remainder) || (remainder >= 2 && check === 11 - remainder);
  }
  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^0\d{10}$/;
    return phoneRegex.test(phone);
  };
  const validateBirthDate = (birthDate: string): boolean => {
 
    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    if (!dateRegex.test(birthDate)) {
      return false;
    }

    const [year, month, day] = birthDate.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };
  const validateAccountNumber = (accountNumber: string): boolean => {
    return /^\d{10,16}$/.test(accountNumber);
  };
  
  const validateIban = (iban: string): boolean => {

    return /^[A-Z0-9]{26}$/.test(iban);
 
  };
  const validateAverageBalance = (balance: string): boolean => {

    const numBalance = parseFloat(balance.replace(/,/g, ''));
    return !isNaN(numBalance) && numBalance >= 0 && numBalance <= 1_000_000_000;
  };
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.facilityType) {
          newErrors.facilityType = 'نوع تسهیلات الزامی است';
        }
        break;
      case 2:
        if (!formData.firstName) {
          newErrors.firstName = 'نام الزامی است';
        } else if (!/^[\u0600-\u06FF\s]+$/.test(formData.firstName)) {
          newErrors.firstName = 'نام باید به حروف فارسی باشد';
        }
        if (!formData.lastName) {
          newErrors.lastName = 'نام خانوادگی الزامی است';
        }else if (!/^[\u0600-\u06FF\s]+$/.test(formData.lastName)) {
          newErrors.lastName = 'نام خانوادگی باید به حروف فارسی باشد';
        }
        if (!formData.nationalId) {
          newErrors.nationalId = 'کد ملی الزامی است';
        } else if (!validateNationalId(formData.nationalId)) {
          newErrors.nationalId = 'کد ملی نامعتبر است';
        }
        if (!formData.birthDate) {
          newErrors.birthDate = ' تاریخ تولد الزامی است';
        } else if (!validateBirthDate(formData.birthDate)) {
          newErrors.birthDate = 'تاریخ تولد نامعتبر است';
        }
        if (!formData.phone) {
          newErrors.phone = '   شماره تلفن الزامی است';
        } else if (!validatePhoneNumber(formData.phone)) {
          newErrors.phone = ' شماره تلفن نامعتبر است';
        }
        break;
      case 3:
        if (!formData.accountNumber) {
          newErrors.accountNumber = 'شماره حساب الزامی است';
          
        }else if (!validateAccountNumber(formData.accountNumber)) {
          newErrors.accountNumber = ' شماره حساب نامعتبر است';
        }
        if (!formData.iban) {
          newErrors.iban = 'شماره شبا الزامی است';
        }else if (!validateIban(formData.iban)) {
          newErrors.iban = ' شماره شبا نامعتبر است';
        }
        if (!formData.averageBalance) {
          newErrors.averageBalance = 'میانگین موجودی الزامی است';
        }else if (!validateAverageBalance(formData.averageBalance)) {
          newErrors.averageBalance = ' میانگین موجودی  نامعتبر است';
        }
        break;
      case 4:
        if (!formData.repaymentPeriod) {
          newErrors.repaymentPeriod = ' انتخاب مدت زمان پرداخت الزامی است';
          
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    setIsNextStepDisabled(Object.keys(newErrors).length > 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'facilityType') {
      const selectedFacility = facilityTypes.find(facility => facility.id === e.target.value);
      if (selectedFacility) {

        setSelectedFacility(selectedFacility);
        setRepaymentPeriods(selectedFacility.repaymentType);
   
      } else {
        setRepaymentPeriods([]);
    
      }
    }

  };

  const handleDateChange = (date: string) => {
    setFormData((prevData) => {
        const updatedData = { ...prevData, birthDate: date };
      console.log('Updated formData with birthDate:', updatedData); // لاگ گرفتن
      return updatedData;
    });
  };
  const refreshPage = () => {
    window.location.reload();
  };
  const nextStep = () => {
 
    if (!isNextStepDisabled) {
    setStep(step + 1);
  }
    
  };

  const prevStep = () => {
    setStep(step - 1);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setRequestStatus('submitting');

    if (selectedFacility) {
  
   
    selectedFacility.repaymentPeriod=formData.repaymentPeriod;
    selectedFacility.monthlyamount=monthlyamount;
    selectedFacility.penalty=penalty;
    }
    const { message, errors } = await createFacility({ message: null, errors: {} }, selectedFacility);
   if(Object.keys(errors).length === 0)
   {
    setRequestStatus('success');
   }
    getMyFacilities().then(data => {
      setMyFacilities(data);
    }).catch(error => {
      console.error('Error fetching facilities:', error);
      setRequestStatus('error');
    })
    console.log('message',message);
    setMessage(message);
    setErrors(errors);
};

  return (
  <>
    <StepIndicator currentStep={step} totalSteps={5} />
    <div className="bg-white shadow-lg rounded-lg p-8  w-2/3">
      <h1 className="text-2xl font-bold mb-6 text-center">فرم ثبت و انتخاب تسهیلات</h1>
    
     
          <form onSubmit={handleSubmit}>
            
      
      {step === 1 && <Step1 formData={formData} handleChange={handleChange} facilityTypes={facilityTypes} errors={errors}/>}
     
     
      {step === 2 && <Step2 formData={formData} handleChange={handleChange} handleDateChange={handleDateChange} setIsNextStepDisabled ={setIsNextStepDisabled } errors={errors}/>}
      
      {step === 3 && <Step3 formData={formData} handleChange={handleChange} errors={errors}/>}
      {step === 4 && <Step4 formData={formData} handleChange={handleChange} repaymentPeriods={repaymentPeriods} errors={errors} />}
      {step === 5 && <Step5 formData={formData} selectedFacility={selectedFacility} message={message} monthlyamount={monthlyamount} penalty={penalty}/>}

      <div className=" mt-4">
        {(step > 1 && requestStatus === 'idle' ) && <button type="button" aria-label="مرحله قبلی" onClick={prevStep}   >
        <ArrowRightIcon className="h-5 w-5 ml-2 inline text-customBlue" />
          <span className="text-customBlue font-bold">مرحله قبل</span>   
          </button>}
        
        {step < 5 && <button type="button" aria-label="مرحله بعدی" onClick={nextStep}  disabled={isNextStepDisabled} className="float-left">
        <span className="text-customBlue font-bold">مرحله بعد</span>        
        <ArrowLeftIcon className="h-5 w-5 mr-2 inline text-customBlue" />
        </button>
        }
 
      </div>
      <div className='text-center'>
      {step === 5 && requestStatus === 'idle' && <button type="submit"  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow">ارسال درخواست</button>}
            {step === 5 && requestStatus === 'submitting' && <button type="button" hidden className=" font-semibold py-2 px-4 rounded shadow">در حال ارسال...</button>}
            {step === 5 && requestStatus === 'success' && <button type="button" hidden  className="  font-semibold py-2 px-4 rounded shadow">درخواست ارسال شد</button>}
            {step === 5 && requestStatus === 'error' && <button type="button" hidden className=" font-semibold py-2 px-4 rounded shadow">خطا در ارسال درخواست</button>}
            {requestStatus !== 'idle' && <button className="text-customBlue font-semibold py-2 px-4 rounded " onClick={refreshPage}>درخواست مجدد</button>}
        </div>
        </form>
    
  
    </div>
    <ModalComponent myFacilities={myFacilities}/>
    </>
  
  );
};

export default LoanForm;
