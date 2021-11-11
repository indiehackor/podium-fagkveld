import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const NavBar = () => <nav>
  <a href="/home">Home</a>
  <a href="/about">About</a>
  <a href="/blog">Blogg</a>
</nav>

ReactDOM.render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>,
  document.getElementById('sidebar')
)
