import React from 'react'
import { Icon } from "@iconify/react";
import { cn } from '@/lib/utils';

interface TextIconProps {
  label: string;
  icon: string;
  color?: 'red' | 'yellow' | 'black';
  iconSize?: number;
}

const TextIcon = ({ label, icon, color, iconSize = 36 }: TextIconProps) => {
  return (
    <div className='flex flex-col space-y-1.5 items-center justify-center'>
      <Icon icon={icon} width={iconSize} />
      <span className={cn(
        'text-sm font-normal',
        color === 'red' && 'text-red-500',
        color === 'yellow' && 'text-yellow-500',
        color === 'black' && 'text-black',
      )}>
        {label}
      </span>
    </div>
  )
}

export default TextIcon