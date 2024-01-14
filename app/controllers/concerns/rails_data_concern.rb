# frozen_string_literal: true

module RailsDataConcern
  extend ActiveSupport::Concern

  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::JavaScriptHelper
  # include SecureHeaders::ViewHelpers

  included do
    helper_method :set_rails_data, :inject_rails_data
  end

  def set_rails_data(key, value)
    @data ||= {}
    @data[key] = value
    nil
  end

  def inject_rails_data
    @data ||= {}
    javascript_tag(
      format("window.RailsData = %{data};", data: flat_keys_to_nested(@data).to_json),
      # nonce: content_security_policy_script_nonce,
    )
  end

  private

  def flat_keys_to_nested(hash)
    hash.each_with_object({}) do |(key, value), all|
      key_parts = key.split(".").map!(&:to_sym)
      leaf = key_parts[0...-1].inject(all) { |h, k| h[k] ||= {} }
      leaf[key_parts.last] = value
    end
  end
end
