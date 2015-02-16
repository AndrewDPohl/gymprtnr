class UsersController < ApplicationController
  def index
    $users = User.all
    respond_to do |format|
      format.html
      format.json {render json: @users}
    end
  end

  def create
  end

  def update
    user_params = params.require(:user).permit(:age, :phone_number, :city, :zipcode, :bio)
    @user = User.find(params[:id])
    @user.create(user_params)
    respond_to do |format|
      format.json {render json: @user}
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    respond_to do |format|
      format.json {render nothing: true}
    end
  end

end
