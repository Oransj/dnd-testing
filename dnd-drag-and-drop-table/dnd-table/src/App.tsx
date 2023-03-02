import { render } from 'react-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from './components/Container'

const ITEMS = [
  {
    id: 1,
    text: "Write a cool JS library",
  },
  {
    id: 2,
    text: "Make it generic enough",
  },
  {
    id: 3,
    text: "Write README",
  },
  {
    id: 4,
    text: "Create some examples",
  },
  {
    id: 5,
    text: "Spam in Twitter and IRC to promote it",
  },
  {
    id: 6,
    text: "???",
  },
  {
    id: 7,
    text: "PROFIT",
  },
];

const ITEMS2 = [
  {
    id: 1,
    text: "Test1",
  },
  {
    id: 2,
    text: "Test2",
  },
  {
    id: 3,
    text: "Test3",
  },
];

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Container cards={ITEMS} />
        <Container cards={ITEMS2} />
      </DndProvider>
    </div>
  )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)

export default App
