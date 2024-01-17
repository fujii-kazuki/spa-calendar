FROM ruby:3.2.2

RUN <<EOF
  apt update -qq
  gem update --system
EOF

WORKDIR /api
COPY ./Gemfile /api/Gemfile
COPY ./Gemfile.lock /api/Gemfile.lock

RUN bundle install
RUN bundle config set path 'vendor/bundle'