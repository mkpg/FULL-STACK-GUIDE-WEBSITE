
import React from 'react';
import type { Step as StepType } from '../types';
import CodeBlock from './CodeBlock';

interface StepProps {
  step: StepType;
  isCompleted: boolean;
  onToggle: (stepId: string) => void;
  stepNumber: number;
}

const Step: React.FC<StepProps> = ({ step, isCompleted, onToggle, stepNumber }) => {
  return (
    <div className="flex items-start space-x-3 sm:space-x-4 py-3 sm:py-4 border-t border-gray-200">
      <div className="flex flex-col items-center space-y-2">
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
            isCompleted ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {stepNumber}
        </span>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(step.id)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          aria-labelledby={`step-title-${step.id}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 id={`step-title-${step.id}`} className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mt-1">{step.title}</h4>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.description}</p>
        {step.codeSnippet && <CodeBlock snippet={step.codeSnippet} />}
      </div>
    </div>
  );
};

export default Step;
