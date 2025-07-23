package com.example.distributednewsbackend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.distributednewsbackend.services.KafkaProducerService;



import java.time.LocalDateTime;

@RestController
@RequestMapping("/api")
public class TestAproxyController {
    private static final Logger logger = LoggerFactory.getLogger(TestAproxyController.class);
    //Clase para probar que el balanceo de haproxy funciona correctamente
    @Value("${server.instance}")
    private String serverInstance;

    @Value("${server.port}")
    private String serverPort;

    @Autowired
    private KafkaProducerService kafkaProducerService;

    @GetMapping("/test")
    public String test() {
        logger.info("=== TEST ENDPOINT CALLED ===");
        logger.info("Server instance: {}", serverInstance);
        logger.info("Server port: {}", serverPort);
        logger.warn("This is a WARNING level message to test logging");
        logger.error("This is an ERROR level message to test logging");
        
        String response = "Test successful! from " + serverInstance;
        logger.info("Returning response: {}", response);
        return response;
}
    
    @PostMapping("/auto-publish")
    public String autoPublish(@RequestParam(defaultValue = "news-general") String topic,
                             @RequestParam(defaultValue = "Auto-generated news") String message) {
        try {
            logger.info("Auto-publishing news to topic: {}", topic);
            String newsJson = String.format(
                "{\"title\": \"Auto News from %s\", \"content\": \"%s\", \"category\": \"general\", \"timestamp\": \"%s\", \"server\": \"%s\"}",
                serverInstance, message, LocalDateTime.now().toString(), serverInstance
            );
            kafkaProducerService.sendMessage(topic, newsJson);
            return "Auto-publish successful from " + serverInstance + " to topic: " + topic;
        } catch (Exception e) {
            return "Error in auto-publish from " + serverInstance + ": " + e.getMessage();
        }
    }
    
    @GetMapping("/test-page")
    public String testPage() {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <title>Distributed News Test - SSE Connection</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        margin: 20px; 
                        background-color: #f5f5f5;
                    }
                    .container { 
                        max-width: 800px; 
                        margin: 0 auto; 
                        background-color: white;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .section { 
                        margin: 20px 0; 
                        padding: 15px; 
                        border: 1px solid #ddd; 
                        border-radius: 5px; 
                        background-color: #fafafa;
                    }
                    .messages { 
                        border: 1px solid #ccc; 
                        padding: 10px; 
                        height: 400px; 
                        overflow-y: auto; 
                        background-color: white;
                        font-family: monospace;
                    }
                    .message { 
                        margin: 5px 0; 
                        padding: 8px; 
                        border-radius: 3px; 
                        border-left: 4px solid #007bff;
                    }
                    .message.news { border-left-color: #28a745; background-color: #f8fff9; }
                    .message.error { border-left-color: #dc3545; background-color: #fff5f5; }
                    .message.info { border-left-color: #17a2b8; background-color: #f5feff; }
                    
                    button { 
                        margin: 5px; 
                        padding: 10px 20px; 
                        cursor: pointer; 
                        border: none;
                        border-radius: 4px;
                        font-size: 14px;
                    }
                    .btn-success { background-color: #28a745; color: white; }
                    .btn-danger { background-color: #dc3545; color: white; }
                    .btn-secondary { background-color: #6c757d; color: white; }
                    
                    .status {
                        padding: 10px;
                        margin: 10px 0;
                        border-radius: 4px;
                        font-weight: bold;
                    }
                    .status.connected { background-color: #d4edda; color: #155724; }
                    .status.disconnected { background-color: #f8d7da; color: #721c24; }
                    .status.connecting { background-color: #fff3cd; color: #856404; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>📡 Distributed News System - SSE Test</h1>
                    <p>Backend Server: <strong id="server-info">Loading...</strong></p>
                    
                    <div class="section">
                        <h2>📡 SSE Connection (via Zilla)</h2>
                        <p>This page connects to the SSE stream and displays messages in real-time.</p>
                        <p>Auto-publishing is handled by the news-generator service.</p>
                        <div class="status disconnected" id="sse-status">Disconnected</div>
                        <button class="btn-success" onclick="startSSE()">Connect to SSE Stream</button>
                        <button class="btn-danger" onclick="stopSSE()">Disconnect</button>
                        <button class="btn-secondary" onclick="clearMessages()">Clear Messages</button>
                        <div class="messages" id="sse-messages"></div>
                    </div>
                    
                    <div class="section">
                        <h2>ℹ️ Information</h2>
                        <p><strong>SSE Endpoint:</strong> http://localhost:443/news-stream</p>
                        <p><strong>Auto-publish Endpoint:</strong> /auto-publish (for external systems)</p>
                        <p><strong>Load Balancer:</strong> HAProxy distributes requests between backend instances</p>
                        <p><strong>Message Flow:</strong> Kafka → Zilla → SSE → Browser</p>
                    </div>
                </div>
                
                <script>
                    let eventSource = null;
                    let messageCount = 0;
                    
                    // Load server info on page load
                    window.onload = function() {
                        fetch('/test')
                        .then(response => response.text())
                        .then(data => {
                            document.getElementById('server-info').textContent = data;
                        })
                        .catch(error => {
                            document.getElementById('server-info').textContent = 'Error loading server info';
                        });
                    };
                    
                    function startSSE() {
                        if (eventSource) {
                            eventSource.close();
                        }
                        
                        updateSSEStatus('connecting', 'Connecting...');
                        
                        // Connect to Zilla SSE endpoint on port 443
                        eventSource = new EventSource('/news-stream');
                        
                        eventSource.onopen = function(event) {
                            updateSSEStatus('connected', 'Connected to SSE Stream');
                            addMessage('📡 SSE connection established successfully', 'info');
                        };
                        
                        eventSource.onmessage = function(event) {
                            messageCount++;
                            try {
                                const data = JSON.parse(event.data);
                                const message = `📰 [${messageCount}] ${data.title}: ${data.content}`;
                                const serverInfo = data.server ? ` (from ${data.server})` : '';
                                addMessage(message + serverInfo, 'news');
                            } catch (e) {
                                addMessage(`📰 [${messageCount}] Raw message: ${event.data}`, 'news');
                            }
                        };
                        
                        eventSource.onerror = function(event) {
                            updateSSEStatus('disconnected', 'Connection error');
                            addMessage('❌ SSE connection error occurred', 'error');
                        };
                    }
                    
                    function stopSSE() {
                        if (eventSource) {
                            eventSource.close();
                            eventSource = null;
                            updateSSEStatus('disconnected', 'Disconnected');
                            addMessage('🔌 SSE connection closed', 'info');
                        }
                    }
                    
                    function updateSSEStatus(status, message) {
                        const statusDiv = document.getElementById('sse-status');
                        statusDiv.className = 'status ' + status;
                        statusDiv.textContent = message;
                    }
                    
                    function clearMessages() {
                        document.getElementById('sse-messages').innerHTML = '';
                        messageCount = 0;
                    }
                    
                    function addMessage(message, type) {
                        const messagesDiv = document.getElementById('sse-messages');
                        const messageDiv = document.createElement('div');
                        messageDiv.className = 'message ' + type;
                        messageDiv.innerHTML = '<strong>' + new Date().toLocaleTimeString() + '</strong>: ' + message;
                        messagesDiv.appendChild(messageDiv);
                        messagesDiv.scrollTop = messagesDiv.scrollHeight;
                    }
                    
                    // Auto-reconnect on page focus
                    window.addEventListener('focus', function() {
                        if (!eventSource || eventSource.readyState === EventSource.CLOSED) {
                            console.log('Page focused, checking SSE connection...');
                        }
                    });
                    
                    // Auto-connect on page load
                    window.addEventListener('load', function() {
                        setTimeout(startSSE, 1000);
                    });
                </script>
            </body>
            </html>
            """;
    }
}