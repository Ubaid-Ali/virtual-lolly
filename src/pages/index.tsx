import { navigate } from "gatsby"
import React from "react"
import Header from "../components/Header"
import ListLollies from "../components/ListLollies"

export default function Home() {
  return (
    <div className="container">
      <Header />
      <ListLollies />
      <div>
        <button onClick={() => navigate("/createNew")}>
          Create New Lolly!
        </button>
      </div>
    </div>
  )
}
