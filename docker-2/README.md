Setup a Personal Access Token on GitHub Enterprise account.

Build container along with a tag:

```
docker build . --tag docker2
```

Run container, pass the env file as argument:

```
docker run --env-file myenv.txt docker2
```