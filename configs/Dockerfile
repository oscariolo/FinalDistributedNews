FROM haproxy:latest

USER root
RUN apt-get update && apt-get install -y keepalived && rm -rf /var/lib/apt/lists/*
USER haproxy