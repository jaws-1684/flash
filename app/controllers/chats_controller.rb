class ChatsController < ApplicationController
	include Messageable
	before_action :set_messageable
	
	def index
		render inertia: { chats: current_user.chat_names }
	end
	
	private
		def set_messageable
	      @messageable = current_user.conversations.find_by(id: params[:id])
	  	end
end
