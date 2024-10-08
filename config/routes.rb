# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Accounts
  get "/api/stripe/accounts" => "stripe#list_accounts"
  post "/api/stripe/account" => "stripe#create_account"
  post "/api/stripe/account" => "stripe#create_account"
  get "/api/stripe/account/:account_id" => "stripe#retrieve_account"
  get "/api/stripe/account/:account_id/account_link" => "stripe#create_account_link", as: :stripe_account_link
  get "/api/stripe/account/:account_id/login_link" => "stripe#create_login_link", as: :stripe_login_link
  post "/api/stripe/account/:account_id/account_session" => "stripe#create_account_session"

  # Products
  get "/api/stripe/products" => "stripe#list_products"
  get "/api/stripe/products/:product_id" => "stripe#retrieve_product"
  post "/api/stripe/products/:product_id/archive" => "stripe#archive_product"
  post "/api/stripe/product" => "stripe#create_product"

  # Payment Links
  get "/api/stripe/accounts/:account_id/products/:product_id/link" => "stripe#create_payment_link"

  # Checkout
  get "/api/stripe/accounts/:account_id/products/:product_id/checkout" => "stripe#create_checkout_link"

  # Customers
  get "/api/stripe/customers" => "stripe#list_customers"

  # Subscriptions
  get "/api/stripe/subscriptions" => "stripe#list_subscriptions"

  # Invoices
  get "/api/stripe/invoices" => "stripe#list_invoices"

  root to: "dashboard#index"
  get "/*react_route", to: "dashboard#index"
end
