import React, { useState, useRef } from "react"
import Header from "../components/Header"
import Lolly from "../components/Lolly"

const createNew = () => {
  const [flavour, setFlavour] = useState({
    top: "#4B0082",
    middle: "#8A2BE2",
    bottom: "#FF00FF",
  })

  const recipientName = useRef<HTMLInputElement>(null)
  const message = useRef<HTMLTextAreaElement>(null)
  const sender = useRef<HTMLInputElement>(null)

  const colorChangeHandler = (e: {
    target: { name: string; value: string }
  }) => {
    setFlavour(st => ({ ...st, [e.target.name]: e.target.value }))
  }

  const submitLollyForm = () => {
    console.log(`Clicked`)
    if (recipientName.current !== null) {
      // console.log("RecipientName: ", recipientName.current.value)
    }
    if (message.current !== null) {
      // console.log("message: ", message.current.value)
    }
    if (sender.current !== null) {
      // console.log("sender: ", sender.current.value)
    }
    // console.log(`flavour: `, flavour)
  }

  return (
    <div className="container">
      <Header />
      <div className="create-lolly-container">
        <Lolly
          fillLollyTop={flavour.top}
          fillLollyMiddle={flavour.middle}
          fillLollyBottom={flavour.bottom}
        />
        {/* C O L O R   I N P U T S */}
        <div className="colorBoxes">
          <label className="colorPickerLabel" htmlFor="top">
            <input
              onChange={colorChangeHandler}
              value={flavour.top}
              name="top"
              type="color"
              className="colorPicker"
            />
          </label>
          <label className="colorPickerLabel" htmlFor="flavourMiddle">
            <input
              onChange={colorChangeHandler}
              value={flavour.middle}
              name="middle"
              type="color"
              className="colorPicker"
            />
          </label>
          <label className="colorPickerLabel" htmlFor="bottom">
            <input
              onChange={colorChangeHandler}
              value={flavour.bottom}
              name="bottom"
              type="color"
              className="colorPicker"
            />
          </label>
        </div>
        {/* T E X T  I N P U T S */}
        <div className="lollyForm">
          <label htmlFor="recipientName">To</label>
          <input
            type="text"
            name="recipientName"
            id="recipientName"
            ref={recipientName}
            required
          />
          <label htmlFor="senderMessage">Message</label>
          <textarea
            rows={15}
            name="senderMessage"
            id="senderMessage"
            ref={message}
            required
          />
          <label htmlFor="senderName">From</label>
          <input
            type="text"
            name="senderName"
            id="senderName"
            ref={sender}
            required
          />
          <button type="submit" onClick={submitLollyForm}>
            Ceate Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default createNew
