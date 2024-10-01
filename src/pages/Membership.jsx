import React from 'react'
import PlansCard from '../components/Cards/PlansCard'

const Membership = () => {
  return (
    <div className="home_page bg-black py-8 px-6 rounded-2xl">
      <div className="mb-20">
        <div className="flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8">
            <h3 className="text-2xl sm:text-5xl leading-none font-bold">
                Membership
            </h3>
          <p>ACCOUNT IS AUTOMATICALLY RENEWED UNLESS YOU SWITCH OFF THE RECURRING BILLING ON THE SETTINGS.<br></br><br>
          </br>
          The membership renewal fees will be the rates available at the time of renewal. If you renew your membership, the time will start on the same day you renew. Swinxter does not take responsibility for renewal fees if member fails to switch off their recurring billing. All sales are final and no refund are offered.
          <br/>
          For questions regarding payments, please contact support.
          </p>
        </div>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", marginTop: "50px"}}>
          <PlansCard title="3 Days" price="Free"/>
          <PlansCard title="1 Week" price="$14.99"/>
          <PlansCard title="1 Month" price="$24.99"/>
          <PlansCard title="3 Months" price="$46.99"/>
          <PlansCard title="6 Months" price="$77.99" />
          <PlansCard title="9 Months" price="$119.99"/>
        </div>
      </div>
    </div>
  )
}

export default Membership