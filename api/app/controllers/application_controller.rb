class ApplicationController < ActionController::Base
  # current_userやuser_signed_in?などのヘルパーメソッドへのアクセスを提供
  ## https://devise-token-auth.gitbook.io/devise-token-auth/usage/controller_methods#methods
  include DeviseTokenAuth::Concerns::SetUserByToken

  # CSRF(Cross Site Request Forgery)対策を放棄
  skip_before_action :verify_authenticity_token
end
