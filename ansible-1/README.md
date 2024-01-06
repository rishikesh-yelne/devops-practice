Create a host and web server deployment file to run an Ansible Playbook \
Create a docker which installs ansible, openssh and bash to run the Ansible Playbook \
Host it on a VCL instance of Ubuntu 

Ensure that the remote instance can be `ssh`-ed without password by appending the `ssh` key in the `authorized_keys` file on the remote server.
Steps: \

If you're using Powershell, you'll want to replace the `~` in the commands below with your full path, something like `C:/Users/USERNAME/.ssh/.id_rsa.pub`.

1. Copy your `id_rsa.pub` to the remote machine, using the `scp` command(`scp` stands for "secure copy", which uses `ssh` to securely copy a file from one machine to another) , like this `scp ~/.ssh/id_rsa.pub <YOUR-UNITY-ID-OR-USERNAME>@<YOUR-REMOTE-MACHINE-IP-ADDRESS>:` (NOTE the trailing `:` at the end of the command -- this specifies the destination of the file to the default user directory `~`).  
2. `ssh` into the remote machine again.
3. Create the `~/.ssh` folder if it does not already exist, using `mkdir ~/.ssh`.
4. Append the contents of your `id_rsa.pub` to the `~/.ssh/authorized_keys` file, like this:  `cat id_rsa.pub >> ~/.ssh/authorized_keys`, where `>>` appends the output of the `cat` command to a file.  The `cat` command stands for "concatenate."
5. Delete your `id_rsa.pub` file from the remote machine: `rm id_rsa.pub` 
6. Exit the remote connection with `exit`.


Build docker
```
docker build . --tag ws4
```

Run docker
```
docker run -it -v ${PWD}:/ws4 -v ${HOME}/.ssh:/root/.ssh --env-file .\myenv.txt ws4
```

In the docker's bash: \
```
ansible-playbook -i hosts.yaml deploy-webserver.yaml
```