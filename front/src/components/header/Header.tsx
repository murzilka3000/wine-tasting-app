import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/add-wine">Wines</Link>
    </header>
  )
}

export default Header