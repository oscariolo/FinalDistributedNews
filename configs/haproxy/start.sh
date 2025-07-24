#!/bin/bash

KEEPALIVED_CONF=${KEEPALIVED_CONF:-/keepalived/keepalived.master.conf}

echo "Starting HAProxy and Keepalived with config: $KEEPALIVED_CONF"

# Copy the specified keepalived config
cp "$KEEPALIVED_CONF" /etc/keepalived/keepalived.conf

# Start keepalived
service keepalived start

tail -20 /var/log/syslog || tail -20 /var/log/messages

# Start haproxy
haproxy -f /usr/local/etc/haproxy/haproxy.cfg -db