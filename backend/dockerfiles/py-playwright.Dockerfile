# Dockerfile that will build the judging image  

FROM mcr.microsoft.com/playwright

RUN apt-get update -y && apt-get install -y python
RUN pip install playwright