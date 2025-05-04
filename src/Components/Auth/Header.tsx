import { Goback, ThemeToggle } from "../UI"

const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-10">
        <nav className="layout flex items-center justify-between h-[60px]">
          <Goback/>
          <ThemeToggle/>
        </nav>
    </header>
  )
}

export default Header