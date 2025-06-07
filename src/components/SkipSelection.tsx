import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Filter, SortAsc } from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchSkips, selectSkip } from '../store/skipSlice';
import { Skip } from '../types/skip';
import SkipCard from './SkipCard';
import LoadingSpinner from './LoadingSpinner';
import ProgressStepper from './ProgressStepper';

const SkipSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { skips, selectedSkip, loading, error } = useAppSelector((state) => state.skip);
  const [sortBy, setSortBy] = useState<'size' | 'price'>('size');
  const [filterRoadAllowed, setFilterRoadAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    dispatch(fetchSkips());
  }, [dispatch]);

  const handleSkipSelect = (skip: Skip) => {
    dispatch(selectSkip(skip));
  };

  const sortedAndFilteredSkips = React.useMemo(() => {
    let filtered = skips;
    
    if (filterRoadAllowed !== null) {
      filtered = filtered.filter(skip => skip.allowed_on_road === filterRoadAllowed);
    }

    return [...filtered].sort((a, b) => {
      if (sortBy === 'size') {
        return a.size - b.size;
      }
      const priceA = a.price_before_vat * (1 + a.vat / 100);
      const priceB = b.price_before_vat * (1 + b.vat / 100);
      return priceA - priceB;
    });
  }, [skips, sortBy, filterRoadAllowed]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProgressStepper />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center">
            <p className="text-red-600 font-medium text-sm sm:text-base">Error loading skip options: {error}</p>
            <button
              onClick={() => dispatch(fetchSkips())}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ProgressStepper />
      
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-24 sm:pb-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 px-2">
            Choose Your Skip Size
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Select the perfect skip size for your project. All prices include VAT and delivery to your location.
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-6 sm:mb-8">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:gap-4 sm:items-center sm:justify-between">
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
              <div className="flex items-center space-x-2">
                <SortAsc className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'size' | 'price')}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-0"
                >
                  <option value="size">Sort by Size</option>
                  <option value="price">Sort by Price</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <select
                  value={filterRoadAllowed === null ? 'all' : filterRoadAllowed.toString()}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilterRoadAllowed(value === 'all' ? null : value === 'true');
                  }}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-0"
                >
                  <option value="all">All locations</option>
                  <option value="true">Road placement allowed</option>
                  <option value="false">Private property only</option>
                </select>
              </div>
            </div>

            {selectedSkip && (
              <div className="text-xs sm:text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg text-center sm:text-left">
                <span className="font-medium">Selected:</span> {selectedSkip.size} Yard Skip (£{(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)).toFixed(2)})
              </div>
            )}
          </div>
        </div>

        {/* Skip Cards */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {sortedAndFilteredSkips.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selectedSkip?.id === skip.id}
                onSelect={handleSkipSelect}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fixed Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:relative sm:bg-transparent sm:border-t-0 sm:p-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center gap-4">
            <button className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0 min-w-0">
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Back</span>
            </button>
            
            <button
              disabled={!selectedSkip}
              className={`
                flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex-1 sm:flex-initial min-w-0
                ${selectedSkip
                  ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <span className="truncate">Continue</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipSelection;