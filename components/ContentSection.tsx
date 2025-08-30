
import React, { useState, forwardRef } from 'react';
import type { Section, Progress } from '../types';
import Step from './Step';
import { IconChevronDown, IconLightbulb, IconClock, IconBookOpen, IconPresentationChart, IconQuestionMarkCircle } from './Icons';

interface ContentSectionProps {
  section: Section;
  progress: Progress;
  onToggleStep: (stepId: string) => void;
}

const ContentSection = forwardRef<HTMLDivElement, ContentSectionProps>(({ section, progress, onToggleStep }, ref) => {
  const [isOpen, setIsOpen] = useState(true);

  const hasContent = section.overview || (section.coreConcepts && section.coreConcepts.length > 0) || (section.steps && section.steps.length > 0) || section.tips;

  return (
    <div id={section.id} ref={ref} className="mb-8 bg-white p-6 rounded-lg shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
        aria-expanded={isOpen}
      >
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
          {/* Live Session Info Bar */}
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
            {section.estimatedTime && (
              <div className="flex items-center gap-1">
                <IconClock className="w-4 h-4" />
                <span>{section.estimatedTime}</span>
              </div>
            )}
            {section.prerequisites && (
              <div className="flex items-center gap-1">
                <IconBookOpen className="w-4 h-4" />
                <span>Prerequisites: {section.prerequisites}</span>
              </div>
            )}
          </div>
        </div>
        <IconChevronDown
          className={`w-6 h-6 text-gray-500 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && hasContent && (
        <div className="mt-6 space-y-8">
          {/* 1. Overview */}
          {section.overview && (
            <div className="prose prose-indigo max-w-none">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Concept Overview</h4>
              <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: section.overview }}></p>
            </div>
          )}

          {/* 2. Core Concepts */}
          {section.coreConcepts && section.coreConcepts.length > 0 && (
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Core Concepts</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {section.coreConcepts.map((concept, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: concept }}></li>
                ))}
              </ul>
            </div>
          )}
          
          {/* 3. Hands-On Steps */}
          {section.steps && section.steps.length > 0 && (
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2 border-t pt-6">Hands-On Steps</h4>
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
          )}

          {/* 4. Live Session Notes */}
          {section.liveSessionNotes && (
            <div className="bg-purple-50 border-l-4 border-purple-400 text-purple-800 p-4 rounded-r-lg">
              <div className="flex items-start space-x-3">
                <IconPresentationChart className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-bold text-lg">Live Session Notes</h5>
                  <p className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: section.liveSessionNotes }}></p>
                </div>
              </div>
            </div>
          )}

          {/* 5. Common Questions */}
          {section.commonQuestions && section.commonQuestions.length > 0 && (
            <div className="bg-green-50 border-l-4 border-green-400 text-green-800 p-4 rounded-r-lg">
              <div className="flex items-start space-x-3">
                <IconQuestionMarkCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-bold text-lg">Common Questions</h5>
                  <div className="space-y-3 mt-2">
                    {section.commonQuestions.map((qa, i) => (
                      <div key={i} className="border-l-2 border-green-300 pl-3">
                        <div className="font-semibold text-sm mb-1">{qa.question}</div>
                        <div className="text-sm text-green-700">{qa.answer}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. Tips Box */}
          {section.tips && (
            <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded-r-lg flex items-start space-x-3">
              <IconLightbulb className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-bold">Pro Tip</h5>
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: section.tips }}></p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default ContentSection;
