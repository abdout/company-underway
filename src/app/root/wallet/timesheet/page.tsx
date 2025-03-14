
import Footer from '@/components/wallet/timesheet/footer'
import Header from '@/components/wallet/timesheet/header'
import TimeList from '@/components/wallet/timesheet/list'
import React from 'react'

const Timesheet = () => {
  return (
    <div>
      <Header />
      <TimeList />
      <Footer />
    </div>
  )
}

export default Timesheet