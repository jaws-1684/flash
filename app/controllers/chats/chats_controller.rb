class Chats::ChatsController < ApplicationController
	include Messageable
	before_action :set_messageable
		def show
			if @messageable
				render inertia: 'messages/index', props: { 
					chatId: @messageable.id,
					recipient: current_user.chat_recipient(@messageable), 
					chatMessages:  @messageable.messages.order(created_at: :desc)
				}
		      # render :json => order_by_creation_time(@messageable.messages)
		    else
		     redirect_to root_path, alert: "Chat not found" 
		    end
		end	
	private
		def set_messageable
	      @messageable = current_user.conversations.find_by(id: params[:chat_id])
	  	end
end
