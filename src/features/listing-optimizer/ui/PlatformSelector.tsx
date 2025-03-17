import React from 'react';

interface PlatformSelectorProps {
  availablePlatforms: Array<{
    id: string;
    name: string;
    iconName: string;
    colorFrom: string;
    colorTo: string;
  }>;
  selectedPlatforms: string[];
  onPlatformChange: (platforms: string[]) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  availablePlatforms,
  selectedPlatforms,
  onPlatformChange
}) => {
  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      onPlatformChange(selectedPlatforms.filter(id => id !== platformId));
    } else {
      onPlatformChange([...selectedPlatforms, platformId]);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Select Platforms to Optimize For</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {availablePlatforms.map(platform => (
          <div
            key={platform.id}
            className={`border rounded-lg p-4 flex items-center cursor-pointer transition-colors ${
              selectedPlatforms.includes(platform.id)
                ? `border-2 bg-gray-800 border-${platform.colorFrom}`
                : 'border-gray-700 bg-gray-900 hover:border-gray-500'
            }`}
            onClick={() => togglePlatform(platform.id)}
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${platform.colorFrom} ${platform.colorTo} flex items-center justify-center text-white mr-3`}>
              {/* Placeholder for icon */}
              <span>{platform.name.charAt(0)}</span>
            </div>
            <span className={`font-medium ${
              selectedPlatforms.includes(platform.id) ? 'text-white' : 'text-gray-400'
            }`}>
              {platform.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
