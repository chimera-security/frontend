import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Shield, User, Database, Key, Server, Lock, AlertTriangle, AlertCircle } from 'lucide-react';

const scaleFactor = 1.5;

const ANIMATION_DURATIONS = {
  click: 7000,
  random: 4000,
  hover: 300,
  pulse: '2s',
  particle: '6s',
};

// Node sizes
const NODE_SIZES = {
  central: {
    width: 80,
    height: 80,
    iconSize: 48,
    glowSize: 120,
  },
  peripheral: {
    width: 40,
    height: 40, 
    iconSize: 22,
    glowSize: 60,
  }
};

// Color themes
const COLORS = {
  shield: '#7c3aed',      // Purple
  user: '#3b82f6',        // Blue
  database: '#f59e0b',    // Amber
  key: '#ec4899',         // Pink
  server: '#10b981',      // Emerald
  lock: '#dc2626',        // Red
  alert: '#f97316',       // Orange
  warning: '#eab308',     // Yellow
  glow: 'rgba(124, 58, 237, 0.1)', // Default glow color
  active: 'rgba(124, 58, 237, 0.8)', // Active state color
  connection: {
    default: 'rgba(255, 255, 255, 0.15)',
    active: 'url(#activeGradient)',
    highlight: 'url(#highlightGradient)',
  }
};

// Particle effect component for the central node - removed as requested
const ParticleEffect = ({ color, isActive }) => {
  return null;
};

// Ripple effect component - removed expanding circles
const RippleEffect = ({ color, isActive }) => {
  return null;
};

const CentralNode = ({ node, position, isActive, isHovered, onClick }) => {
  const scale = isHovered ? 1.25 : isActive ? 1.15 : 1;
  const { width, height, iconSize, glowSize } = NODE_SIZES.central;
  
  return (
    <div
      className="absolute z-30 transition-transform duration-300 cursor-pointer"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`
      }}
      onClick={() => onClick(node.id)}
    >
      {/* Glow effect */}
      <div
        className="absolute rounded-full blur-xl transition-opacity duration-300"
        style={{
          backgroundColor: node.color,
          opacity: isHovered ? 0.7 : isActive ? 0.6 : 0.4,
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          transform: 'translate(-25%, -25%) scale(1.25)'
        }}
      />
      
      <RippleEffect color={node.color} isActive={isActive} />
      <ParticleEffect color={node.color} isActive={isActive} />
      
      <div
        className="rounded-full flex items-center justify-center bg-black/80 border-2 transition-all duration-300"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderColor: node.color,
          boxShadow: isActive ? `0 0 30px ${node.color}` : isHovered ? `0 0 20px ${node.color}` : 'none'
        }}
      >
        <node.icon size={iconSize} color="white" strokeWidth={2} />
      </div>
      
      <div
        className="absolute whitespace-nowrap bg-black/80 text-white text-sm py-1 px-3 rounded-md transition-opacity duration-300"
        style={{
          bottom: '-36px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: isHovered || isActive ? 1 : 0.8,
          boxShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
          border: isActive ? `1px solid ${node.color}60` : 'none'
        }}
      >
        {node.label}
      </div>
    </div>
  );
};

const Node = ({ node, position, isActive, isHovered, onClick, connectionCount }) => {
  const scale = isHovered ? 1.2 : isActive ? 1.1 : 1;
  const NodeIcon = node.icon;
  const { width, height, iconSize, glowSize } = NODE_SIZES.peripheral;
  
  return (
    <div
      className="absolute z-20 transition-transform duration-300 cursor-pointer"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`
      }}
      onClick={() => onClick(node.id)}
    >
      <div
        className="absolute rounded-full blur-md transition-opacity duration-300"
        style={{
          backgroundColor: node.color,
          opacity: isHovered ? 0.7 : isActive ? 0.6 : 0.3,
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          transform: 'translate(-25%, -25%) scale(1.5)'
        }}
      />
      
      <div
        className="rounded-full flex items-center justify-center bg-black/80 border-2 transition-all duration-300"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderColor: node.color,
          boxShadow: isActive ? `0 0 15px ${node.color}` : isHovered ? `0 0 10px ${node.color}` : 'none'
        }}
      >
        <NodeIcon size={iconSize} color="white" strokeWidth={2} />
      </div>
      
      {connectionCount > 0 && (
        <div
          className="absolute -top-1 -right-1 rounded-full bg-white/90 text-black text-xs w-4 h-4 flex items-center justify-center"
          style={{
            border: `1px solid ${node.color}`,
            boxShadow: isActive ? `0 0 5px ${node.color}` : 'none'
          }}
        >
          {connectionCount}
        </div>
      )}
      
      {(isHovered || isActive) && (
        <div
          className="absolute whitespace-nowrap bg-black/80 text-white text-xs py-1 px-2 rounded-md transition-opacity duration-300"
          style={{
            bottom: '-24px',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: isHovered ? 1 : 0.9,
            boxShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
            border: isActive ? `1px solid ${node.color}60` : 'none'
          }}
        >
          {node.label}
        </div>
      )}
    </div>
  );
};

const Connection = ({ conn, getConnectionPoints, activeNode, selectedConnection }) => {
  const { sourcePos, targetPos } = getConnectionPoints(conn.source, conn.target);
  if (!sourcePos || !targetPos) return null;

  const isActive = activeNode === conn.source || activeNode === conn.target;
  const isSelected = selectedConnection && 
                      selectedConnection.source === conn.source && 
                      selectedConnection.target === conn.target;
  
  // Calculate angle for arrow marker
  const dx = targetPos.x - sourcePos.x;
  const dy = targetPos.y - sourcePos.y;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  
  // Animated particles along the connection path only when active/selected
  const particles = [];
  if (isActive || isSelected) {
    for (let i = 0; i < 3; i++) {
      particles.push(
        <circle key={`particle-${i}`} r="3" fill="white" opacity="0.8">
          <animateMotion
            dur={`${1 + i * 0.3}s`}
            repeatCount="indefinite"
            path={`M${sourcePos.x},${sourcePos.y} L${targetPos.x},${targetPos.y}`}
            begin={`${i * 0.3}s`}
          />
        </circle>
      );
    }
  }
  
  // Calculate midpoint with no offset
  const midX = (sourcePos.x + targetPos.x) / 2;
  const midY = (sourcePos.y + targetPos.y) / 2;
  const offset = 0;
  
  // Determine stroke style: active or selected connections use gradient; otherwise use default grey
  let strokeStyle;
  if (isSelected) {
    strokeStyle = "url(#highlightGradient)";
  } else if (isActive) {
    strokeStyle = "url(#activeGradient)";
  } else {
    strokeStyle = COLORS.connection.default;
  }
  
  // Set stroke width: thicker if active or selected; otherwise default thin line
  const strokeWidth = isActive || isSelected ? 2.5 : 1;
  
  // Only show labels when node is active or connection is selected
  const showLabel = isActive || isSelected;
  
  return (
    <g>
      <path
        d={`M${sourcePos.x},${sourcePos.y} Q${midX},${midY + offset} ${targetPos.x},${targetPos.y}`}
        stroke={strokeStyle}
        strokeWidth={strokeWidth}
        fill="none"
      />
      
      {particles}
      
      {showLabel && (
        <>
          <text
            x={midX}
            y={midY - 8}
            fill="white"
            fontSize="10"
            textAnchor="middle"
            dy="-5"
          >
            <tspan
              x={midX}
              dy="-5"
              fill="white"
              fontSize="10"
              textAnchor="middle"
              className="bg-black/80 px-1 py-0.5 rounded"
            >
              {conn.label}
            </tspan>
          </text>
          
          <polygon 
            points="0,-3 6,0 0,3" 
            fill="white"
            opacity="0.8"
            transform={`translate(${targetPos.x},${targetPos.y}) rotate(${angle})`}
          />
        </>
      )}
    </g>
  );
};

const InfoPanel = ({ node, connections, nodes, centralNode }) => {
  if (!node) return null;
  
  const relatedConnections = connections.filter(
    conn => conn.source === node.id || conn.target === node.id
  );
  
  const getNodeById = (id) => {
    if (id === centralNode.id) return centralNode;
    return nodes.find(n => n.id === id);
  };
  
  // Determine position based on node ID
  // Position the panel in different corners based on which quadrant the node is in
  let positionStyle = {};
  
  // Default position for the center node is top-right
  if (node.id === centralNode.id) {
    positionStyle = { top: '80px', right: '80px', left: 'auto', bottom: 'auto' };
  } 
  // Top-left nodes (user1, alert1, lock1)
  else if (node.id === 'user1' || node.id === 'alert1' || node.id === 'lock1') {
    positionStyle = { bottom: '80px', right: '80px', top: 'auto', left: 'auto' };
  }
  // Top-right nodes (warning1, key1)
  else if (node.id === 'warning1' || node.id === 'key1') {
    positionStyle = { bottom: '80px', left: '80px', top: 'auto', right: 'auto' };
  }
  // Bottom-left nodes (user2)
  else if (node.id === 'user2') {
    positionStyle = { top: '80px', right: '80px', bottom: 'auto', left: 'auto' };
  }
  // Bottom-right nodes (db1, server1)
  else if (node.id === 'db1' || node.id === 'server1') {
    positionStyle = { top: '80px', left: '80px', bottom: 'auto', right: 'auto' };
  }
  // Fallback position
  else {
    positionStyle = { bottom: '80px', left: '80px', top: 'auto', right: 'auto' };
  }
  
  return (
    <div 
      className="info-panel absolute bg-black/80 rounded-lg p-3 text-white z-40 border border-gray-700 w-64 backdrop-blur-sm"
      style={positionStyle}
    >
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-700">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${node.color}30`, border: `1px solid ${node.color}` }}
        >
          <node.icon size={16} color="white" />
        </div>
        <div>
          <div className="font-medium">{node.label}</div>
          <div className="text-xs text-gray-400">ID: {node.id}</div>
        </div>
      </div>
      
      {relatedConnections.length > 0 && (
        <div className="mb-2">
          <div className="text-xs text-gray-400 mb-1">Connections:</div>
          <ul className="text-xs space-y-1">
            {relatedConnections.map((conn, i) => {
              const otherNodeId = conn.source === node.id ? conn.target : conn.source;
              const otherNode = getNodeById(otherNodeId);
              const direction = conn.source === node.id ? "→" : "←";
              
              return (
                <li key={`conn-${i}`} className="flex items-center">
                  <span 
                    className="w-2 h-2 rounded-full mr-1"
                    style={{ backgroundColor: otherNode?.color || "#fff" }}
                  ></span>
                  <span className="text-gray-300">{otherNode?.label}</span>
                  <span className="mx-1 text-gray-500">{direction}</span>
                  <span>{conn.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      
      <div className="text-xs text-gray-400">
        Click background to dismiss
      </div>
    </div>
  );
};

const StatusPanel = ({ activeNode, isLoading }) => {
  return (
    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white/90 text-xs z-40 border border-gray-800/50 flex items-center gap-2">
      {isLoading ? (
        <>
          <div className="animate-pulse w-2 h-2 rounded-full bg-amber-500"></div>
          <span>Loading network...</span>
        </>
      ) : activeNode ? (
        <>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>Node active: {activeNode}</span>
        </>
      ) : (
        <>
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span>Network stable</span>
        </>
      )}
    </div>
  );
};

const IdentityGraphNetwork = () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [simulateRandomActivation, setSimulateRandomActivation] = useState(true);
  const [nodeConnectionCounts, setNodeConnectionCounts] = useState({});
  // Keep track of active animation IDs to clear them when needed
  const animationTimersRef = useRef([]);

  // Define central node
  const centralNode = { 
    id: 'shield', 
    icon: Shield, 
    label: 'Identity Shield', 
    color: COLORS.shield,
    description: 'Central security management for all identity types'
  };

  // Define other nodes
  const nodes = [
    { 
      id: 'user1', 
      icon: User, 
      label: 'User Identity', 
      color: COLORS.user, 
      x: -120, 
      y: -100,
      description: 'Standard user account credentials and permissions'
    },
    { 
      id: 'user2', 
      icon: User, 
      label: 'Admin Identity', 
      color: COLORS.user, 
      x: -140, 
      y: 60,
      description: 'Privileged administrative access credentials'
    },
    { 
      id: 'db1', 
      icon: Database, 
      label: 'Database Credentials', 
      color: COLORS.database, 
      x: 30, 
      y: 130,
      description: 'Access tokens for database systems'
    },
    { 
      id: 'key1', 
      icon: Key, 
      label: 'API Key', 
      color: COLORS.key, 
      x: 140, 
      y: -30,
      description: 'Authentication keys for API access'
    },
    { 
      id: 'server1', 
      icon: Server, 
      label: 'Service Account', 
      color: COLORS.server, 
      x: 120, 
      y: 70,
      description: 'Machine identity for services and automation'
    },
    { 
      id: 'lock1', 
      icon: Lock, 
      label: 'Security Policy', 
      color: COLORS.lock, 
      x: -40, 
      y: -130,
      description: 'Rules and restrictions that govern identities'
    },
    { 
      id: 'alert1', 
      icon: AlertTriangle, 
      label: 'Threat Detection', 
      color: COLORS.alert, 
      x: -90, 
      y: -180,
      description: 'Monitors for suspicious activity'
    },
    { 
      id: 'warning1', 
      icon: AlertCircle, 
      label: 'Compliance Monitor', 
      color: COLORS.warning, 
      // Changed position to move to top right
      x: 160, 
      y: -140,
      description: 'Ensures adherence to security standards'
    }
  ];

  // Define connections between nodes
  const connections = [
    { source: 'shield', target: 'user1', label: 'manages' },
    { source: 'shield', target: 'user2', label: 'manages' },
    { source: 'shield', target: 'db1', label: 'secures' },
    { source: 'shield', target: 'key1', label: 'monitors' },
    { source: 'shield', target: 'server1', label: 'secures' },
    { source: 'shield', target: 'lock1', label: 'enforces' },
    { source: 'shield', target: 'alert1', label: 'configures' },
    { source: 'shield', target: 'warning1', label: 'reports to' },
    { source: 'user1', target: 'key1', label: 'uses' },
    { source: 'user2', target: 'db1', label: 'administers' },
    { source: 'key1', target: 'server1', label: 'authenticates' },
    { source: 'lock1', target: 'user1', label: 'governs' },
    { source: 'server1', target: 'db1', label: 'connects to' },
    { source: 'alert1', target: 'user1', label: 'monitors' },
    { source: 'alert1', target: 'user2', label: 'monitors' },
    { source: 'warning1', target: 'lock1', label: 'validates' },
    { source: 'warning1', target: 'key1', label: 'audits' }
  ];

  // Clear all animation timers
  const clearAllAnimationTimers = () => {
    animationTimersRef.current.forEach(timerId => clearTimeout(timerId));
    animationTimersRef.current = [];
    // Also clear the global timer if it exists
    if (window.activeNodeTimer) {
      clearTimeout(window.activeNodeTimer);
      window.activeNodeTimer = null;
    }
  };

  // Calculate node connection counts
  useEffect(() => {
    const counts = {};
    nodes.forEach(node => {
      counts[node.id] = connections.filter(
        conn => conn.source === node.id || conn.target === node.id
      ).length;
    });
    counts[centralNode.id] = connections.filter(
      conn => conn.source === centralNode.id || conn.target === centralNode.id
    ).length;
    
    setNodeConnectionCounts(counts);
  }, []);

  // Simulate loading state
  useEffect(() => {
    if (dimensions.width > 0) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [dimensions]);

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

  // Randomly activate nodes periodically if simulation is enabled
  useEffect(() => {
    if (!initialized || !simulateRandomActivation || isLoading) return;
    
    const interval = setInterval(() => {
      const allNodeIds = [...nodes.map(n => n.id), centralNode.id];
      const randomIndex = Math.floor(Math.random() * allNodeIds.length);
      setActiveNode(allNodeIds[randomIndex]);
      setSelectedConnection(null);
      
      const timerId = setTimeout(() => {
        setActiveNode(null);
        setSelectedConnection(null);
      }, ANIMATION_DURATIONS.random);
      
      animationTimersRef.current.push(timerId);
    }, ANIMATION_DURATIONS.random + 1000);
    
    return () => {
      clearInterval(interval);
      clearAllAnimationTimers();
    };
  }, [initialized, simulateRandomActivation, isLoading, nodes]);

  // Cleanup effect for when component unmounts
  useEffect(() => {
    return () => {
      clearAllAnimationTimers();
    };
  }, []);

  // Calculate node position relative to container center
  const getNodePosition = useCallback(
    (node) => {
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      
      if (node.id === centralNode.id) {
        return { x: centerX, y: centerY };
      }
      
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
    if (!containerRef.current || !dimensions.width || isLoading) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const centralPos = getNodePosition(centralNode);
    const centerDist = Math.sqrt((mouseX - centralPos.x) ** 2 + (mouseY - centralPos.y) ** 2);
    
    if (centerDist < NODE_SIZES.central.width / 2) {
      setHoveredNode(centralNode.id);
      return;
    }
    
    let found = null;
    for (const node of nodes) {
      const pos = getNodePosition(node);
      const dist = Math.sqrt((mouseX - pos.x) ** 2 + (mouseY - pos.y) ** 2);
      
      if (dist < NODE_SIZES.peripheral.width / 2) {
        found = node.id;
        break;
      }
    }
    
    setHoveredNode(found);
  };

  // Handle node click
  const handleNodeClick = (nodeId) => {
    if (nodeId) {
      // Clear any existing animation timers
      clearAllAnimationTimers();
      
      if (activeNode === nodeId) {
        setActiveNode(null);
        setSelectedConnection(null);
        
        const timerId = setTimeout(() => {
          setSimulateRandomActivation(true);
        }, 3000);
        animationTimersRef.current.push(timerId);
        return;
      }
      
      setSimulateRandomActivation(false);
      setActiveNode(nodeId);
      setSelectedConnection(null);
      
      const nodeConnections = connections.filter(
        conn => conn.source === nodeId || conn.target === nodeId
      );
      
      if (nodeConnections.length === 1) {
        setSelectedConnection(nodeConnections[0]);
      }
      
      const timerId = setTimeout(() => {
        setActiveNode(null);
        setSelectedConnection(null);
        
        const restartTimerId = setTimeout(() => {
          setSimulateRandomActivation(true);
        }, 500);
        animationTimersRef.current.push(restartTimerId);
      }, ANIMATION_DURATIONS.click);
      
      animationTimersRef.current.push(timerId);
      window.activeNodeTimer = timerId;
    }
  };

  // Handle container background click – dismiss info panel if click occurs outside of it
  const handleContainerClick = (e) => {
    if (e.target.closest('.info-panel')) return;
    const isBackgroundClick = e.target === containerRef.current || e.target.classList.contains('bg-gradient-to-br');
    
    if (isBackgroundClick) {
      clearAllAnimationTimers();
      setActiveNode(null);
      setSelectedConnection(null);
      setHoveredNode(null);
      
      const timerId = setTimeout(() => {
        setSimulateRandomActivation(true);
      }, 3000);
      animationTimersRef.current.push(timerId);
    }
  };

  // Get active node data
  const getActiveNodeData = () => {
    if (!activeNode) return null;
    
    if (activeNode === centralNode.id) {
      return centralNode;
    }
    
    return nodes.find(n => n.id === activeNode);
  };

  // Render connection elements using SVG
  const renderConnections = () => {
    return connections.map((conn, index) => (
      <Connection
        key={`conn-${index}`}
        conn={conn}
        getConnectionPoints={getConnectionPoints}
        activeNode={activeNode}
        selectedConnection={selectedConnection}
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
        onClick={handleNodeClick}
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
          onClick={handleNodeClick}
          connectionCount={nodeConnectionCounts[node.id] || 0}
        />
      );
    });
    
    return [centralElement, ...otherNodes];
  };

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[600px] h-full relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black"
      onMouseMove={handleMouseMove}
      onClick={handleContainerClick}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.08),transparent_60%)]"></div>

      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20" 
            style={{ backgroundColor: COLORS.shield, transform: 'translate(-50%, -50%)' }}></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>

      {dimensions.width > 0 && (
        <svg
          width={dimensions.width}
          height={dimensions.height}
          className="absolute top-0 left-0 z-10"
        >
          <defs>
            <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={COLORS.shield} />
              <stop offset="100%" stopColor={COLORS.user} />
            </linearGradient>
            <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {renderConnections()}
        </svg>
      )}

      {dimensions.width > 0 && !isLoading && renderNodes()}

      {activeNode && !isLoading && (
        <InfoPanel 
          node={getActiveNodeData()} 
          connections={connections}
          nodes={nodes}
          centralNode={centralNode}
        />
      )}

      <StatusPanel activeNode={activeNode} isLoading={isLoading} />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin"></div>
            <div className="mt-4 text-white/70 text-sm">Loading Identity Network...</div>
          </div>
        </div>
      )}

      <div className="absolute bottom-3 right-3 z-40">
        <button 
          className="bg-black/80 text-xs text-white py-1 px-3 rounded-md border border-gray-700 hover:bg-black/90"
          onClick={() => setSimulateRandomActivation(!simulateRandomActivation)}
        >
          {simulateRandomActivation ? 'Stop' : 'Start'} Simulation
        </button>
      </div>
    </div>
  );
};

export default IdentityGraphNetwork;