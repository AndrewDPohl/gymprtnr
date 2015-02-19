class UsersSportsController < ApplicationController

  # Method for adding a sport to the UserSports Table
  def add
    # Define which sport you are adding by finding that sport id and name
    sport_params = params.require(:sport).permit(:id, :name)
    # Find that sport by the id
    sport = Sport.find_by({id: sport_params[:id]})
    # The current user's sports gets the sport pushed to their UsersSports list
    current_user.sports.push sport
    # Redirect back to the list
    redirect_to "/sports"
    # puts sport
    # UsersSport.create({
    #                     user_id: current_user.id,
    #                     sport_id: sport_params[:id]
    #                    })
  end

  def destroy
  end


end
