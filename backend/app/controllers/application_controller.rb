class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include DeviseHackFakeSession

  wrap_parameters false

  rescue_from ActionController::ParameterMissing, with: :render400
  rescue_from ActiveRecord::RecordNotFound, with: :render404

  rescue_from ActiveRecord::RecordInvalid, with: :render422
  rescue_from StandardError, with: :render500

  private

  def render400(error)
    render json: { errors: [error.message] }, status: :bad_request
  end

  def render404(error)
    render json: { errors: [error.message] }, status: :not_found
  end

  def render422(error)
    render json: { errors: error.record.errors.full_messages }, status: :unprocessable_content
  end

  def render500(error)
    logger.error(error.message)
    logger.error(error.backtrace.join("\n"))

    render json: { errors: ['Internal Server Error'] }, status: :internal_server_error
  end
end
