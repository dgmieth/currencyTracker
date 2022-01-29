FROM node:14-alpine
#RUN npm install -g nodemon
COPY . /
WORKDIR / 
RUN npm install
#RUN npm runScript preinstall
ENTRYPOINT npm start
EXPOSE 4050