class SessionsController < ApplicationController

  def create
    user = User.from_omniauth(env["omniauth.auth"])
    session[:user_id] = user.id
    redirect_to root_url
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end

  def user_info
    render json: current_user, only: [:id, :name, :age, :phone_number, :city, :zipcode, :bio, :facebook_image]
  end 

end
