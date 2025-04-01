import React from 'react';
import { useStore } from '../../lib/store';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Moon, Sun } from 'lucide-react';

function hexToHSL(hex: string) {
  // Remove the # if present
  hex = hex.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find greatest and smallest channel values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    
    h /= 6;
  }

  // Convert to degrees, and percentages
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}

export function SettingsView() {
  const { settings, updateSettings } = useStore();

  const handleThemeChange = (mode: 'light' | 'dark') => {
    updateSettings({ ...settings, theme: { ...settings.theme, mode } });
    document.documentElement.classList.toggle('dark', mode === 'dark');
  };

  const handleColorChange = (color: string) => {
    updateSettings({
      ...settings,
      theme: { ...settings.theme, primaryColor: color },
    });
    
    // Convert hex color to HSL and update CSS variable
    const hslValue = hexToHSL(color);
    document.documentElement.style.setProperty('--primary-color-hsl', hslValue);
  };

  const colors = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Green', value: '#22C55E' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Pink', value: '#EC4899' },
  ];

  // Apply theme color on component mount
  React.useEffect(() => {
    const hslValue = hexToHSL(settings.theme.primaryColor);
    document.documentElement.style.setProperty('--primary-color-hsl', hslValue);
    document.documentElement.classList.toggle('dark', settings.theme.mode === 'dark');
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Theme</h2>
          <div className="flex items-center gap-4">
            <Label>Mode</Label>
            <div className="flex gap-2">
              <Button
                variant={settings.theme.mode === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleThemeChange('light')}
              >
                <Sun className="mr-2 h-4 w-4" />
                Light
              </Button>
              <Button
                variant={settings.theme.mode === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleThemeChange('dark')}
              >
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Primary Color</h2>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorChange(color.value)}
                className={`h-8 w-8 rounded-full transition-transform hover:scale-110 ${
                  settings.theme.primaryColor === color.value
                    ? 'ring-2 ring-offset-2'
                    : ''
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}