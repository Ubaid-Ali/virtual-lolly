import { navigate } from "gatsby"
import React from "react"

const NotFound404 = () => {
  return (
    <div className="notFound_404" style={{ textAlign: "center" }}>
      Sorry Page Not Found!
      <div>
        <button
         onClick={() => navigate("/")}
         className="btn"
         >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default NotFound404
