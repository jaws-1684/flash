class UsersController < ApplicationController
  def search
    username = params[:username]
    users = User.search(username).with_pg_search_highlight
    if users.length > 0
      render json: users
    else
      render json: { error: "not found" }, status: :unprocessable_entity
    end
  end
end
