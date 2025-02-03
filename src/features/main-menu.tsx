import React from 'react';
import { CreditCard, Star, ChevronRight } from 'lucide-react';

export const MainMenu = () => {
  return (
    <div className="plasmo-flex plasmo-flex-col plasmo-gap-6 plasmo-p-6 plasmo-bg-white plasmo-rounded-xl plasmo-shadow-lg plasmo-w-80 plasmo-mt-16">

      <div className="plasmo-text-center">
        <h1 className="plasmo-text-2xl plasmo-font-bold plasmo-text-gray-800">Linked Genie</h1>
        <p className="plasmo-text-gray-600 plasmo-mt-2">AI-powered LinkedIn comment suggestions</p>
      </div>

      <div className="plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-4">
        <h2 className="plasmo-font-semibold plasmo-mb-3 plasmo-flex plasmo-items-center plasmo-gap-2">
          <Star className="plasmo-w-5 plasmo-h-5 plasmo-text-yellow-500" />
          Current Plan: Free
        </h2>
        
        <div className="plasmo-space-y-2">
          <div className="plasmo-flex plasmo-items-center plasmo-text-gray-600">
            <ChevronRight className="plasmo-w-4 plasmo-h-4 plasmo-mr-2" />
            <span>5 AI suggestions per day</span>
          </div>
          <div className="plasmo-flex plasmo-items-center plasmo-text-gray-600">
            <ChevronRight className="plasmo-w-4 plasmo-h-4 plasmo-mr-2" />
            <span>Basic comment templates</span>
          </div>
        </div>
      </div>

      <button onClick={() => alert('Use Free version untill i add the payment method')} className="plasmo-bg-blue-600 plasmo-text-white plasmo-py-2 plasmo-px-4 plasmo-rounded-lg plasmo-font-medium plasmo-flex plasmo-items-center plasmo-justify-center plasmo-gap-2 hover:plasmo-bg-blue-700 plasmo-transition-colors">
        <CreditCard className="plasmo-w-5 plasmo-h-5" />
        Upgrade to Premium
      </button>

      <div className="plasmo-text-center plasmo-text-sm plasmo-text-gray-600 plasmo-border-t plasmo-border-gray-200 plasmo-pt-4">
        <p className="plasmo-mb-2">Made by Bhat Aasim</p>
        <div className="plasmo-flex plasmo-justify-center plasmo-gap-4">
          <a href="https://www.linkedin.com/in/aasim-bhat-b4726b115/" 
             className="plasmo-text-blue-600 hover:plasmo-text-blue-800 plasmo-transition-colors">
            LinkedIn
          </a>
          <a href="https://github.com/bhataasim" 
             className="plasmo-text-blue-600 hover:plasmo-text-blue-800 plasmo-transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};