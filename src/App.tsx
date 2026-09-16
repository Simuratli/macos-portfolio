import { Navbar, Welcome, Dock } from '#components/index'
import Terminal from '#windows/terminal'
import gsap from 'gsap';
import { Draggable } from 'gsap/all'


gsap.registerPlugin(Draggable);
function App() {

  return (
    <main>
      <Navbar />
      <Welcome/>
      <Dock />
      <Terminal />
    </main>
  )
}

export default App
