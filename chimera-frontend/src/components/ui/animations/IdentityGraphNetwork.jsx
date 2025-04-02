import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Shield, User, Database, Key, Server, Lock } from 'lucide-react';

const scaleFactor = 1.5; // Adjust this for more or less spacing

const CentralNode = ({ node, position, isActive, isHovered }) => {
  const scale = isHovered ? 1.25 : isActive ? 1.15 : 1;
  return (
    <div
      className="absolute z-30 transition-transform duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full blur-xl transition-opacity duration-300"
        style={{
          backgroundColor: node.color,
          opacity: isHovered ? 0.6 : isActive ? 0.5 : 0.3,
          width: '110px',
          height: '110px',
          transform: 'translate(-25%, -25%) scale(1.25)'
        }}
      />
      {/* Icon */}
      <div
        className="rounded-full flex items-center justify-center bg-black/80 border-2 transition-all duration-300"
        style={{
          width: '72px',
          height: '72px',
          borderColor: node.color,
          boxShadow: isActive ? `0 0 20px ${node.color}` : 'none'
        }}
      >
        <Shield size={44} color="white" strokeWidth={2} />
      </div>
      {/* Label */}
      <div
        className="absolute whitespace-nowrap bg-black/80 text-white text-sm py-1 px-2 rounded-md transition-opacity duration-300"
        style={{
          bottom: '-32px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: isHovered || isActive ? 1 : 0.8
        }}
      >
        {node.label}
      </div>
    </div>
  );
};

const Node = ({ node, position, isActive, isHovered }) => {
  const scale = isHovered ? 1.2 : isActive ? 1.1 : 1;
  const NodeIcon = node.icon;
  return (
    <div
      className="absolute z-20 transition-transform duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full blur-md transition-opacity duration-300"
        style={{
          backgroundColor: node.color,
          opacity: isHovered ? 0.6 : isActive ? 0.5 : 0.2,
          width: '50px',
          height: '50px',
          transform: 'translate(-25%, -25%) scale(1.5)'
        }}
      />
      {/* Pulse animation for active nodes */}
      {isActive && (
        <div
          className="absolute w-8 h-8 rounded-full animate-ping"
          style={{
            border: `2px solid ${node.color}`,
            animationDuration: '1.5s',
            transform: 'translate(-25%, -25%)'
          }}
        />
      )}
      {/* Icon */}
      <div
        className="rounded-full flex items-center justify-center bg-black/80 border-2 transition-all duration-300"
        style={{
          width: '32px',
          height: '32px',
          borderColor: node.color,
          boxShadow: isActive ? `0 0 10px ${node.color}` : 'none'
        }}
      >
        <NodeIcon size={18} color="white" strokeWidth={2} />
      </div>
      {/* Label */}
      {(isHovered || isActive) && (
        <div
          className="absolute whitespace-nowrap bg-black/80 text-white text-xs py-1 px-2 rounded-md transition-opacity duration-300"
          style={{
            bottom: '-22px',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: isHovered ? 1 : 0.9
          }}
        >
          {node.label}
        </div>
      )}
    </div>
  );
};

const Connection = ({ conn, getConnectionPoints, activeNode }) => {
  const { sourcePos, targetPos } = getConnectionPoints(conn.source, conn.target);
  if (!sourcePos || !targetPos) return null;

  const isActive = activeNode === conn.source || activeNode === conn.target;
  return (
    <g>
      <line
        x1={sourcePos.x}
        y1={sourcePos.y}
        x2={targetPos.x}
        y2={targetPos.y}
        stroke={isActive ? "url(#activeGradient)" : "rgba(255, 255, 255, 0.2)"}
        strokeWidth={isActive ? 2 : 1}
        strokeDasharray={isActive ? "none" : "4,4"}
      />
      {isActive && (
        <>
          <circle r="4" fill="white" opacity="0.8">
            <animateMotion
              dur="1s"
              repeatCount="indefinite"
              path={`M${sourcePos.x},${sourcePos.y} L${targetPos.x},${targetPos.y}`}
            />
          </circle>
          <text
            x={(sourcePos.x + targetPos.x) / 2}
            y={(sourcePos.y + targetPos.y) / 2 - 5}
            fill="white"
            fontSize="10"
            textAnchor="middle"
            dy="-5"
          >
            <tspan
              x={(sourcePos.x + targetPos.x) / 2}
              dy="-5"
              fill="white"
              fontSize="10"
              textAnchor="middle"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: '2px 4px',
                borderRadius: '2px'
              }}
            >
              {conn.label}
            </tspan>
          </text>
        </>
      )}
    </g>
  );
};

const IdentityGraphNetwork = () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Define central node
  const centralNode = { id: 'shield', icon: Shield, label: 'Identity Shield', color: '#7c3aed' };

  // Define other nodes
  const nodes = [
    { id: 'user1', icon: User, label: 'User Identity', color: '#3b82f6', x: -120, y: -100 },
    { id: 'user2', icon: User, label: 'Admin Identity', color: '#3b82f6', x: -140, y: 60 },
    { id: 'db1', icon: Database, label: 'Database Credentials', color: '#f59e0b', x: 30, y: 130 },
    { id: 'key1', icon: Key, label: 'API Key', color: '#ec4899', x: 140, y: -30 },
    { id: 'server1', icon: Server, label: 'Service Account', color: '#10b981', x: 120, y: 70 },
    { id: 'lock1', icon: Lock, label: 'Security Policy', color: '#dc2626', x: -40, y: -130 }
  ];

  // Define connections between nodes
  const connections = [
    { source: 'shield', target: 'user1', label: 'manages' },
    { source: 'shield', target: 'user2', label: 'manages' },
    { source: 'shield', target: 'db1', label: 'secures' },
    { source: 'shield', target: 'key1', label: 'monitors' },
    { source: 'shield', target: 'server1', label: 'secures' },
    { source: 'shield', target: 'lock1', label: 'enforces' },
    { source: 'user1', target: 'key1', label: 'uses' },
    { source: 'user2', target: 'db1', label: 'administers' },
    { source: 'key1', target: 'server1', label: 'authenticates' },
    { source: 'lock1', target: 'user1', label: 'governs' },
    { source: 'server1', target: 'db1', label: 'connects to' }
  ];

  // Update container dimensions on mount and on resize
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      setInitialized(true);
    }
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Randomly activate nodes periodically (active state lasts 3000ms)
  useEffect(() => {
    if (!initialized) return;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * nodes.length);
      setActiveNode(nodes[randomIndex].id);
      setTimeout(() => setActiveNode(null), 3000);
    }, 4000);
    return () => clearInterval(interval);
  }, [initialized, nodes]);

  // Calculate node position relative to container center
  const getNodePosition = useCallback(
    (node) => {
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      if (node.id === centralNode.id) {
        return { x: centerX, y: centerY };
      }
      // Scale node offsets outward for a larger layout
      return {
        x: centerX + node.x * scaleFactor,
        y: centerY + node.y * scaleFactor
      };
    },
    [dimensions, centralNode.id]
  );

  // Map connection between node IDs to positions
  const getConnectionPoints = useCallback(
    (sourceId, targetId) => {
      const getPos = (id) => {
        if (id === centralNode.id) {
          return getNodePosition(centralNode);
        }
        const foundNode = nodes.find((n) => n.id === id);
        return foundNode
          ? getNodePosition(foundNode)
          : { x: dimensions.width / 2, y: dimensions.height / 2 };
      };
      return {
        sourcePos: getPos(sourceId),
        targetPos: getPos(targetId)
      };
    },
    [dimensions, getNodePosition, nodes, centralNode.id]
  );

  // Handle mouse move to detect hovered node
  const handleMouseMove = (e) => {
    if (!containerRef.current || !dimensions.width) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centralPos = getNodePosition(centralNode);
    const centerDist = Math.sqrt((mouseX - centralPos.x) ** 2 + (mouseY - centralPos.y) ** 2);
    if (centerDist < 40) {
      setHoveredNode(centralNode.id);
      return;
    }
    let found = null;
    for (const node of nodes) {
      const pos = getNodePosition(node);
      const dist = Math.sqrt((mouseX - pos.x) ** 2 + (mouseY - pos.y) ** 2);
      if (dist < 25) {
        found = node.id;
        break;
      }
    }
    setHoveredNode(found);
  };

  // Handle click event to activate hovered node (active state lasts 3000ms)
  const handleClick = () => {
    if (hoveredNode) {
      setActiveNode(hoveredNode);
      setTimeout(() => setActiveNode(null), 3000);
    }
  };

  // Render connection elements using SVG
  const renderConnections = () => {
    return connections.map((conn, index) => (
      <Connection
        key={`conn-${index}`}
        conn={conn}
        getConnectionPoints={getConnectionPoints}
        activeNode={activeNode}
      />
    ));
  };

  // Render nodes including central and other nodes
  const renderNodes = () => {
    const centralPosition = getNodePosition(centralNode);
    const centralElement = (
      <CentralNode
        key={centralNode.id}
        node={centralNode}
        position={centralPosition}
        isActive={activeNode === centralNode.id}
        isHovered={hoveredNode === centralNode.id}
      />
    );
    const otherNodes = nodes.map((node) => {
      const pos = getNodePosition(node);
      return (
        <Node
          key={node.id}
          node={node}
          position={pos}
          isActive={activeNode === node.id}
          isHovered={hoveredNode === node.id}
        />
      );
    });
    return [centralElement, ...otherNodes];
  };

  return (
    <div
      ref={containerRef}
      // Make it fill the parent space with a minimum height
      className="w-full min-h-[600px] h-full relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_50%)]"></div>

      {/* Ambient glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>

      {/* SVG for connections */}
      {dimensions.width > 0 && (
        <svg
          width={dimensions.width}
          height={dimensions.height}
          className="absolute top-0 left-0 z-10"
        >
          <defs>
            <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          {renderConnections()}
        </svg>
      )}

      {/* Render nodes */}
      {dimensions.width > 0 && renderNodes()}

      {/* Legend */}
      <div className="absolute bottom-3 right-3 bg-black/70 rounded-lg p-2 text-xs text-white z-40">
        <div className="mb-1 font-medium">Identity Network</div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-purple-600"></div>
          <span>Click nodes to explore connections</span>
        </div>
      </div>
    </div>
  );
};

export default IdentityGraphNetwork;
