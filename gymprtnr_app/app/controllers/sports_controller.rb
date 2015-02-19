class SportsController < ApplicationController
  def index
    @sports = Sport.all
    respond_to do |format|
      format.html
      format.json {render json: @sports, status: 200}
    end
  end

  def search
    sport = Sport.find(params[:id])
    #user_data = User.joins(:sports).where({sports: {id: params[:id]}}).select('distinct users.*')
    user_data = Sport.find(params[:id]).users().distinct
    render json: user_data, only: [:id, :name, :city, :bio, :zipcode, :age, :facebook_image]
  end
 

  def update
  end

  def destroy
  end
end
