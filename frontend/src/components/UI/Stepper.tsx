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
  return <div className="w-full py-1">
      <div className="flex items-center justify-center w-full gap-2">
        {steps.map((step, i) => <Fragment key={i}>
            <div className="flex items-center gap-2">
              {/* Step circle + inline label */}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 
                  ${i < currentStep ? 'bg-[#00A7A7] text-white' : i === currentStep ? 'bg-[#00A7A7] text-white ring-2 ring-[#00A7A7]/20' : 'bg-gray-200 text-gray-600'}`}>
                {i < currentStep ? <CheckIcon size={12} /> : <span className="text-[10px] font-medium">{i + 1}</span>}
              </div>
              <span className={`text-[11px] whitespace-nowrap truncate max-w-[120px] 
                  ${i === currentStep ? 'text-[#007F7F] font-medium' : 'text-gray-600'}`}>
                {step}
              </span>
            </div>
            {/* Connector line */}
            {i < steps.length - 1 && <div className={`h-0.5 w-6 md:w-10 transition-all duration-500 ${i < currentStep ? 'bg-[#00A7A7]' : 'bg-gray-300'}`}></div>}
          </Fragment>)}
      </div>
    </div>;
};