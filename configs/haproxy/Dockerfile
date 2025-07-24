# Dockerfile.haproxy-keepalived
FROM haproxy:latest

RUN apt-get update && \
    apt-get install -y keepalived && \
    apt-get clean

COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
COPY keepalived.conf /etc/keepalived/keepalived.conf
COPY start.sh /start.sh

RUN chmod +x /start.sh

CMD ["/start.sh"]
