# base image
FROM node:12.2.0

LABEL maintainer="Aleksa Sukovic"

# Args
ARG USER_ID
ARG USER_GROUP

# install Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# Configure Git
RUN git config --global user.name "Aleksa Sukovic"
RUN git config --global user.email "sukovic.aleksa@gmail.com"

# Set working directory
WORKDIR /var/www

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /var/www/node_modules/.bin:$PATH

# Install and cache app dependencies
RUN npm install -g @angular/cli@7.3.9

# Add app
COPY ./ /var/www

# Initialize
RUN mkdir /scripts
COPY entrypoint.sh /scripts/
RUN ["chmod", "-R", "+x", "/scripts/"]

# Set non-root user
RUN usermod --uid $USER_ID node
RUN groupmod --gid $USER_GROUP node
USER node

ENTRYPOINT [ "/scripts/entrypoint.sh" ]
CMD [ ]
