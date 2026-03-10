import React from 'react';
import {
    Activity,    // Cardio
    User,        // Neck/Head
    GitCommit,   // Core/Abs (abs definition)
    ActivitySquare, // Chest (box volume)
    CircleDot,   // Shoulders (deltoid roundness)
    TrendingUp,  // Biceps (growth)
    TrendingDown,// Triceps (extension)
    Zap,         // Forearms (grip strength)
    ArrowUp,     // Legs (squat up)
    AlignJustify // Back (lats width)
} from 'lucide-react';

// Using lucide-react icons to guarantee they render correctly, as react-icons 
// was causing Vite dev server cache issues resulting in invisible SVGs.

export const ChestIcon = ({ size = 20, color = 'currentColor', ...props }) => (
    <ActivitySquare size={size} color={color} {...props} />
);

export const BackIcon = ({ size = 20, color = 'currentColor', ...props }) => (
    <AlignJustify size={size} color={color} {...props} />
);

export const LegsIcon = ({ size = 20, color = 'currentColor', ...props }) => (
    <ArrowUp size={size} color={color} {...props} />
);

export const ShouldersIcon = ({ size = 20, color = 'currentColor', ...props }) => (
    <CircleDot size={size} color={color} {...props} />
);

export const BicepsIcon = ({ size = 20, color = 'currentColor', ...props }) => (
    <TrendingUp size={size} color={color} {...props} />
);

export const TricepsIcon = ({ size = 20, color = 'currentColor', ...props }) => (
    <TrendingDown size={size} color={color} {...props} />
);

export const CoreIcon = ({ size = 20, color = 'currentColor', ...props }) => (
    <GitCommit size={size} color={color} {...props} />
);

export const CardioIcon = ({ size = 20, color = 'currentColor', ...props }) => (
    <Activity size={size} color={color} {...props} />
);

export const NeckIcon = ({ size = 20, color = 'currentColor', ...props }) => (
    <User size={size} color={color} {...props} />
);

export const ForearmsIcon = ({ size = 20, color = 'currentColor', ...props }) => (
    <Zap size={size} color={color} {...props} />
);

// Map category keys to icon components
export const CATEGORY_ICON_MAP = {
    CHEST: ChestIcon,
    BACK: BackIcon,
    LEGS: LegsIcon,
    SHOULDERS: ShouldersIcon,
    BICEPS: BicepsIcon,
    TRICEPS: TricepsIcon,
    CORE: CoreIcon,
    CARDIO: CardioIcon,
    NECK: NeckIcon,
    FOREARMS: ForearmsIcon,
};
