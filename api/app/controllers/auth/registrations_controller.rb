class Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  # sign_up_paramsメソッドをオーバーライド
  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :name)
  end
end
