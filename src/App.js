import './App.css';
import { useState, useRef } from 'react'
import ItemComponent from './components/ItemComponent';
const listColor = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black']

const ar2D = () => {
  const opacity = 1
  let as2D = []
  for (let i = 0; i < listColor.length; i++) {
    as2D[i] = []
    for (let j = 0; j < 8; j++) {
      as2D[i].push({
        color: listColor[i],
        opacity: opacity - (j / 10)
      })
    }
  }
  return as2D
}

function App() {
  const [state, setstate] = useState(ar2D())
  let dragItem = useRef({})
  let dragItemIndex = useRef([])

  const onDragStart = (i, j) => {
    dragItem = state[i][j];
    dragItemIndex = [i, j]
  };

  const onDragOver = (e, i, j) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDrop = (i, j) => {
    const newState = JSON.parse(JSON.stringify(state))
    const itemSwap = newState[i][j]

    newState[i][j] = dragItem
    newState[dragItemIndex[0]][dragItemIndex[1]] = itemSwap
    setstate(newState)
    dragItem = null
    dragItemIndex = []
  }

  return (
    <div className="App">
      <h3>List of items</h3>
      <table>
        <tbody>
          {state.map((itemList, i) => {
            return (<tr
              key={i}
            >
              {itemList.map((item, j) => (
                <td
                  id='test'
                  key={j}
                  className="drag"
                  draggable
                  onDragStart={() => onDragStart(i, j)}
                  onDragOver={(e) => onDragOver(e, i, j)}
                  onDrop={() => onDrop(i, j)}
                  style={{
                    border: '1px solid black',
                    width: '60px',
                    height: '60px'
                  }}
                >
                  <ItemComponent item={item} />
                </td>
              ))}
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
