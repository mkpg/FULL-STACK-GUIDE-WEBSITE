
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import SectionPage from './components/SectionPage';
import CourseCompleted from './components/CourseCompleted';
import { SECTIONS } from './constants';
import useLocalStorage from './hooks/useLocalStorage';
import type { Progress } from './types';

const App: React.FC = () => {
  const [progress, setProgress] = useLocalStorage<Progress>('workshop-progress', {});
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);

  // Scroll to top when navigating to a section
  useEffect(() => {
    if (currentSectionId) {
      // Small delay for better visual feedback
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [currentSectionId]);

  const handleToggleStep = (stepId: string) => {
    setProgress(prev => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  const handleNavigateToSection = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    // Scroll to top when navigating to a section from dashboard
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    
    return () => clearTimeout(timer);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!currentSectionId) return;
    
    const currentIndex = SECTIONS.findIndex(section => section.id === currentSectionId);
    if (currentIndex === -1) return;

    let newIndex: number;
    if (direction === 'prev') {
      newIndex = Math.max(0, currentIndex - 1);
    } else {
      newIndex = Math.min(SECTIONS.length - 1, currentIndex + 1);
    }

    setCurrentSectionId(SECTIONS[newIndex].id);
    // Scroll to top when navigating between sections
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    
    return () => clearTimeout(timer);
  };

  const handleBackToDashboard = () => {
    setCurrentSectionId(null);
    // Scroll to top when returning to dashboard
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    
    return () => clearTimeout(timer);
  };

  const handleCompleteCourse = () => {
    // Force show the course completed page
    // We'll set a special state to indicate course completion
    setCurrentSectionId('completed');
  };

  // Check if course is completed (all steps in all sections are completed)
  const isCourseCompleted = () => {
    const totalSteps = SECTIONS.reduce((total, section) => total + section.steps.length, 0);
    const completedSteps = Object.keys(progress).length;
    return totalSteps > 0 && completedSteps === totalSteps;
  };

  // Check if user is on the last section and has completed all steps
  const shouldShowCourseCompleted = () => {
    if (!currentSectionId) return false;
    
    const currentIndex = SECTIONS.findIndex(section => section.id === currentSectionId);
    if (currentIndex !== SECTIONS.length - 1) return false; // Not on last section
    
    const currentSection = SECTIONS[currentIndex];
    const sectionStepsCompleted = currentSection.steps.every(step => progress[step.id]);
    
    return sectionStepsCompleted;
  };

  // If course is completed and user is on last section, show completion page
  if (shouldShowCourseCompleted()) {
    const totalSteps = SECTIONS.reduce((total, section) => total + section.steps.length, 0);
    const completedSteps = Object.keys(progress).length;
    
    return (
      <CourseCompleted
        onBackToDashboard={handleBackToDashboard}
        totalSections={SECTIONS.length}
        completedSteps={completedSteps}
      />
    );
  }

  // If user clicked "Complete Course" button, show completion page
  if (currentSectionId === 'completed') {
    const totalSteps = SECTIONS.reduce((total, section) => total + section.steps.length, 0);
    const completedSteps = Object.keys(progress).length;
    
    return (
      <CourseCompleted
        onBackToDashboard={handleBackToDashboard}
        totalSections={SECTIONS.length}
        completedSteps={completedSteps}
      />
    );
  }

  // If no section is selected, show the dashboard
  if (!currentSectionId) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-xl font-bold text-gray-900">Full-Stack Workshop Guide</h1>
              <a
                href="/workshop-code.zip"
                download
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Download All Code
              </a>
            </div>
          </div>
        </header>

        <Dashboard
          sections={SECTIONS}
          progress={progress}
          onNavigateToSection={handleNavigateToSection}
        />
      </div>
    );
  }

  // Show the selected section
  const currentSection = SECTIONS.find(section => section.id === currentSectionId);
  const currentIndex = SECTIONS.findIndex(section => section.id === currentSectionId);

  if (!currentSection) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Section Not Found</h1>
          <button
            onClick={handleBackToDashboard}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Dashboard</span>
              </button>
            </div>
            
            <div className="flex-1 text-center">
              <h1 className="text-xl font-bold text-gray-900">Full-Stack Workshop Guide</h1>
            </div>

            <div>
              <a
                href="/workshop-code.zip"
                download
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Download Code
              </a>
            </div>
          </div>
        </div>
      </header>

      <SectionPage
        section={currentSection}
        progress={progress}
        onToggleStep={handleToggleStep}
        onNavigate={handleNavigate}
        hasPrevious={currentIndex > 0}
        hasNext={currentIndex < SECTIONS.length - 1}
        currentIndex={currentIndex}
        totalSections={SECTIONS.length}
        onCompleteCourse={handleCompleteCourse}
      />
    </div>
  );
};

export default App;
