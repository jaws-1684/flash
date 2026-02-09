class ChatsController < ApplicationController
	def index
		render inertia: { chats: current_user.chat_names }
	end

	def create
		@exiting_chat = current_user.find_chat(params[:chat][:recipient_id])

		@chat = current_user.chats.build(chat_params)
		if @chat.save 
			render :json => { chat_id: @chat.id}
		elsif !@exiting_chat.nil?
			render :json => { chat_id: @exiting_chat.id}	
		else
			render json: @chat.errors, status: :unprocessable_entity	
		end
	end

	private
		def chat_params
			params.expect(chat: [:recipient_id])
		end
		
end
