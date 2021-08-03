import { navigate } from "gatsby"
import React from "react"

const NotFound404 = () => {
  return (
    <div style={{ textAlign: "center" }}>
      Sorry Page Not Found!
      <div>
        <button onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default NotFound404
