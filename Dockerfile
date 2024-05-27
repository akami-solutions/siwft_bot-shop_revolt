FROM node:20-alpine
LABEL authors=["Akami Solutions <contact@akami-solutions.cc>","Akama Aka <akama.aka@akami-solutions.cc>"] \
      org.opencontainers.image.licenses="GPL-3.0-or-later" \
      org.opencontainers.image.source="# Revolt Chat Bot Shop with SIWFT Integration"
ENV   BOT_TOKEN=null \
      IWAN=null \
      PREFIX=null \

RUN  apk update && \
     ak upgrade -y

COPY . /opt/bot/

RUN cd /opt/bot/ && \
    npm ci

WORKDIR /opt/bot/

CMD ["node","bot.js"]