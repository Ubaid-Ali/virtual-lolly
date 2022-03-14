import React from "react"
import DynamicLolly from "../../templates/dynamic_Lolly"
import { Router } from "@reach/router"

const Lollies = () => {
  return (
    <div className="lollies">
      <Router>
        <DynamicLolly path="/lollies/*lollyPath" />
      </Router>
    </div>
  )
}

export default Lollies
