import ProfileOverviewCard from "../ProfileOverViewCard"
import BuyerOrderInfo from "./BuyerOrderInfo"

const BuyerDashboard = () => {
  return (
    <div className="container flex flex-col md:flex-row py-10 md:gap-7">
      <div className="md:w-1/3">
        <ProfileOverviewCard/>
      </div>
      <div className="md:w-2/3">
       <BuyerOrderInfo/>
      </div>
    </div>
  )
}

export default BuyerDashboard
