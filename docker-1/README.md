To build the Docker image:

```
docker build . -t workshop-1
```

Start the `docker` container in interactive mode (`-it` flags) :


```
docker run -it workshop-1
```

Start the `docker` container in interactive mode along with a volume containing the scratch folder:
```
docker run -v ${PWD}/scratch:/scratch  -it workshop-1
```

Restart the docker container to install git and cloc:


```
docker run -it workshop-1
```

```
apk update
```

Install the program `cloc` (*Count Lines of Code*) within the container:
```
apk add cloc
```

Install the program `git` within the container so we can download some code:
```
apk add git
```

```
git clone --depth=1 https://github.com/git/git.git
```

Run `cloc` on the contents of the directory called `git`:
```
cloc git
```
