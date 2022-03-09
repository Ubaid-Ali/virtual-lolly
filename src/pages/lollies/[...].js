import React from "react"
import DynamicLolly from "../../templates/dynamic_Lolly"
import { Router } from "@reach/router"

const Lollies = props => {
  return (
    <div className="lollies">
      <Router>
        <DynamicLolly path="/lollies/*lollyPath" />
      </Router>
    </div>
  )
}

export default Lollies
