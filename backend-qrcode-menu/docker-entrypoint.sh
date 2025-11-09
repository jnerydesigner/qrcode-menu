#!/bin/bash
set -euo pipefail

MONGO_REPLICA_PORT="${MONGO_REPLICA_PORT:-27017}"
MONGO_REPLICA_HOST="${MONGO_REPLICA_HOST:-localhost}"
MONGO_REPLICA_SET="${MONGO_REPLICA_SET:-rs0}"

mongod --replSet "${MONGO_REPLICA_SET}" --bind_ip_all --port "${MONGO_REPLICA_PORT}" "$@" &
MONGOD_PID=$!

cleanup() {
  if kill -0 "${MONGOD_PID}" 2>/dev/null; then
    kill "${MONGOD_PID}"
    wait "${MONGOD_PID}" || true
  fi
}

trap cleanup INT TERM

if command -v mongosh >/dev/null 2>&1; then
  MONGO_SHELL=(mongosh --quiet)
else
  MONGO_SHELL=(mongo --quiet)
fi

until "${MONGO_SHELL[@]}" --port "${MONGO_REPLICA_PORT}" --eval "db.runCommand({ ping: 1 })" >/dev/null 2>&1; do
  sleep 1
done

read -r -d '' INIT_REPL_JS <<EOF_JS
const config = {
  _id: "${MONGO_REPLICA_SET}",
  members: [{ _id: 0, host: "${MONGO_REPLICA_HOST}:${MONGO_REPLICA_PORT}" }],
};
try {
  const status = rs.status();
  if (status.ok !== 1) {
    throw new Error(JSON.stringify(status));
  }
} catch (error) {
  if (error.codeName === 'NotYetInitialized' || error.code === 94) {
    rs.initiate(config);
  } else if (error.codeName !== 'AlreadyInitialized' && error.code !== 23) {
    throw error;
  }
}
EOF_JS

"${MONGO_SHELL[@]}" --port "${MONGO_REPLICA_PORT}" --eval "${INIT_REPL_JS}" >/dev/null

tail --pid="${MONGOD_PID}" -f /dev/null
