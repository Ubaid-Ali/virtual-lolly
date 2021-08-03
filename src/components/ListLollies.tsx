import React from "react"
import Lolly from "./Lolly"

const ListLollies = () => {
  // lolly colors
  const displayLollies = [
    {
      fillLollyTop: "#008000",
      fillLollyMiddle: "#00FF7F",
      fillLollyBottom: "#2E8B57",
    },
    {
      fillLollyTop: "#008080",
      fillLollyMiddle: "#7FFFD4",
      fillLollyBottom: "#E0FFFF",
    },
    {
      fillLollyTop: "#4B0082",
      fillLollyMiddle: "#8A2BE2",
      fillLollyBottom: "#FF00FF",
    },
  ]

  return (
    <div className="list-lollies">
      {displayLollies.map((l, ind) => (
        <div key={ind}>
          <Lolly
            fillLollyTop={l.fillLollyTop}
            fillLollyMiddle={l.fillLollyMiddle}
            fillLollyBottom={l.fillLollyBottom}
          />
        </div>
      ))}
    </div>
  )
}

export default ListLollies
