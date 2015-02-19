class SessionsController < ApplicationController

  # Takes information from Facebook to create a user and session
  def create
    user = User.from_omniauth(env["omniauth.auth"])
    session[:user_id] = user.id
    redirect_to root_url
  end

  # For logging out
  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end

  # Information from a user to display
  def user_info
    render json: current_user, only: [:id, :name, :age, :phone_number, :city, :zipcode, :bio, :facebook_image], include: [:sports]
  end 


end
