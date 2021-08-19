import React from "react"
import { Link } from "gatsby"

const Header = () => {
  return (
    <div className="header">
      <h1 className="header-heading">
        <Link to="/">virtual lollipop</Link>
      </h1>
      <p className="header-paragraph">
        because we all know <br /> someone who deserves some sugar.
      </p>
    </div>
  )
}

export default Header
