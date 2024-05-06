# frozen_string_literal: true

class StripeController < ApplicationController
  def list_accounts
    stripe_accounts = Stripe::Account.list({
      limit: params[:limit] || 20,
      starting_after: params[:starting_after],
      ending_before: params[:ending_before],
    })

    render json: stripe_accounts
  rescue => error
    puts "Error listing accounts: #{error}"
    render json: { error: error.message }, status: 500
  end

  def retrieve_account
    stripe_account = Stripe::Account.retrieve(params[:account_id])
    render json: stripe_account
  rescue => error
    puts "Error retrieving account: #{error}"
    render json: { error: error.message }, status: 500
  end

  def create_account
    stripe_account = Stripe::Account.create({
      type: params[:type],
      country: params[:country],
      email: params[:email],
      capabilities: params.to_unsafe_h[:capabilities],
    })

    render json: stripe_account
  rescue => error
    puts "Error creating account: #{error}"
    render json: { error: error.message }, status: 500
  end

  def list_products
    headers = {stripe_account: params[:account_id]}
    stripe_products = Stripe::Product.list({ limit: params[:limit] || 20}, headers)

    render json: stripe_products
  rescue => error
    puts "Error listing products: #{error}"
    render json: { error: error.message }, status: 500
  end

  def retrieve_product
    headers = {stripe_account: params[:account_id]}
    stripe_product = Stripe::Product.retrieve(params[:product_id], headers)
    render json: stripe_product
  rescue => error
    puts "Error retrieving product: #{error}"
    render json: { error: error.message }, status: 500
  end

  def create_product
    headers = {stripe_account: params[:account_id]}
    stripe_product = Stripe::Product.create({
      name: params[:name],
      description: params[:description],
      default_price_data: {
        currency: 'cad',
        unit_amount: params[:unit_amount],
        recurring: {interval: 'month'},
      },
    }, headers)

    render json: stripe_product
  rescue => error
    puts "Error creating product: #{error}"
    render json: { error: error.message }, status: 500
  end

  def archive_product
    headers = {stripe_account: params[:account_id]}
    stripe_product =  Stripe::Product.update(params[:product_id], {
      active: params[:active],
    }, headers)

    render json: stripe_product
  rescue => error
    puts "Error archiving product: #{error}"
    render json: { error: error.message }, status: 500
  end

  def create_payment_link
    stripe_payment_link = begin
      headers = {stripe_account: params[:account_id]}
      stripe_product = Stripe::Product.retrieve(params[:product_id], headers)

      Stripe::PaymentLink.create({
        line_items: [
          {
            price: stripe_product.default_price,
            quantity: 1,
          },
        ],
        phone_number_collection: {
          enabled: true,
        },
      }, headers)
    rescue => error
      puts "Error creating payment link: #{error}"
      nil
    end

    if stripe_payment_link
      redirect_to stripe_payment_link.url, allow_other_host: true
    else
      redirect_to "/not-found"
    end
  end

  def create_checkout_link
    stripe_checkout = begin
      headers = {stripe_account: params[:account_id]}
      stripe_product = Stripe::Product.retrieve(params[:product_id], headers)
      stripe_customers = Stripe::Customer.search({
        query: "email:'#{params[:email]}'"
      }, headers)

      Stripe::Checkout::Session.create({
        success_url: "http://localhost:5100/success",
        line_items: [
          {
            price: stripe_product.default_price,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        customer: stripe_customers.first&.id,
      }, headers)
    rescue => error
      puts "Error creating checkout link: #{error}"
      nil
    end

    if stripe_checkout
      redirect_to stripe_checkout.url, allow_other_host: true
    else
      redirect_to "/not-found"
    end
  end

  def list_customers
    headers = {stripe_account: params[:account_id]}
    stripe_customers = Stripe::Customer.list({ limit: params[:limit] || 20}, headers)

    render json: stripe_customers
  rescue => error
    puts "Error listing customers: #{error}"
    render json: { error: error.message }, status: 500
  end

  def list_subscriptions
    headers = {stripe_account: params[:account_id]}
    stripe_subscription = Stripe::Subscription.list({ limit: params[:limit] || 20}, headers)

    render json: stripe_subscription
  rescue => error
    puts "Error listing subscriptions: #{error}"
    render json: { error: error.message }, status: 500
  end

  def create_account_link
    account_id = account_link_params.fetch(:account_id)
    options = account_link_params.except(:account_id)
    collection_options = options.fetch(:collection_options).to_h

    stripe_account_link = begin
      Stripe::AccountLink.create({
        account: params[:account_id],
        refresh_url: stripe_account_link_url(account_id: account_id, params: options.to_h),
        return_url: root_url,
        type: options.fetch(:type, "account_onboarding"),
        collection_options: collection_options,
      })
    rescue => error
      puts "Error create account link: #{error}"
      nil
    end

    if stripe_account_link
      redirect_to stripe_account_link.url, allow_other_host: true
    else
      redirect_to "/not-found"
    end
  end

  def create_account_session
    external_account_collection = params.fetch("externalAccountCollection", false)
    account_session = Stripe::AccountSession.create({
      account: params[:account_id],
      components: {
        account_onboarding: {
          enabled: true,
          features: {
            external_account_collection: external_account_collection,
          },
        },
        account_management: {
          enabled: true,
          features: {
            external_account_collection: external_account_collection,
          },
        },
        documents: {
          enabled: true,
        },
        payouts: {
          enabled: true,
          features: {
            instant_payouts: true,
            standard_payouts: true,
            edit_payout_schedule: true,
          }
        },
        payment_details: {
          enabled: true,
          features: {
            refund_management: true,
            dispute_management: true,
            capture_payments: true,
          },
        },
        payments: {
          enabled: true,
          features: {
            refund_management: true,
            dispute_management: true,
            capture_payments: true,
          },
        },
      },
    })

    render json: account_session
  rescue => error
    puts "Error creating account session: #{error}"
    render json: { error: error.message }, status: 500
  end

  private

  def account_link_params
    params.permit(:account_id, :type, collection_options: [:fields, :future_requirements])
  end
end
