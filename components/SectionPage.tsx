import React, { useEffect } from 'react';
import type { Section, Progress } from '../types';
import Step from './Step';
import { IconChevronLeft, IconChevronRight, IconLightbulb, IconClock, IconBookOpen, IconPresentationChart, IconQuestionMarkCircle, IconCheckCircle } from './Icons';

interface SectionPageProps {
  section: Section;
  progress: Progress;
  onToggleStep: (stepId: string) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  hasPrevious: boolean;
  hasNext: boolean;
  currentIndex: number;
  totalSections: number;
  onCompleteCourse: () => void;
}

const SectionPage: React.FC<SectionPageProps> = ({ 
  section, 
  progress, 
  onToggleStep, 
  onNavigate, 
  hasPrevious, 
  hasNext, 
  currentIndex, 
  totalSections,
  onCompleteCourse
}) => {
  // Scroll to top when section changes
  useEffect(() => {
    // Small delay for better visual feedback
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [section.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 py-4 sm:py-0 space-y-4 sm:space-y-0">
            {/* Left side - Navigation */}
            <div className="flex items-center space-x-4 order-2 sm:order-1">
              <button
                onClick={() => onNavigate('prev')}
                disabled={!hasPrevious}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  hasPrevious
                    ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <IconChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>
              
              <div className="text-sm text-gray-500">
                {currentIndex + 1} of {totalSections}
              </div>
            </div>

            {/* Center - Section Title */}
            <div className="flex-1 text-center order-1 sm:order-2">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">{section.title}</h1>
            </div>

            {/* Right side - Next Button */}
            <div className="flex items-center space-x-4 order-3">
              {hasNext ? (
                <button
                  onClick={() => onNavigate('next')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                  <IconChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onCompleteCourse}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors bg-green-600 text-white hover:bg-green-700"
                >
                  <span className="hidden sm:inline">Complete Course</span>
                  <span className="sm:hidden">Complete</span>
                  <IconCheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section Info Bar */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            {section.estimatedTime && (
              <div className="flex items-center gap-2">
                <IconClock className="w-4 h-4" />
                <span className="font-medium">{section.estimatedTime}</span>
              </div>
            )}
            {section.prerequisites && (
              <div className="flex items-center gap-2">
                <IconBookOpen className="w-4 h-4" />
                <span><span className="font-medium">Prerequisites:</span> {section.prerequisites}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Section {currentIndex + 1}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* 1. Overview */}
          {section.overview && (
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Concept Overview</h2>
              <div className="prose prose-indigo max-w-none">
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: section.overview }}></p>
              </div>
            </div>
          )}

          {/* 2. Core Concepts */}
          {section.coreConcepts && section.coreConcepts.length > 0 && (
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Core Concepts</h2>
              <ul className="space-y-2 sm:space-y-3">
                {section.coreConcepts.map((concept, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2 sm:mt-3"></div>
                    <div className="text-gray-700 text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: concept }}></div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* 3. Hands-On Steps */}
          {section.steps && section.steps.length > 0 && (
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Hands-On Steps</h2>
              <div className="space-y-4 sm:space-y-6">
                {section.steps.map((step, index) => (
                  <Step
                    key={step.id}
                    step={step}
                    stepNumber={index + 1}
                    isCompleted={!!progress[step.id]}
                    onToggle={onToggleStep}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 4. Live Session Notes */}
          {section.liveSessionNotes && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <IconPresentationChart className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-purple-900 mb-2 sm:mb-3">Live Session Notes</h3>
                  <div className="text-purple-800 leading-relaxed text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: section.liveSessionNotes }}></div>
                </div>
              </div>
            </div>
          )}

          {/* 5. Common Questions */}
          {section.commonQuestions && section.commonQuestions.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <IconQuestionMarkCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-2 sm:mb-3">Common Questions</h3>
                  <div className="space-y-4">
                    {section.commonQuestions.map((qa, i) => (
                      <div key={i} className="border-l-2 border-green-300 pl-3">
                        <div className="font-semibold text-green-800 text-sm sm:text-base mb-1">{qa.question}</div>
                        <div className="text-green-700 text-sm sm:text-base">{qa.answer}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. Tips Box */}
          {section.tips && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <IconLightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2 sm:mb-3">Pro Tip</h3>
                  <div className="text-blue-800 leading-relaxed text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: section.tips }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <button
              onClick={() => onNavigate('prev')}
              disabled={!hasPrevious}
              className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                hasPrevious
                  ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <IconChevronLeft className="w-5 h-5" />
              <span>Previous Section</span>
            </button>

            <div className="text-sm text-gray-500 order-first sm:order-none">
              Section {currentIndex + 1} of {totalSections}
            </div>

            {hasNext ? (
              <button
                onClick={() => onNavigate('next')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <span>Next Section</span>
                <IconChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={onCompleteCourse}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors bg-green-600 text-white hover:bg-green-700"
              >
                <span>Complete Course</span>
                <IconCheckCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionPage;
