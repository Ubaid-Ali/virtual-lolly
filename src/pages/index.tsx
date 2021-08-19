import { navigate } from "gatsby"
import React from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import ListLollies from "../components/ListLollies"

export default function Home() {
  return (
    <div className="container">
      <Header />
      <ListLollies />
      <div>
        <button onClick={() => navigate("/createNew")}
          className="btn"
        >
          Make a new lolly to send to a friend
        </button>
      </div>
      <Footer />
    </div>
  )
}
