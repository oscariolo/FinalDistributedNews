#!/bin/bash
sysctl -w net.ipv4.ip_nonlocal_bind=1

# Iniciar ambos servicios
service keepalived start
haproxy -f /etc/haproxy/haproxy.cfg

# Mantener el contenedor activo
tail -f /dev/null
