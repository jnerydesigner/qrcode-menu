ARG MONGO_VERSION=6.0

FROM mongo:${MONGO_VERSION}

ENV MONGO_REPLICA_PORT=27017 \
    MONGO_REPLICA_HOST=localhost \
    MONGO_REPLICA_SET=rs0

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD []
