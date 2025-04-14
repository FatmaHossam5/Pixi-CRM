"use client";

import React, { useCallback, useState } from "react";
import {
    ReactFlow, Controls, Background,
    applyNodeChanges, applyEdgeChanges, addEdge,
    Handle, Position
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// 🔹 Custom Condition Node with Dropdown
const ConditionNode = ({ data }) => {
    return (
        <div className="bg-white p-3 shadow-lg rounded-lg border text-center">
            <strong>Condition</strong>
            <p>Priority:</p>
            <select
                value={data.priority}
                onChange={(e) => data.onChange(e.target.value)}
                className="border rounded p-1"
            >
                <option value="High">High</option>
                <option value="Low">Low</option>
            </select>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

// 🔹 Initial Nodes with One Trigger & One Action
const initialNodes = [
    { id: "1", type: "input", position: { x: 100, y: 50 }, data: { label: "Trigger: Task Assigned" } },
    {
        id: "2",
        type: "conditionNode",
        position: { x: 200, y: 200 },
        data: {
            priority: "High",
            onChange: (newValue) => console.log(`Priority changed to: ${newValue}`),
        }
    },
    { id: "3", type: "output", position: { x: 200, y: 350 }, data: { label: "Action: Send Slack + Email" } },
];

// 🔹 Initial Edges
const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
];

const NotificationFlow = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [priority, setPriority] = useState("High");
    const [notifications, setNotifications] = useState([]); // Stores notifications

    // 🔹 Handle Node Changes
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    // 🔹 Handle Edge Changes
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    // 🔹 Handle New Connections
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        []
    );

    // 🔹 Add New Trigger Node
    const addTrigger = () => {
        const newId = (nodes.length + 1).toString();
        const newNode = {
            id: newId,
            type: "input",
            position: { x: 100 + nodes.length * 50, y: 50 },
            data: { label: `Trigger: New Event ${newId}` },
        };

        setNodes((prev) => [...prev, newNode]);
    };

    // 🔹 Add New Action Node
    const addAction = () => {
        const newId = (nodes.length + 1).toString();
        const newNode = {
            id: newId,
            type: "output",
            position: { x: 200, y: 350 + nodes.length * 50 },
            data: { label: `Action: New Action ${newId}` },
        };

        setNodes((prev) => [...prev, newNode]);
    };

    // 🔹 Process Notification Flow
    const triggerEvent = (triggerId) => {
        let currentNode = nodes.find((n) => n.id === triggerId);
        const newNotifications = [`🚀 Starting Notification Flow from ${currentNode.data.label}...`];

        while (currentNode) {
            newNotifications.push(`✅ Processing: ${currentNode.data.label || "Condition Check"}`);

            // Simulate Condition Check
            if (currentNode.id === "2" && priority !== "High") {
                newNotifications.push("❌ Condition NOT met (Priority Low), stopping flow.");
                break;
            }

            // Simulate Action Execution
            if (currentNode.type === "output") {
                newNotifications.push("📢 Sending Slack & Email Notification!");
            }

            // Find Next Node via Edges
            const nextEdge = edges.find((edge) => edge.source === currentNode.id);
            currentNode = nodes.find((node) => node.id === nextEdge?.target);
        }

        newNotifications.push("🚀 Notification Flow Completed!");
        setNotifications(newNotifications);
    };

    return (
        <div style={{ height: "90vh", width: "100%" }}>
            <div className="mb-3">
                {/* 🔹 Dynamic Buttons for Triggers and Actions */}
                <button onClick={addTrigger} className="m-2 p-2 bg-yellow-500 text-white rounded">
                    ➕ Add Trigger
                </button>
                <button onClick={addAction} className="m-2 p-2 bg-purple-500 text-white rounded">
                    ➕ Add Action
                </button>
            </div>

            {/* 🔹 Display Notifications */}
            <div className="p-3 border rounded bg-gray-100 mb-3">
                <h2 className="text-lg font-bold">🔔 Notification Log</h2>
                <ul>
                    {notifications.map((msg, index) => (
                        <li key={index} className="text-sm">{msg}</li>
                    ))}
                </ul>
            </div>

            <ReactFlow
                nodes={nodes.map((node) =>
                    node.id === "2"
                        ? {
                            ...node,
                            data: { priority, onChange: (value) => setPriority(value) },
                        }
                        : node
                )}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={{ conditionNode: ConditionNode }} // Custom node type
                fitView
            >
                <Controls />
                <Background color="#ddd" gap={16} />
            </ReactFlow>
        </div>
    );
};

export default NotificationFlow;
