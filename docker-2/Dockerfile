FROM alpine:latest

COPY my-program.py /home
COPY requirements.txt /home
USER root
WORKDIR /home

RUN apk --update-cache add python3
RUN apk --update-cache add py-pip
RUN pip install PyGithub --break-system-packages

#CMD ["/bin/sh"]
CMD python /home/my-program.py
