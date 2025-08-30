import React from 'react';
import type { Section, Progress } from '../types';
import { IconPlay, IconBookOpen, IconCheckCircle, IconArrowRight } from './Icons';

interface DashboardProps {
  sections: Section[];
  progress: Progress;
  onNavigateToSection: (sectionId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ sections, progress, onNavigateToSection }) => {
  const getCompletedSteps = (section: Section) => {
    return section.steps.filter(step => progress[step.id]).length;
  };

  const getTotalSteps = (section: Section) => {
    return section.steps.length;
  };

  const getProgressPercentage = (section: Section) => {
    if (getTotalSteps(section) === 0) return 0;
    return Math.round((getCompletedSteps(section) / getTotalSteps(section)) * 100);
  };

  const isCourseCompleted = () => {
    return sections.every(section => section.steps.every(step => progress[step.id]));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Full-Stack Workshop Guide
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-indigo-100 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Master full-stack web development with hands-on projects, from Angular and React to PHP and Java Servlets
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-3 sm:px-4 py-2 rounded-full">
                <IconBookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{sections.length} Sections</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-3 sm:px-4 py-2 rounded-full">
                <IconCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Hands-on Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workshop Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            What You'll Learn
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            This comprehensive workshop covers the entire full-stack development spectrum, 
            from setting up your development environment to building a complete CRUD application.
          </p>
        </div>

        {/* Learning Path */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Learning Path</h3>
          <div className="relative">
            {/* Connection Line - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-200 via-indigo-300 to-indigo-200 transform -translate-x-1/2 rounded-full shadow-sm"></div>
            
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={section.id} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`flex-1 w-full md:w-auto ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} mb-4 md:mb-0`}>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      {/* Title */}
                      <div className="mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h4>
                      </div>
                      
                      {/* Completion Status - Right aligned for left sections, Left aligned for right sections */}
                      {section.steps.length > 0 && getProgressPercentage(section) === 100 && (
                        <div className={`flex items-center gap-1 text-green-600 font-medium text-sm mb-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                          <IconCheckCircle className="w-3 h-3" />
                          <span>Completed</span>
                        </div>
                      )}
                      
                      {section.overview && (
                        <p className={`text-gray-600 text-sm mb-4 line-clamp-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          {section.overview.replace(/<[^>]*>/g, '')}
                        </p>
                      )}

                      {/* Progress Bar and Steps - Consistent alignment */}
                      {section.steps.length > 0 && (
                        <div className={`flex flex-col sm:flex-row sm:items-center gap-2 mb-4 ${
                          index % 2 === 0 
                            ? 'md:flex-row-reverse md:justify-start md:space-x-reverse md:space-x-2' 
                            : 'md:flex-row md:justify-start md:space-x-2'
                        }`}>
                          <span className="text-gray-500 order-2 sm:order-1">
                            {getCompletedSteps(section)} of {getTotalSteps(section)} steps completed
                          </span>
                          <div className="w-full sm:w-20 bg-gray-200 rounded-full h-2 order-1 sm:order-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${getProgressPercentage(section)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Start Button - Consistent alignment */}
                      <div className={`flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        <button
                          onClick={() => onNavigateToSection(section.id)}
                          className="flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors px-4 py-2 rounded-md hover:bg-indigo-50"
                        >
                          <span>Start Section</span>
                          <IconArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Circle - Centered on mobile */}
                  <div className="relative z-10 mb-4 md:mb-0">
                    {/* Progress Ring Background */}
                    <div className="relative">
                      {/* Inner circle with content */}
                      <div className={`w-12 h-12 md:w-8 md:h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center relative z-10 transform ${
                        index % 2 === 0 
                          ? 'md:translate-x-[-50%]' 
                          : 'md:translate-x-[50%]'
                      } ${
                        section.steps.length > 0 && getProgressPercentage(section) === 100 
                          ? 'bg-green-600' 
                          : 'bg-indigo-600'
                      }`}>
                        {section.steps.length > 0 && getProgressPercentage(section) === 100 ? (
                          <IconCheckCircle className="w-6 h-6 md:w-4 md:h-4 text-white" />
                        ) : (
                          <span className="text-white text-sm md:text-xs font-bold">{index + 1}</span>
                        )}
                      </div>                      

                    </div>
                  </div>

                  {/* Empty space for alignment - Hidden on mobile */}
                  <div className="hidden md:block flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>



        {/* Get Started Button */}
        <div className="text-center">
          {isCourseCompleted() ? (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-green-100 text-green-800 px-6 py-3 rounded-lg text-lg font-semibold">
                <IconCheckCircle className="w-6 h-6 text-green-600" />
                Course Completed! 🎉
              </div>
              <div className="text-sm text-gray-600">
                You've mastered all {sections.length} sections and {sections.reduce((total, section) => total + section.steps.length, 0)} steps!
              </div>
            </div>
          ) : (
            <button
              onClick={() => onNavigateToSection(sections[0].id)}
              className="inline-flex items-center gap-2 sm:gap-3 bg-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <IconPlay className="w-5 h-5 sm:w-6 sm:h-6" />
              Start Workshop
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
