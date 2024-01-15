module ExceptionHandler
  extend ActiveSupport::Concern

  class User::NotAuthorized < StandardError; end

  included do
    rescue_from User::NotAuthorized, with: :render_403
    rescue_from ActiveRecord::RecordNotFound, with: :render_404
    rescue_from ActiveRecord::RecordInvalid, with: :render_403
  end

  private

  def render_403(exception = nil)
    render_error(403, 'Forbidden', exception&.record.errors)
  end

  def render_404(exception = nil)
    render_error(404, 'Record Not Found', exception&.record.errors)
  end

  def render_error(code, message, errors)
    response = {
        message: message,
        errors: errors.full_messages
    }

    render json: response, status: code
  end
end