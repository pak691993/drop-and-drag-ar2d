import './App.css';
import react, { useState, useRef } from 'react'
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
  let dragItem = useRef(null)

  const onDragStart = (e, i, j) => {
    dragItem = state[i][j];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.mozCursor = 'default';
    e.dataTransfer.dropEffect = 'copy'
    console.log('start', i, j);
  };

  const onDragOver = (e, i, j) => {
    const draggedOverItem = state[i][j];
    e.stopPropagation();
    e.preventDefault();
    // console.log(draggedOverItem, 'draggedOverItem');
  };

  const onDragEnd = (i, j) => {
    const draggedEnd = state[i][j];

    // console.log(draggedEnd, i, j);
    dragItem = null
  };

  const onDrop = (i, j) => {
    console.log('drop', i, j);
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
                  onDragStart={e => onDragStart(e, i, j)}
                  onDragOver={(e) => onDragOver(e, i, j)}
                  onDragEnd={() => onDragEnd(i, j)}
                  onDrop={(e) => onDrop(i, j)}
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
