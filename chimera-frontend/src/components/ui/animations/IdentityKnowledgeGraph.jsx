import React, { useEffect, useRef, useState } from 'react';
import { Shield, User, Server, Database, Key, Lock, Laptop, Cloud, FileText, Globe } from 'lucide-react';

const IdentityKnowledgeGraph = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeNodes, setActiveNodes] = useState([]);
  const [activeConnections, setActiveConnections] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef(null);
  
  // Define node types and their visual properties
  const nodeTypes = {
    shield: { icon: Shield, size: 48, color: '#7c3aed', label: 'Identity Control Center' },
    user: { icon: User, size: 24, color: '#3b82f6', label: 'User Identity' },
    service: { icon: Server, size: 24, color: '#10b981', label: 'Service Account' },
    database: { icon: Database, size: 24, color: '#f59e0b', label: 'Database Credentials' },
    key: { icon: Key, size: 22, color: '#ec4899', label: 'API Key' },
    device: { icon: Laptop, size: 24, color: '#6366f1', label: 'Device Identity' },
    cloud: { icon: Cloud, size: 26, color: '#8b5cf6', label: 'Cloud Resource' },
    certificate: { icon: FileText, size: 22, color: '#14b8a6', label: 'Certificate' },
    domain: { icon: Globe, size: 24, color: '#f97316', label: 'Domain Identity' },
    lock: { icon: Lock, size: 22, color: '#dc2626', label: 'Security Policy' }
  };
  
  // Define the nodes in our graph (with initial positions)
  const [nodes, setNodes] = useState([
    { id: 'center', type: 'shield', x: 0, y: 0, fixed: true },
    { id: 'user1', type: 'user', x: -100, y: -100 },
    { id: 'user2', type: 'user', x: -140, y: 30 },
    { id: 'service1', type: 'service', x: 100, y: -90 },
    { id: 'service2', type: 'service', x: 140, y: 40 },
    { id: 'database1', type: 'database', x: 0, y: 140 },
    { id: 'key1', type: 'key', x: 60, y: -40 },
    { id: 'key2', type: 'key', x: -70, y: 80 },
    { id: 'device1', type: 'device', x: -160, y: -30 },
    { id: 'device2', type: 'device', x: 160, y: -30 },
    { id: 'cloud1', type: 'cloud', x: 50, y: 90 },
    { id: 'cloud2', type: 'cloud', x: -50, y: -140 },
    { id: 'cert1', type: 'certificate', x: 100, y: 120 },
    { id: 'domain1', type: 'domain', x: -120, y: -50 },
    { id: 'lock1', type: 'lock', x: -30, y: 40 }
  ]);
  
  // Define connections between nodes with meanings
  const connections = [
    { id: 'c1', source: 'center', target: 'user1', strength: 0.7, label: 'manages' },
    { id: 'c2', source: 'center', target: 'user2', strength: 0.7, label: 'manages' },
    { id: 'c3', source: 'center', target: 'service1', strength: 0.8, label: 'secures' },
    { id: 'c4', source: 'center', target: 'service2', strength: 0.8, label: 'secures' },
    { id: 'c5', source: 'center', target: 'database1', strength: 0.6, label: 'monitors' },
    { id: 'c6', source: 'center', target: 'lock1', strength: 0.9, label: 'enforces' },
    { id: 'c7', source: 'user1', target: 'key1', strength: 0.5, label: 'owns' },
    { id: 'c8', source: 'user2', target: 'key2', strength: 0.5, label: 'owns' },
    { id: 'c9', source: 'user1', target: 'device1', strength: 0.6, label: 'uses' },
    { id: 'c10', source: 'service1', target: 'cloud1', strength: 0.7, label: 'accesses' },
    { id: 'c11', source: 'service2', target: 'cloud2', strength: 0.7, label: 'accesses' },
    { id: 'c12', source: 'service1', target: 'device2', strength: 0.6, label: 'runs on' },
    { id: 'c13', source: 'key1', target: 'service1', strength: 0.5, label: 'authenticates' },
    { id: 'c14', source: 'key2', target: 'database1', strength: 0.5, label: 'accesses' },
    { id: 'c15', source: 'database1', target: 'cloud1', strength: 0.6, label: 'hosted on' },
    { id: 'c16', source: 'user2', target: 'service2', strength: 0.4, label: 'manages' },
    { id: 'c17', source: 'device1', target: 'cloud2', strength: 0.3, label: 'connects to' },
    { id: 'c18', source: 'cert1', target: 'service1', strength: 0.7, label: 'authenticates' },
    { id: 'c19', source: 'domain1', target: 'user1', strength: 0.6, label: 'contains' },
    { id: 'c20', source: 'domain1', target: 'user2', strength: 0.6, label: 'contains' },
    { id: 'c21', source: 'lock1', target: 'key1', strength: 0.8, label: 'governs' },
    { id: 'c22', source: 'lock1', target: 'key2', strength: 0.8, label: 'governs' },
    { id: 'c23', source: 'cert1', target: 'database1', strength: 0.5, label: 'secures' }
  ];
  
  // Create connection paths
  const paths = [
    {
      name: 'user-access',
      connections: ['c7', 'c13', 'c10'],
      description: 'User accessing cloud service'
    },
    {
      name: 'database-access',
      connections: ['c8', 'c14', 'c15'],
      description: 'User accessing database in cloud'
    },
    {
      name: 'security-policy',
      connections: ['c6', 'c21', 'c7'],
      description: 'Policy enforcement on user keys'
    },
    {
      name: 'domain-resources',
      connections: ['c19', 'c9', 'c17'],
      description: 'Domain user accessing cloud resources'
    }
  ];
  
  // Initialize the simulation
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Get container dimensions
    const { width, height } = containerRef.current.getBoundingClientRect();
    setDimensions({ width, height });
    
    // Center the nodes within the container
    setNodes(prevNodes => prevNodes.map(node => ({
      ...node,
      x: width / 2 + node.x,
      y: height / 2 + node.y,
      vx: 0,
      vy: 0
    })));
    
    // Set up periodic path activation
    const activateInterval = setInterval(() => {
      // Pick a random path to activate
      const randomPath = paths[Math.floor(Math.random() * paths.length)];
      const pathConnections = randomPath.connections;
      
      // Find the nodes involved in the path
      const involvedNodes = new Set();
      pathConnections.forEach(connId => {
        const conn = connections.find(c => c.id === connId);
        if (conn) {
          involvedNodes.add(conn.source);
          involvedNodes.add(conn.target);
        }
      });
      
      // Activate the connections and nodes
      setActiveConnections(pathConnections);
      setActiveNodes(Array.from(involvedNodes));
      
      // Clear after a delay
      setTimeout(() => {
        setActiveConnections([]);
        setActiveNodes([]);
      }, 2000);
    }, 5000);
    
    return () => {
      clearInterval(activateInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Set up force simulation for node positioning
  useEffect(() => {
    if (dimensions.width === 0 || nodes.length === 0) return;
    
    // Create a node map for easy access
    const nodeMap = {};
    nodes.forEach(node => {
      nodeMap[node.id] = node;
    });
    
    // Animation function for force simulation
    const animate = () => {
      // Clone nodes to update positions
      const updatedNodes = [...nodes];
      
      // Apply forces to each node
      updatedNodes.forEach((node, i) => {
        if (node.fixed) return;
        
        // Initialize velocity if not present
        node.vx = node.vx || 0;
        node.vy = node.vy || 0;
        
        // Add slight random movement for liveliness
        node.vx += (Math.random() - 0.5) * 0.2;
        node.vy += (Math.random() - 0.5) * 0.2;
        
        // Connection forces (attraction)
        connections.forEach(conn => {
          if (conn.source === node.id || conn.target === node.id) {
            const otherNodeId = conn.source === node.id ? conn.target : conn.source;
            const otherNode = nodeMap[otherNodeId];
            
            // Skip if other node doesn't exist
            if (!otherNode) return;
            
            // Calculate direction and distance
            const dx = otherNode.x - node.x;
            const dy = otherNode.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Skip if nodes are at the same position
            if (distance === 0) return;
            
            // Ideal distance between nodes based on their types
            const idealDistance = 
              (nodeTypes[node.type].size + nodeTypes[otherNode.type].size) * 4;
            
            // Force strength (attraction or repulsion)
            const force = (distance - idealDistance) * 0.01 * conn.strength;
            
            // Apply force
            node.vx += dx / distance * force;
            node.vy += dy / distance * force;
          }
        });
        
        // Repulsion between unconnected nodes
        updatedNodes.forEach((otherNode, j) => {
          if (i === j || otherNode.fixed) return;
          
          // Skip if nodes have a direct connection
          const hasConnection = connections.some(
            conn => (conn.source === node.id && conn.target === otherNode.id) || 
                  (conn.source === otherNode.id && conn.target === node.id)
          );
          
          if (hasConnection) return;
          
          // Calculate repulsion
          const dx = otherNode.x - node.x;
          const dy = otherNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Skip if nodes are far apart or at the same position
          if (distance === 0 || distance > 200) return;
          
          // Repulsion force (stronger at close distances)
          const force = -200 / (distance * distance);
          
          // Apply force
          node.vx += dx / distance * force;
          node.vy += dy / distance * force;
        });
        
        // Attraction to center to prevent drift
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;
        const dx = centerX - node.x;
        const dy = centerY - node.y;
        const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
        
        if (distanceFromCenter > 180) {
          const centerForce = 0.01;
          node.vx += dx * centerForce;
          node.vy += dy * centerForce;
        }
        
        // Apply damping
        node.vx *= 0.9;
        node.vy *= 0.9;
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Keep nodes within bounds
        const padding = nodeTypes[node.type].size;
        node.x = Math.max(padding, Math.min(dimensions.width - padding, node.x));
        node.y = Math.max(padding, Math.min(dimensions.height - padding, node.y));
      });
      
      // Update state with new positions
      setNodes(updatedNodes);
      
      // Continue the simulation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start the animation
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, nodes]);
  
  // Draw the network connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || nodes.length === 0) return;
    
    // Create a node map for easy access
    const nodeMap = {};
    nodes.forEach(node => {
      nodeMap[node.id] = node;
    });
    
    // Set canvas size to match container
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections
    connections.forEach(conn => {
      const sourceNode = nodeMap[conn.source];
      const targetNode = nodeMap[conn.target];
      
      // Skip if nodes don't exist
      if (!sourceNode || !targetNode) return;
      
      // Check if this connection is active
      const isActive = activeConnections.includes(conn.id);
      
      // Draw line
      ctx.beginPath();
      ctx.moveTo(sourceNode.x, sourceNode.y);
      ctx.lineTo(targetNode.x, targetNode.y);
      
      // Set line style based on activity
      if (isActive) {
        // Active connection style
        ctx.lineWidth = 2;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(
          sourceNode.x, sourceNode.y, targetNode.x, targetNode.y
        );
        gradient.addColorStop(0, nodeTypes[sourceNode.type].color);
        gradient.addColorStop(1, nodeTypes[targetNode.type].color);
        
        ctx.strokeStyle = gradient;
      } else {
        // Inactive connection style
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      }
      
      ctx.stroke();
      
      // Draw animated pulses for active connections
      if (isActive) {
        // Animation timing
        const now = Date.now();
        const phase = (now % 2000) / 2000;
        
        // Draw data pulses moving along the connection
        const dx = targetNode.x - sourceNode.x;
        const dy = targetNode.y - sourceNode.y;
        
        // Multiple pulses along the connection
        [0.2, 0.5, 0.8].forEach(offset => {
          const t = (phase + offset) % 1;
          const pulseX = sourceNode.x + dx * t;
          const pulseY = sourceNode.y + dy * t;
          
          // Draw glow effect
          const gradient = ctx.createRadialGradient(
            pulseX, pulseY, 0,
            pulseX, pulseY, 8
          );
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 8, 0, Math.PI * 2);
          ctx.fill();
        });
        
        // Draw connection label
        const midX = sourceNode.x + dx * 0.5;
        const midY = sourceNode.y + dy * 0.5;
        
        ctx.font = '10px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Background for text
        const textWidth = ctx.measureText(conn.label).width;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(midX - textWidth/2 - 3, midY - 7, textWidth + 6, 14);
        
        // Text
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText(conn.label, midX, midY);
      }
    });
    
    // Draw animation frame will be handled by React's render cycle
  }, [dimensions, nodes, activeConnections, activeNodes]);
  
  // Handle mouse interactions
  const handleMouseMove = (e) => {
    if (!containerRef.current || nodes.length === 0) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Check each node
    let hoveredNodeFound = null;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const nodeType = nodeTypes[node.type];
      const hitRadius = nodeType.size / 2 + 10;
      
      // Check if mouse is within node bounds
      const dist = Math.sqrt(
        Math.pow(mouseX - node.x, 2) + 
        Math.pow(mouseY - node.y, 2)
      );
      
      if (dist <= hitRadius) {
        hoveredNodeFound = node;
        break;
      }
    }
    
    setHoveredNode(hoveredNodeFound);
  };
  
  // Handle mouse click on nodes
  const handleClick = (e) => {
    if (hoveredNode) {
      // Find all connections for this node
      const nodeConnections = connections.filter(
        conn => conn.source === hoveredNode.id || conn.target === hoveredNode.id
      );
      
      // Highlight connections and connected nodes
      const connIds = nodeConnections.map(conn => conn.id);
      
      // Find all nodes connected to this node
      const connectedNodes = new Set([hoveredNode.id]);
      nodeConnections.forEach(conn => {
        if (conn.source === hoveredNode.id) {
          connectedNodes.add(conn.target);
        } else {
          connectedNodes.add(conn.source);
        }
      });
      
      setActiveConnections(connIds);
      setActiveNodes(Array.from(connectedNodes));
      
      // Clear after a delay
      setTimeout(() => {
        setActiveConnections([]);
        setActiveNodes([]);
      }, 3000);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden rounded-xl"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_40%)]"></div>
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIwLjIiPjxwYXRoIGQ9Ik0zMCAwdjYwTTAgMzBoNjAiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      
      {/* Network canvas for connections */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10"
      />
      
      {/* Node elements */}
      {nodes.map(node => {
        const type = nodeTypes[node.type];
        const NodeIcon = type.icon;
        const size = type.size;
        const isHovered = hoveredNode && hoveredNode.id === node.id;
        const isActive = activeNodes.includes(node.id);
        
        return (
          <div 
            key={node.id}
            className={`absolute z-20 flex flex-col items-center transition-all duration-300`}
            style={{ 
              left: `${node.x}px`,
              top: `${node.y}px`,
              transform: `translate(-50%, -50%) scale(${isHovered ? 1.2 : isActive ? 1.1 : 1})`,
            }}
          >
            {/* Node icon with glow */}
            <div className="relative">
              {/* Glow effect */}
              <div 
                className={`absolute inset-0 rounded-full blur-md transition-opacity duration-300`}
                style={{ 
                  backgroundColor: type.color,
                  opacity: isHovered ? 0.6 : isActive ? 0.5 : 0.2,
                  transform: `scale(1.5)` 
                }}
              ></div>
              
              {/* Additional pulse for active nodes */}
              {isActive && (
                <div 
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ 
                    border: `2px solid ${type.color}`,
                    animationDuration: '1.5s'
                  }}
                ></div>
              )}
              
              {/* Background circle with icon */}
              <div 
                className={`rounded-full flex items-center justify-center relative z-10 transition-all duration-300`}
                style={{ 
                  width: `${size}px`, 
                  height: `${size}px`,
                  backgroundColor: isActive ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                  border: `2px solid ${type.color}`,
                  boxShadow: isActive ? `0 0 10px ${type.color}` : 'none'
                }}
              >
                <NodeIcon 
                  size={size * 0.6} 
                  color={isActive ? 'white' : 'rgba(255, 255, 255, 0.9)'}
                  strokeWidth={isActive ? 2.5 : 2} 
                />
              </div>
            </div>
            
            {/* Node label */}
            {(isHovered || isActive || node.type === 'shield') && (
              <div 
                className={`absolute whitespace-nowrap bg-black/80 text-white text-xs py-1 px-2 rounded-md transition-all duration-300 ${
                  node.type === 'shield' ? '-bottom-10 text-sm font-medium' : '-bottom-8'
                }`}
                style={{
                  opacity: isHovered ? 1 : isActive ? 0.9 : node.type === 'shield' ? 0.8 : 0,
                  transform: `translateY(${isHovered ? 0 : isActive ? 0 : 5}px)`
                }}
              >
                {type.label}
              </div>
            )}
          </div>
        );
      })}
      
      {/* Legend for connection paths */}
      <div className="absolute bottom-4 right-4 bg-black/70 rounded-lg p-3 text-xs text-white z-30">
        <div className="mb-1 font-medium">Identity Relationships</div>
        <div className="flex flex-col gap-1">
          {paths.map((path, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: `hsl(${index * 60}, 70%, 60%)` }}
              ></div>
              <span>{path.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdentityKnowledgeGraph;