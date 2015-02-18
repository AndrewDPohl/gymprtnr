class SportsController < ApplicationController
  def index
    @sports = Sports.all
    respond_to do |format|
      format.html
      format.json {render json: @sports, status: 200}
    end
  end

  def create
    sport_params = params.require(:sport).permit(:name)
    @sport = Sport.new(sport_params)
    if @sport.save
      respond_to do |format|
        format.json { render json: @sport, status: 201}
      end
    else
      respond_to do |format|
        format.json {render nothing: true, status: 422}
      end
    end
  end

  def update
  end

  def destroy
  end
end
