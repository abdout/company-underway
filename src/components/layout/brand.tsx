// Brand.tsx
import SmIcon from '@/components/atom/icon/sm'
import React from 'react'

const Brand = () => {
  return (
    <div className='flex items-center gap-2'>
      <div className="flex-shrink-0">
        <SmIcon src='/eco.png' alt='logo' path='/root/home' />
      </div>
      <h2 className="font-bold text-xl">ECO</h2>
    </div>
  )
}

export default Brand