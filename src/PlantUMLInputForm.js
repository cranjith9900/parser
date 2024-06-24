import React, { useState } from 'react';
import ReactFlow, { Background } from 'reactflow';
import { parse } from 'plantuml-parser';

const PlantUMLInputForm = () => {
  const [plantUMLCode, setPlantUMLCode] = useState('');
  const [reactFlowElements, setReactFlowElements] = useState([]);

  const handlePlantUMLChange = (event) => {
    setPlantUMLCode(event.target.value);
  };

  const generateReactFlowElements = () => {
    const parsedPlantUML = parse(plantUMLCode);
    const nodes = parsedPlantUML.elements
      .filter((element) => element.type === 'node')
      .map((node) => ({
        id: node.id,
        type: 'default',
        data: { label: node.label },
        position: { x: node.x, y: node.y },
      }));

    const edges = parsedPlantUML.elements
      .filter((element) => element.type === 'edge')
      .map((edge) => ({
        id: `${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
      }));

    setReactFlowElements([...nodes, ...edges]);
  };

  return (
    <div>
      <textarea
        value={plantUMLCode}
        onChange={handlePlantUMLChange}
        placeholder="Enter PlantUML code here"
      />
      <button onClick={console.log}>Generate ReactFlow</button>
      <ReactFlow elements={reactFlowElements}>
        <Background />
      </ReactFlow>
    </div>
  );
};

export default PlantUMLInputForm;