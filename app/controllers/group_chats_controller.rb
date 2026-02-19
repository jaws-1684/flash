class GroupChatsController < ApplicationController
	def search
    groups = GrupChat.search(params[:name]).with_pg_search_highlight

    if groups.length > 0
      render json: groups
    else
      render json: { error: "not found" }, status: :unprocessable_entity
    end
  end

	def create
		@chat = current_user.group_chats.build(group_chat_params)

		if @chat.save
			@user_chat = @chat.user_group_chats.create!(user: current_user)
			render json: { message: "Group was succesfuly created" }, status: :ok
		else
			render json: @chat.errors, status: :unprocessable_entity
		end
	end
	def destroy
		@chat = current_user.group_chats.find(params[:id])
		@admin = @chat&.admin
 		
 		if current_user == @admin
 			@chat.destroy
			redirect_to root_path, alert: "Group deleted"
		else
			redirect_to group_chat_path(@chat), alert: "Something went wrong"
		end
	end

  private
    def group_chat_params
      params.expect(group_chat: [ :name, :avatar ])
    end
end
