class Chats::ChatsController < ApplicationController
	include Messageable
	before_action :set_messageable
		
	private
		def set_messageable
	      @messageable = current_user.conversations.find_by(id: params[:chat_id])
	  	end
end
