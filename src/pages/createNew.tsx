import React, { useState, useRef } from "react"
import Header from "../components/Header"
import Lolly from "../components/Lolly"
import { useQuery, useMutation, gql } from "@apollo/client"

// Apollo Query
const APOLLO_QUERY = gql`
  {
    hello
  }
`;

// Apollo Mutaion
// const APOLLO_MUTATION = gql`
//   mutation createNewLolly( $fillLollyTop: String!, $fillLollyMiddle: String!, $fillLollyBottom: String!, $recipientName: String!, $message: String!, $sender: String!) {
//       createNewLolly(fillLollyTop: $fillLollyTop, fillLollyMiddle: $fillLollyMiddle, fillLollyBottom: $fillLollyBottom, recipientName: $recipientName, message: $message, sender: $sender) {
//         message
//       }
//     }
// `

const apolloMutation = gql`
  mutation makeLolly {
    makeLolly {
      UserName {
        firstName
      }
    }
  }
 `

// M a i n   C o m p o n e n t
const createNew = () => {

  const [flavour, setFlavour] = useState({
    top: "#4B0082",
    middle: "#8A2BE2",
    bottom: "#FF00FF",
  })
  const recipientNameRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const senderRef = useRef<HTMLInputElement>(null)

  const { data, loading, error } = useQuery(APOLLO_QUERY)
  const [createLolly] = useMutation(apolloMutation)

  const colorChangeHandler = (e: {
    target: { name: string; value: string }
  }) => {
    setFlavour(state => ({ ...state, [e.target.name]: e.target.value }))
  }

  const submitLollyForm = async () => {
    console.log(`Clicked`)
    if (
      recipientNameRef.current !== null &&
      messageRef.current !== null &&
      senderRef.current !== null
    ) {
      const result = await createLolly({
        variables: {
          // fillLollyTop: flavour.top,
          // fillLollyMiddle: flavour.middle,
          // fillLollyBottom: flavour.bottom,
          // recipientName: recipientNameRef.current.value,
          //  recipientName: "John"
          // message: messageRef.current.value,
          // sender: senderRef.current.value
          // sender: "John from Client Side"
        }
      })

      // console.log(`result: `, data)
      // console.log(`result: `, result)
      // console.log("RecipientName: ", recipientNameRef.current.value)
      // console.log("message: ", messageRef.current.value)
      // console.log("sender: ", senderRef.current.value)
      // console.log(`flavour: `, flavour)
    }
  }

  console.log(`data: `, data)

  return (
    <div className="container">
      <Header />
      {data && <h2>Its Ok {data.hello} </h2>}
      {loading && <h1>Loading...</h1>}
      {error && <h2>{error.message}</h2>}
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
            ref={recipientNameRef}
            required
          />
          <label htmlFor="senderMessage">Message</label>
          <textarea
            rows={15}
            name="senderMessage"
            id="senderMessage"
            ref={messageRef}
            required
          />
          <label htmlFor="senderName">From</label>
          <input
            type="text"
            name="senderName"
            id="senderName"
            ref={senderRef}
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
