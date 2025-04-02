import React, { useEffect, useState, useRef } from 'react';
import { Shield, Key, Lock } from 'lucide-react';

const SecurityGridAnimation = () => {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [activeCell, setActiveCell] = useState(null);
  const [activePaths, setActivePaths] = useState([]);
  const canvasRef = useRef(null);
  
  // Generate neural network nodes (a subset of the grid cells)
  const neuralNodes = [10, 13, 17, 21, 26, 30, 33, 37, 42, 46, 50, 53];
  
  // Define neural network connections
  const connections = [
    { from: 10, to: 13 },
    { from: 10, to: 17 },
    { from: 13, to: 21 },
    { from: 17, to: 21 },
    { from: 17, to: 26 },
    { from: 21, to: 30 },
    { from: 21, to: 26 },
    { from: 26, to: 33 },
    { from: 30, to: 33 },
    { from: 30, to: 37 },
    { from: 33, to: 42 },
    { from: 37, to: 42 },
    { from: 42, to: 46 },
    { from: 42, to: 50 },
    { from: 46, to: 53 },
    { from: 50, to: 53 },
  ];
  
  // Simulate neural network data flow
  useEffect(() => {
    const interval = setInterval(() => {
      // Choose a random starting point from the neural nodes
      const startNode = neuralNodes[Math.floor(Math.random() * neuralNodes.length)];
      
      // Find connections from this node
      const possiblePaths = connections.filter(conn => conn.from === startNode);
      
      if (possiblePaths.length > 0) {
        // Select a random path
        const path = possiblePaths[Math.floor(Math.random() * possiblePaths.length)];
        
        // Activate the starting node
        setActiveCell(path.from);
        
        // After a delay, activate the connection and target node
        setTimeout(() => {
          setActivePaths([path]);
          
          // After another delay, activate the target node and clear the connection
          setTimeout(() => {
            setActiveCell(path.to);
            setActivePaths([]);
            
            // Finally clear the target node
            setTimeout(() => {
              setActiveCell(null);
            }, 400);
          }, 300);
        }, 400);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Draw neural network connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size to match its display size
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Helper function to get cell center position
    const getCellPosition = (index) => {
      const col = index % 8;
      const row = Math.floor(index / 8);
      
      // Calculate grid cell size
      const cellWidth = (canvas.width - 32) / 8; // 32 for padding (16px on each side)
      const cellHeight = (canvas.height - 32) / 8;
      
      return {
        x: 16 + col * cellWidth + cellWidth / 2,
        y: 16 + row * cellHeight + cellHeight / 2
      };
    };
    
    // Draw all connections
    connections.forEach(connection => {
      const fromPos = getCellPosition(connection.from);
      const toPos = getCellPosition(connection.to);
      
      // Check if this connection is active
      const isActive = activePaths.some(
        path => path.from === connection.from && path.to === connection.to
      );
      
      // Set line style
      ctx.beginPath();
      ctx.moveTo(fromPos.x, fromPos.y);
      ctx.lineTo(toPos.x, toPos.y);
      ctx.lineWidth = isActive ? 2 : 0.5;
      
      // Create gradient for line
      const gradient = ctx.createLinearGradient(fromPos.x, fromPos.y, toPos.x, toPos.y);
      
      if (isActive) {
        gradient.addColorStop(0, 'rgba(147, 51, 234, 0.9)'); // Purple
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.9)'); // Blue
      } else {
        gradient.addColorStop(0, 'rgba(147, 51, 234, 0.15)'); // Purple
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.15)'); // Blue
      }
      
      ctx.strokeStyle = gradient;
      ctx.stroke();
      
      // Draw animated pulse if connection is active
      if (isActive) {
        // Draw animated pulse along the path
        const dx = toPos.x - fromPos.x;
        const dy = toPos.y - fromPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const numPulses = Math.max(2, Math.floor(distance / 30));
        
        for (let i = 0; i < numPulses; i++) {
          const t = (performance.now() / 300 + i / numPulses) % 1;
          const pulseX = fromPos.x + dx * t;
          const pulseY = fromPos.y + dy * t;
          
          const gradient = ctx.createRadialGradient(
            pulseX, pulseY, 0,
            pulseX, pulseY, 5
          );
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
    
    // Animation frame for continuous updates of active connections
    const animationFrame = requestAnimationFrame(() => {
      if (activePaths.length > 0) {
        // Redraw only if there are active paths
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          
          // Only redraw the active paths
          activePaths.forEach(connection => {
            const fromPos = getCellPosition(connection.from);
            const toPos = getCellPosition(connection.to);
            
            // Clear the specific area where the path is
            ctx.clearRect(
              Math.min(fromPos.x, toPos.x) - 10,
              Math.min(fromPos.y, toPos.y) - 10,
              Math.abs(toPos.x - fromPos.x) + 20,
              Math.abs(toPos.y - fromPos.y) + 20
            );
            
            // Redraw the path
            ctx.beginPath();
            ctx.moveTo(fromPos.x, fromPos.y);
            ctx.lineTo(toPos.x, toPos.y);
            ctx.lineWidth = 2;
            
            const gradient = ctx.createLinearGradient(fromPos.x, fromPos.y, toPos.x, toPos.y);
            gradient.addColorStop(0, 'rgba(147, 51, 234, 0.9)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0.9)');
            ctx.strokeStyle = gradient;
            ctx.stroke();
            
            // Draw animated pulse along the path
            const dx = toPos.x - fromPos.x;
            const dy = toPos.y - fromPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const numPulses = Math.max(2, Math.floor(distance / 30));
            
            for (let i = 0; i < numPulses; i++) {
              const t = (performance.now() / 300 + i / numPulses) % 1;
              const pulseX = fromPos.x + dx * t;
              const pulseY = fromPos.y + dy * t;
              
              const gradient = ctx.createRadialGradient(
                pulseX, pulseY, 0,
                pulseX, pulseY, 5
              );
              gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
              
              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 5, 0, Math.PI * 2);
              ctx.fill();
            }
          });
        }
      }
    });
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [activePaths]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Enhanced background glow */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg"></div>
        <div className="absolute -inset-1/4 w-3/4 h-3/4 bg-blue-500/10 blur-3xl rounded-full animate-pulse-slow"></div>
        <div className="absolute -inset-1/4 top-1/4 left-1/4 w-3/4 h-3/4 bg-purple-500/10 blur-3xl rounded-full animate-pulse-slow" 
             style={{animationDelay: '1s', animationDuration: '7s'}}></div>
      </div>

      {/* Neural network connections canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10 w-full h-full"
      />

      {/* Grid */}
      <div className="w-full h-full grid grid-cols-8 grid-rows-8 gap-1 p-4 relative z-20">
        {Array(64).fill().map((_, i) => {
          // Calculate position from center (0-7 in both directions)
          const col = i % 8;
          const row = Math.floor(i / 8);
          const distFromCenter = Math.sqrt(Math.pow(col - 3.5, 2) + Math.pow(row - 3.5, 2)) / 5;
          
          // Determine base opacity based on distance from center
          const baseOpacity = Math.max(0.1, 1 - distFromCenter);
          
          // Check if this cell is a neural node
          const isNeuralNode = neuralNodes.includes(i);
          
          // Apply different effects to each cell
          return (
            <div 
              key={i} 
              className="relative cursor-pointer transform transition-all duration-300"
              style={{
                transform: hoveredCell === i ? 'scale(1.1)' : 'scale(1)',
              }}
              onMouseEnter={() => setHoveredCell(i)}
              onMouseLeave={() => setHoveredCell(null)}
            >
              <div 
                className={`absolute inset-0 rounded-md transition-opacity duration-300 ${activeCell === i ? 'animate-ping' : ''}`}
                style={{
                  background: isNeuralNode 
                    ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.8), rgba(59, 130, 246, 0.8))'
                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(124, 58, 237, 0.6))',
                  opacity: hoveredCell === i ? 0.9 : 
                         activeCell === i ? 0.8 :
                         isNeuralNode ? baseOpacity * 0.9 :
                         Math.random() > 0.7 ? baseOpacity * 0.8 : baseOpacity * 0.3,
                  animation: `pulse ${4 + Math.random() * 3}s ease-in-out ${i % 13 * 0.1}s infinite`
                }}
              ></div>
              
              {/* Animated border */}
              <div className={`absolute inset-0 rounded-md transition-all duration-300 ${
                hoveredCell === i 
                  ? 'border-2 border-white/40' 
                  : isNeuralNode 
                    ? 'border-2 border-purple-500/40'
                    : 'border border-dark-lighter/60'
              }`}></div>
              
              {/* Neural node indicator */}
              {isNeuralNode && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                </div>
              )}
              
              {/* Identity-themed icons on select neural nodes */}
              {(i === 17 || i === 37) && (
                <div className="absolute inset-0 flex items-center justify-center opacity-70">
                  <Key className="w-3 h-3 text-white" />
                </div>
              )}
              
              {(i === 26 || i === 46) && (
                <div className="absolute inset-0 flex items-center justify-center opacity-70">
                  <Lock className="w-3 h-3 text-white" />
                </div>
              )}
              
              {/* Highlight effect on hover */}
              {hoveredCell === i && (
                <div className="absolute inset-0 bg-white/10 rounded-md z-10"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Enhanced center shield */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          {/* Multi-layered glow effect */}
          <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/40 to-purple-600/40 rounded-full blur-2xl opacity-70 animate-pulse-slow"></div>
          <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/60 to-purple-600/60 rounded-full blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/60 to-purple-500/60 rounded-full blur-md opacity-80 animate-pulse-slow" 
               style={{animationDelay: '0.5s', animationDuration: '3s'}}></div>
          
          {/* Identity Protection Ring */}
          <div className="absolute -inset-10 border-2 border-blue-500/20 rounded-full"></div>
          <div className="absolute -inset-14 border border-purple-500/10 rounded-full"></div>
          
          {/* Shield with glow */}
          <div className="relative">
            <Shield className="h-24 w-24 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            
            {/* Inner detail */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-t-2 border-white/30 rounded-full"></div>
            
            {/* Identity text */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/80 text-xs font-semibold tracking-wider">
              IDENTITY SHIELD
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array(15).fill().map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SecurityGridAnimation;