
import React from 'react';
import type { Section } from '../types';
import { IconX } from './Icons';

interface SidebarProps {
  sections: Section[];
  activeSectionId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sections, activeSectionId, isOpen, onClose }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>
      
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-6 transform transition-transform duration-300 ease-in-out z-40 md:sticky md:transform-none md:h-screen md:w-72 flex-shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-8 md:mb-10">
          <h2 className="text-xl font-bold">Workshop Sections</h2>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
            <IconX className="w-6 h-6" />
          </button>
        </div>
        <nav>
          <ul>
            {sections.map(section => (
              <li key={section.id} className="mb-2">
                <a
                  href={`#${section.id}`}
                  onClick={onClose}
                  className={`block px-4 py-2 rounded-md transition-colors duration-200 ${
                    activeSectionId === section.id
                      ? 'bg-indigo-600 font-semibold'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
