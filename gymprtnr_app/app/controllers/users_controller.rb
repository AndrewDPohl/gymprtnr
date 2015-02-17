class UsersController < ApplicationController

  def index
    respond_to do |format|
      format.html
    end
  end

  def create
  end

  def update
    user_params = params.require(:user).permit(:age, :phone_number, :city, :zipcode, :bio)
    if current_user.try(:update, user_params)
      respond_to do |format|
        format.json {render json: current_user, only: [:id, :name, :age, :phone_number, :city, :zipcode, :bio]}
      end
    else
      respond_to do |format|
        format.json {render nothing: true, status: 400}
      end
    end
  end

  def search

  end

  def destroy
    current_user.destroy
    respond_to do |format|
      format.json {render nothing: true}
    end
  end

end
