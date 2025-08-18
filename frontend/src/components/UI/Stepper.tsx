import React, { Fragment } from 'react';
import { CheckIcon } from 'lucide-react';
interface StepperProps {
  steps: string[];
  currentStep: number;
}
export const Stepper = ({
  steps,
  currentStep
}: StepperProps) => {
  return <div className="w-full py-4">
      <div className="flex items-center justify-center w-full">
        {steps.map((step, i) => <Fragment key={i}>
            {/* Step circle */}
            <div className="relative flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 
                  ${i < currentStep ? 'bg-[#00A7A7] text-white' : i === currentStep ? 'bg-[#00A7A7] text-white ring-4 ring-[#00A7A7]/20' : 'bg-gray-200 text-gray-600'}`}>
                {i < currentStep ? <CheckIcon size={16} /> : <span className="text-xs font-medium">{i + 1}</span>}
              </div>
              <span className={`absolute -bottom-6 text-xs whitespace-nowrap 
                  ${i === currentStep ? 'text-[#00A7A7] font-medium' : 'text-gray-500'}`}>
                {step}
              </span>
            </div>
            {/* Connector line */}
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${i < currentStep ? 'bg-[#00A7A7]' : 'bg-gray-300'}`}></div>}
          </Fragment>)}
      </div>
      <div className="h-8"></div> {/* Space for step labels */}
    </div>;
};