// src/components/StepIndicator.tsx
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center mb-6">
      {steps.map((step) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= step ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
            {step}
          </div>
          {step !== totalSteps && (
            <div className={`w-8 h-1 ${currentStep >= step ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
