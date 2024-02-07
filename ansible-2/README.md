Try out two different configuration and setup, compare both of these configuration based on the time taken for requests.

Setup 1: \
Let the NodeJS app and MySQL DB be on the same host

Setup 2: \
Deploy the NodeJS app and MySQL DB on different VMs, run the app with the host address of the database passed as a parameter

Host 3 different virtual machines of Ubuntu 22.04 LTS image (1 for Setup 1 and 2 for Setup 2) \
Ensure that the remote instance can be `ssh`-ed without password by appending the `ssh` key in the `authorized_keys` file on the remote server. \
Steps: 

If you're using Powershell, you'll want to replace the `~` in the commands below with your full path, something like `C:/Users/USERNAME/.ssh/.id_rsa.pub`.

1. Copy your `id_rsa.pub` to the remote machine, using the `scp` command(`scp` stands for "secure copy", which uses `ssh` to securely copy a file from one machine to another) , like this `scp ~/.ssh/id_rsa.pub <YOUR-UNITY-ID-OR-USERNAME>@<YOUR-REMOTE-MACHINE-IP-ADDRESS>:` (NOTE the trailing `:` at the end of the command -- this specifies the destination of the file to the default user directory `~`).  
2. `ssh` into the remote machine again.
3. Create the `~/.ssh` folder if it does not already exist, using `mkdir ~/.ssh`.
4. Append the contents of your `id_rsa.pub` to the `~/.ssh/authorized_keys` file, like this:  `cat id_rsa.pub >> ~/.ssh/authorized_keys`, where `>>` appends the output of the `cat` command to a file.  The `cat` command stands for "concatenate."
5. Delete your `id_rsa.pub` file from the remote machine: `rm id_rsa.pub` 
6. Exit the remote connection with `exit`.


Build docker
```
docker build . --tag ws5
```

Run docker
```
docker run -it -v ${PWD}:/ws5 -v ${HOME}/.ssh:/root/.ssh ws4
```

In the docker's bash: 
```
ansible-playbook -i hosts-1.yaml 0-update-security.yaml 1-setup-config.yaml
```

```
ansible-playbook -i hosts-2.yaml 0-update-security.yaml 2-setup-config.yaml
```


After successful completion of the Ansible tasks, you can try out the NodeJS App using the URL in the hosts file:

`http://<IP>:3000/` should return 'Hello, World!' 

`http://<IP>:3000/data` should return a random point, the closest point present in the csv file (which was loaded in MySQL DB) and the distance between them. \
Consecutive hits to the same endpoint will show different results.

Try the above endpoint for both the configurations. \
The comparison of the performance of both the configurations is available as a screenshot in the repository.