import React from "react"
import Lolly from "../components/Lolly"

export default function Home() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>This is Home Page!</h1>
      <Lolly
        fillLollyTop="red"
        fillLollyMiddle="blue"
        fillLollyBottom="green"
      />
    </div>
  )
}
