# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }
ruby "3.3.0"

# Server
gem "bootsnap", require: false

gem "rails", github: "rails/rails", branch: "main"
gem "puma", "~> 6.4"

# Deploy this application anywhere as a Docker container [https://kamal-deploy.org]
gem "kamal", require: false
gem 'thruster'

# Datastores
# gem "pg", "~> 1.5"
gem "sqlite3"

# Assets
gem "sprockets-rails"
gem "vite_rails"

# Finance
gem "stripe"

# Monitoring
gem "debug"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

group(:development, :test) do
  gem "byebug"
  gem "factory_bot_rails"
  gem "faker"
  gem "letter_opener"
  gem "mocha"
  gem "rspec-rails"
  gem "rubocop"
  gem "rubocop-shopify", require: false

  gem "shoulda-matchers"
  gem "timecop"
end

group(:development) do
  gem "spring"
end
