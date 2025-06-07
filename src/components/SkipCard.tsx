import React from 'react';
import { CheckCircle, Clock, Shield, Weight } from 'lucide-react';
import { Skip } from '../types/skip';
import skipImage from '../assets/images/skip.png';


interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skip: Skip) => void;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);
  const vatAmount = skip.price_before_vat * (skip.vat / 100);


  const handleCardClick = (e: React.MouseEvent) => {
    // Only select if clicking the card itself, not the button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onSelect(skip);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(skip);
  };

  return (
    <div
      className={`
        relative bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:-translate-y-1
        ${isSelected 
          ? 'border-blue-500 shadow-lg ring-4 ring-blue-100' 
          : 'border-gray-200 hover:border-blue-300'
        }
      `}
      onClick={handleCardClick}
    >
      {isSelected && (
        <div className="absolute -top-3 -right-3 bg-blue-500 rounded-full p-2 shadow-lg z-10">
          <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
        </div>
      )}

      {/* Skip Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={skipImage}
          alt={`${skip.size} yard skip`}
          className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
          {skip.size} Yards
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Skip Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
          {skip.size} Yard Skip
        </h3>

        {/* Hire Period */}
        <div className="flex items-center mb-3 sm:mb-4 text-gray-600">
          <Clock className="w-3 sm:w-4 h-3 sm:h-4 mr-2 flex-shrink-0" />
          <span className="text-xs sm:text-sm">{skip.hire_period_days} day hire period</span>
        </div>

        {/* Features */}
        <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
          <div className="flex items-center text-xs sm:text-sm">
            <Shield className={`w-3 sm:w-4 h-3 sm:h-4 mr-2 flex-shrink-0 ${skip.allowed_on_road ? 'text-green-500' : 'text-gray-400'}`} />
            <span className={`${skip.allowed_on_road ? 'text-green-600' : 'text-gray-500'} leading-tight`}>
              {skip.allowed_on_road ? 'Road placement allowed' : 'Private property only'}
            </span>
          </div>
          <div className="flex items-center text-xs sm:text-sm">
            <Weight className={`w-3 sm:w-4 h-3 sm:h-4 mr-2 flex-shrink-0 ${skip.allows_heavy_waste ? 'text-green-500' : 'text-gray-400'}`} />
            <span className={`${skip.allows_heavy_waste ? 'text-green-600' : 'text-gray-500'} leading-tight`}>
              {skip.allows_heavy_waste ? 'Heavy waste allowed' : 'Light waste only'}
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
          <div className="flex justify-between items-center">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              £{totalPrice.toFixed(2)}
            </span>
            <div className="text-right text-xs sm:text-sm text-gray-500">
              <div>Exc VAT: £{skip.price_before_vat.toFixed(2)}</div>
              <div>VAT: £{vatAmount.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleButtonClick}
          className={`
            w-full py-2.5 sm:py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base
            ${isSelected
              ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
            }
          `}
        >
          <span>{isSelected ? 'Selected' : 'Select This Skip'}</span>
          {!isSelected && <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4" />}
        </button>
      </div>
    </div>
  );
};

export default SkipCard;