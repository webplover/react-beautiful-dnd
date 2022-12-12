import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const data = [
    { id: 1, content: "Box 1" },
    { id: 2, content: "Box 2" },
    { id: 3, content: "Box 3" },
    { id: 4, content: "Box 4" },
  ];

  const [listData, setListData] = useState(data);

  function handleDragEnd(result) {
    console.log(result);
    const items = listData;
    const [removedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removedItem);
    setListData(items);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="boxes">
        {(provided) => (
          <div
            className="container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}
              >
                {(provided) => (
                  <p
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {item.content}
                  </p>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;