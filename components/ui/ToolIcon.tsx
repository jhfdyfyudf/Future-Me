import React from 'react';

interface ToolIconProps {
  toolName: string;
  isDraggable: boolean;
}

const getIconClass = (toolName: string): string => {
  const name = toolName.toLowerCase();
  // Doctor
  if (name.includes('stethoscope')) return 'fa-stethoscope';
  if (name.includes('bandage') || name.includes('dressing')) return 'fa-band-aid';
  if (name.includes('thermometer')) return 'fa-thermometer';
  if (name.includes('scalpel')) return 'fa-scalpel';
  if (name.includes('syringe') || name.includes('shot')) return 'fa-syringe';
  if (name.includes('medicine') || name.includes('pills')) return 'fa-pills';

  // Chef
  if (name.includes('knife')) return 'fa-kitchen-set';
  if (name.includes('pan')) return 'fa-plate-wheat';
  if (name.includes('spatula') || name.includes('utensils')) return 'fa-utensils';
  if (name.includes('whisk')) return 'fa-blender';
  if (name.includes('oven')) return 'fa-fire-burner';

  // Astronaut
  if (name.includes('helmet')) return 'fa-user-astronaut';
  if (name.includes('wrench')) return 'fa-wrench';
  if (name.includes('button') || name.includes('panel')) return 'fa-toggle-on';
  if (name.includes('lever')) return 'fa-sliders';
  
  // Engineer
  if (name.includes('gear')) return 'fa-gear';
  if (name.includes('circuit') || name.includes('wire')) return 'fa-microchip';
  if (name.includes('screwdriver')) return 'fa-screwdriver-wrench';

  // Artist
  if (name.includes('brush') || name.includes('paintbrush')) return 'fa-paintbrush';
  if (name.includes('palette') || name.includes('color')) return 'fa-palette';
  if (name.includes('canvas')) return 'fa-image';

  // Police
  if (name.includes('badge')) return 'fa-id-badge';
  if (name.includes('handcuffs')) return 'fa-cufflinks';
  if (name.includes('radio') || name.includes('walkie-talkie')) return 'fa-walkie-talkie';
  if (name.includes('magnifying')) return 'fa-magnifying-glass';

  // Teacher
  if (name.includes('book')) return 'fa-book-open';
  if (name.includes('chalk')) return 'fa-chalkboard';
  if (name.includes('apple')) return 'fa-apple-whole';
  
  return 'fa-question-circle'; // Default icon
};

export const ToolIcon: React.FC<ToolIconProps> = ({ toolName, isDraggable }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('toolName', toolName);
  };

  return (
    <div
      draggable={isDraggable}
      onDragStart={isDraggable ? handleDragStart : undefined}
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white shadow-md border-2 h-full transition-all duration-300 ${isDraggable ? 'cursor-grab hover:shadow-lg hover:border-blue-400 active:cursor-grabbing' : 'opacity-50 cursor-not-allowed'}`}
      title={toolName}
    >
      <i className={`fa-solid ${getIconClass(toolName)} text-4xl text-gray-700`}></i>
      <span className="font-semibold text-gray-800 capitalize text-center">{toolName}</span>
    </div>
  );
};
