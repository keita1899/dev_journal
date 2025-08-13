class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  before_action :ensure_json_request

  private

  rescue_from ActiveRecord::RecordNotFound do |e|
    render json: { error: e.message }, status: :not_found
  end

  rescue_from ActionController::ParameterMissing do |e|
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def ensure_json_request
    request.format = :json
  end
end
