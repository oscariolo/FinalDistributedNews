FROM haproxy:latest

USER root
RUN apt-get update && \
    apt-get install -y keepalived && \
    apt-get clean

COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
COPY start.sh /start.sh

RUN chmod +x /start.sh

CMD ["/start.sh"]