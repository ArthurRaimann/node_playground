# Run Node.js service in Docker

To deploy an application it is important to consider a view topics.

### Prepare system the application uses for deployment with docker

- install Node
- execute npm (or yarn)
- decide which versions to use
- exclude devDependencies

### Execute the application

- execute app
- transfere configurations
- monitor process

#### env (Config)

configs will be stored in env variables accordingly to the concept of [the 12 factor app](https://12factor.net/de/).

#### What is a containet (in Docker)?

> A Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings.

## To Run Node.js application in Docker:

- add a `Dockerfile` to the project

  - `FROM` specifies the image basis e.g. `FROM node:18-alpine`
  - `ADD` package.json if it is cached and unchaged it will be used and yarn will not download packages again in the next line
  - `RUN` will execute npm (or yarn) `RUN yarn` or `RUN npm install`. `--production` will ignore devDependencies. In total: `cd /app && \ yarn install --production`. _Note! Every `RUN`command will open a new shell and start in the root. therefore they need to be chainged._
  - `ADD` add application to the image e.g. `ADD . /app/` adds whole directory to destination directory /app/
  - `CMD` is the command that starts the container e.g. `CMD ["node", "/app/app.js"]`

- add `.dockerignore` file with entry `node_modules and .git`
- start the image with a build `docker build -t myapp .` (-t tags the image with the label myapp) in the current directory `. `
- check if your image was created with `docker images`
- start a container with `docker run -d -e PORT=4000 -p 8080:4000 --restart always --name myappcontainer myapp` `-d` is detached, `-e` is environment variables, `PORT=4000` is the Docker container port that should be mapped to an port that is reachable from outside like 8080 -> `-p 4000:8080`. The `restart` policy decides how the container acts in case of crash. The `--name` tag will give the container a name since the image already hase one.
- with `docker ps` the running container can be seen.
