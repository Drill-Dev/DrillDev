FROM ubuntu

# Some default settings for Python, Pip, and Poetry
ENV PYTHONFAULTHANDLER=1 \
	PYTHONHASHSEED=random \
	PYTHONUNBUFFERED=1 \
	PIP_DEFAULT_TIMEOUT=100 \
	PIP_DISABLE_PIP_VERSION_CHECK=1 \
	PIP_NO_CACHE_DIR=1 \
	POETRY_VERSION=1.1.7 \
	POETRY_VIRTUALENVS_IN_PROJECT=true

# We're setting this envvar so that it doesn't prompt us for the timezone
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y tzdata

# Install Python and Pip
RUN apt-get update && apt-get install -y --no-install-recommends python3 python3-pip

WORKDIR /root/app

# Create cached folders beforehand to avoid permission issues
RUN mkdir -p \
	/root/app/.venv \
	/root/app/__pycache__

# Install Poetry
RUN pip3 install poetry==$POETRY_VERSION

COPY ./pyproject.toml /root/app/pyproject.toml
COPY ./poetry.lock /root/app/poetry.lock

RUN poetry install
RUN poetry run playwright install firefox
RUN poetry run playwright install-deps firefox

# The port we'll bind to
EXPOSE 5000

