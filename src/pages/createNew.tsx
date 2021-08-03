import { StaticQuery } from "gatsby"
import React, { useState } from "react"
import Header from "../components/Header"
import Lolly from "../components/Lolly"

const createNew = () => {
  const [inputColor, setInputColor] = useState({
    flavourTop: "#4B0082",
    flavourMiddle: "#8A2BE2",
    flavourBottom: "#FF00FF",
  })

  const colorChangeHandler = (e: {
    target: { name: string; value: string }
  }) => {
    setInputColor(st => ({ ...st, [e.target.name]: e.target.value }))
  }

  // console.log(`State inputColor: `, inputColor)
  return (
    <div className="container">
      <Header />
      <div className="create-lolly-container">
          <Lolly
            fillLollyTop={inputColor.flavourTop}
            fillLollyMiddle={inputColor.flavourMiddle}
            fillLollyBottom={inputColor.flavourBottom}
          />
        {/* COLOR INPUT */}
        <div className="colorBoxes">
          <label className="colorPickerLabel" htmlFor="flavourTop">
            <input
              onChange={colorChangeHandler}
              value={inputColor.flavourTop}
              name="flavourTop"
              type="color"
              className="colorPicker"
            />
          </label>
          <label className="colorPickerLabel" htmlFor="flavourMiddle">
            <input
              onChange={colorChangeHandler}
              value={inputColor.flavourMiddle}
              name="flavourMiddle"
              type="color"
              className="colorPicker"
            />
          </label>
          <label className="colorPickerLabel" htmlFor="flavourBottom">
            <input
              onChange={colorChangeHandler}
              value={inputColor.flavourBottom}
              name="flavourBottom"
              type="color"
              className="colorPicker"
            />
          </label>
        </div>
        <div className="lollyForm">
          <label htmlFor="recipientName">To</label>
          <input type="text" name="recipientName" id="recipientName" />
          <label htmlFor="senderMessage">Message</label>
          <textarea rows={15} name="senderMessage" id="senderMessage" />
          <label htmlFor="senderName">From</label>
          <input type="text" name="senderName" id="senderName" />
        </div>
      </div>
    </div>
  )
}

export default createNew
