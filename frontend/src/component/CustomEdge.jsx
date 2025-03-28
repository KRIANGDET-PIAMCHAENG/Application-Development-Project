import {
    BaseEdge,
    EdgeLabelRenderer,
    getSmoothStepPath,
    getStraightPath,
    useReactFlow,
  } from '@xyflow/react';
  import { IoMdClose } from "react-icons/io";
  
  export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
  
    return (
      <>
        <BaseEdge id={id} path={edgePath} />
        <EdgeLabelRenderer>
          <button
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
            onClick={() => {
              setEdges((es) => es.filter((e) => e.id !== id));
            }}
          >
            <IoMdClose className='text-red-600 dark:text-red-400'/>
          </button>
        </EdgeLabelRenderer>
      </>
    );
  }
  