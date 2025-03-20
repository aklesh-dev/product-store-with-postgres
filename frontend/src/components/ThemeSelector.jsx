import { PaletteIcon } from 'lucide-react';
import React from 'react'
import { THEMES } from '../constants/theme';
import { useThemeStore } from '../store/useThemeStore';

function ThemeSelector() {
  const { theme, setTheme } = useThemeStore()
  console.log(theme);

  return (
    <div className='dropdown dropdown-end'>
      {/* Dropdown Trigger */}
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon size={20} />
      </button>

      <div tabIndex={0}
        className='dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10'
      >
        {THEMES.map((themeOption) => (
          <button
            key={themeOption.name}
            className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${theme === themeOption.name ? 'bg-base-300': ''} `}
            onClick={() => setTheme(themeOption.name)}

          >
            <PaletteIcon className='size-4' />
            <span className="text-sm font-medium">{themeOption.label}</span>
            {/* Theme preview colors */}
            <div className="ml-auto flex gap-1">
              {themeOption.colors.map((color, i) => (
                <span className='size-2 rounded-full' style={{ backgroundColor: color }} key={i} />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ThemeSelector;