'use client'

import dynamic from 'next/dynamic'
import useUser from "@/hooks/useUser"

// Dynamically import components with no SSR
const FreelancerOrder = dynamic(() => import('./FreelancerOrder/FreelancerOrder'), { ssr: false })
const BuyerOrder = dynamic(() => import('./BuyerOrder/BuyerOrder'), { ssr: false })

const Order = () => {
  const user = useUser()

  return (
    <>
      {
        user && user.role === 'freelancer' ? <FreelancerOrder /> : <BuyerOrder />
      }
    </>
  )
}

export default Order
