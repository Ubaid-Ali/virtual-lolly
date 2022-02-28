import React, { useState, useRef } from "react"
import Header from "../components/Header"
import Lolly from "../components/Lolly"
import { useQuery, useMutation, gql } from "@apollo/client"
import Footer from "../components/Footer"
// import { navigate } from "gatsby"

// Apollo Query
const APOLLO_QUERY = gql`
  {
    hello
  }
`;

// Apollo Mutaion
const APOLLO_MUTATION = gql`
  mutation makeLolly( $fillLollyTop: String!, $fillLollyMiddle: String!, $fillLollyBottom: String!, $recipientName: String!, $message: String!, $sender: String!) {
    makeLolly(fillLollyTop: $fillLollyTop, fillLollyMiddle: $fillLollyMiddle, fillLollyBottom: $fillLollyBottom, recipientName: $recipientName, message: $message, sender: $sender) {
      fillLollyTop
      fillLollyMiddle
      fillLollyBottom
      recipientName
      message
      sender
    }
  }
`

// M a i n   C o m p o n e n t
const createNewLolly = () => {

  const [flavour, setFlavour] = useState({
    top: "#4B0082",
    middle: "#8A2BE2",
    bottom: "#FF00FF",
  })
  const recipientNameRef = useRef<HTMLInputElement>()
  const messageRef = useRef<HTMLTextAreaElement>()
  const senderRef = useRef<HTMLInputElement>()

  const { data, loading, error } = useQuery(APOLLO_QUERY)
  const [createLolly] = useMutation(APOLLO_MUTATION)

  const colorChangeHandler = (e: {
    target: { name: string; value: string }
  }) => {
    setFlavour(state => ({ ...state, [e.target.name]: e.target.value }))
  }

  const submitLollyForm = async () => {
    console.log(`submitting LollyForm`)
    if (
      recipientNameRef.current.value &&
      messageRef.current.value &&
      senderRef.current.value
    ) {
      const result = await createLolly({
        variables: {
          fillLollyTop: flavour.top,
          fillLollyMiddle: flavour.middle,
          fillLollyBottom: flavour.bottom,
          recipientName: recipientNameRef.current.value,
          message: messageRef.current.value,
          sender: senderRef.current.value
        }
      })
      console.log(`Data Document Created in faunaDB Sucessfully!`)
      alert("Data Document Created in faunaDB Sucessfully!")
      console.log('result', result)
      // navigate(`showLolly?${result.data.makeLolly.lollyPath}`);
      // navigate(`/showLolly/`, { state: { lolly: result.data.makeLolly }, replace: true })
      recipientNameRef.current.value = ""
      messageRef.current.value = ""
      senderRef.current.value = ""
    } else {
      console.log(`Please Fill the form completely`)
      alert("Please Fill the form completely")
    }
  }
  // console.log('recipientNameRef', recipientNameRef?.current?.value)
  return (
    <div className="container">
      <Header />
      {loading && <h1>Loading...</h1>}
      {error && <h2>{error.message}</h2>}
      <div className="create-lolly-container">
        <Lolly
          className="create-lolly-lollipop"
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
          <div className="input-text-div">
            <label htmlFor="recipientName">To
              <input
                type="text"
                name="recipientName"
                id="recipientName"
                ref={recipientNameRef}
                required
                placeholder="A lolly for..."
              />
            </label>
            <label htmlFor="senderMessage">Say something nice
              <textarea
                rows={10}
                name="senderMessage"
                id="senderMessage"
                ref={messageRef}
                required
              />
            </label>
            <label htmlFor="senderName">From
              <input
                type="text"
                name="senderName"
                id="senderName"
                ref={senderRef}
                required
                placeholder="from your fried..."
              />
            </label>

          </div>
          <button type="submit" onClick={submitLollyForm} className="btn">
            Freeze this lolly and get a link
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default createNewLolly
