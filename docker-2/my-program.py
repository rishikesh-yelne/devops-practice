#!/usr/bin/env python3

import os
from github import Github, GithubException, Auth, Repository

token = os.environ.get('GITHUB_TOKEN')
repo = os.environ.get('REPO')
username = os.environ.get('USERNAME')
enterprise = os.environ.get('HOST')


def create_branch(repo: Repository, branch: str):
    sb = repo.get_branch(repo.default_branch)
    repo.create_git_ref(ref='refs/heads/' + branch, sha=sb.commit.sha)
    print(f"Created {branch} branch")

auth = Auth.Token(token)
g = Github(base_url=f"https://{enterprise}/api/v3", auth=auth)

git_repo = g.get_repo(f"{username}/{repo}")
try:
    dev_branch = git_repo.get_branch("dev")
except GithubException as ge:
    print("DEV branch not found, creating...")
    create_branch(git_repo, "dev")

try:
    rel_branch = git_repo.get_branch("release")
except GithubException as ge:
    print("REL branch not found, creating...")
    create_branch(git_repo, "release")

# To close connections after use
g.close()
