import React from 'react';
import { IconCheckCircle, IconStar, IconTrophy, IconArrowLeft } from './Icons';

interface CourseCompletedProps {
  onBackToDashboard: () => void;
  totalSections: number;
  completedSteps: number;
}

const CourseCompleted: React.FC<CourseCompletedProps> = ({ 
  onBackToDashboard, 
  totalSections, 
  completedSteps 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToDashboard}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <IconArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            
            <div className="flex-1 text-center">
              <h1 className="text-xl font-bold text-gray-900">Full-Stack Workshop Guide</h1>
            </div>

            <div className="w-32">
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
            <IconCheckCircle className="w-16 h-16 text-green-600" />
          </div>

          {/* Congratulations Message */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            🎉 Congratulations! 🎉
          </h1>
          
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-8">
            You've Completed the Full-Stack Workshop!
          </h2>

          {/* Simple Message */}
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 mb-12">
            <div className="max-w-2xl mx-auto">
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-6">
                <span className="font-semibold text-green-600">Happy Learning!</span>
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                You've successfully completed all {totalSections} sections and mastered the fundamentals of full-stack web development. 
                From setting up your development environment to building complete applications, you've covered it all!
              </p>
            </div>
          </div>

          {/* Achievement Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconTrophy className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">{totalSections}</div>
              <div className="text-gray-600">Sections Completed</div>
            </div>
            

            
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconStar className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Course Progress</div>
            </div>
          </div>

          {/* What You've Learned */}
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What You've Mastered</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Frontend Development (React & Angular)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Backend APIs (PHP & Java Servlets)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Database Management (MySQL)</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Full-Stack Integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">CRUD Application Development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Development Environment Setup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 sm:p-12 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h3>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold">Keep Building:</span> Apply what you've learned to create your own projects. 
                The best way to solidify your skills is through practice.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold">Explore Advanced Topics:</span> Dive deeper into authentication, deployment, 
                testing, and other advanced concepts.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold">Join Communities:</span> Connect with other developers, share your projects, 
                and continue learning together.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBackToDashboard}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Review Course
            </button>
            
            <a
              href="/workshop-code.zip"
              download
              className="w-full sm:w-auto px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Download All Code
            </a>
          </div>

          {/* Final Message */}
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600">
              <span className="font-semibold text-green-600">Happy Learning!</span> 🚀
            </p>
            <p className="text-sm text-gray-500 mt-2">
              You're now equipped with the skills to build amazing web applications!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCompleted;
