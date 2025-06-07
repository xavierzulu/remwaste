import React from 'react';
import { MapPin, Trash2, Truck, Shield, Calendar, CreditCard } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  icon: React.ReactNode;
  completed: boolean;
  current: boolean;
}

const ProgressStepper: React.FC = () => {
  const steps: Step[] = [
    {
      id: 'postcode',
      label: 'Postcode',
      icon: <MapPin className="w-3 sm:w-4 h-3 sm:h-4" />,
      completed: true,
      current: false,
    },
    {
      id: 'waste-type',
      label: 'Waste Type',
      icon: <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />,
      completed: true,
      current: false,
    },
    {
      id: 'select-skip',
      label: 'Select Skip',
      icon: <Truck className="w-3 sm:w-4 h-3 sm:h-4" />,
      completed: false,
      current: true,
    },
    {
      id: 'permit-check',
      label: 'Permit Check',
      icon: <Shield className="w-3 sm:w-4 h-3 sm:h-4" />,
      completed: false,
      current: false,
    },
    {
      id: 'choose-date',
      label: 'Choose Date',
      icon: <Calendar className="w-3 sm:w-4 h-3 sm:h-4" />,
      completed: false,
      current: false,
    },
    {
      id: 'payment',
      label: 'Payment',
      icon: <CreditCard className="w-3 sm:w-4 h-3 sm:h-4" />,
      completed: false,
      current: false,
    },
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200 py-3 sm:py-4 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1 min-w-0">
              <div className="flex items-center min-w-0">
                <div className={`
                  flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 transition-all duration-200 flex-shrink-0
                  ${step.completed 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : step.current 
                      ? 'bg-blue-500 border-blue-500 text-white' 
                      : 'bg-white border-gray-300 text-gray-400'
                  }
                `}>
                  {step.icon}
                </div>
                <span className={`
                  ml-1 sm:ml-2 text-xs sm:text-sm font-medium hidden sm:block transition-colors duration-200 truncate
                  ${step.completed 
                    ? 'text-green-600' 
                    : step.current 
                      ? 'text-blue-600' 
                      : 'text-gray-400'
                  }
                `}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  flex-1 h-0.5 mx-2 sm:mx-4 transition-colors duration-200 min-w-2
                  ${steps[index + 1].completed || steps[index + 1].current 
                    ? 'bg-blue-200' 
                    : 'bg-gray-200'
                  }
                `} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper;