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
    {
      fillLollyTop: "#ffaef4",
      fillLollyMiddle: "#ff9557",
      fillLollyBottom: "#FF851B",
    },
    {
      fillLollyTop: "#2f2fac",
      fillLollyMiddle: "#e4ee39",
      fillLollyBottom: "#00d4ff",
    },
  ]

  return (
    <div className="list-lollies">
      {displayLollies.map((lolly, ind) => (
        <div key={ind}>
          <Lolly
            className="listLollies-lollipop"
            fillLollyTop={lolly.fillLollyTop}
            fillLollyMiddle={lolly.fillLollyMiddle}
            fillLollyBottom={lolly.fillLollyBottom}
          />
        </div>
      ))}
    </div>
  )
}

export default ListLollies
