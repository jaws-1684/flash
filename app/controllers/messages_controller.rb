class MessagesController < ApplicationController
	before_action :set_message_and_messageable
	after_action :broadcast_to_chat

	def destroy
		if @message.soft_delete!
			render json: {}, status: :ok
		else
			render json: @message.errors, status: :unprocessable_entity	 
		end
	end
	def update
		if @message.update(message_params.merge(edited: true))
			render json: {}, status: :ok
		else
			render json: @message.errors, status: :unprocessable_entity	 	
		end
	end
	private
		def set_message_and_messageable
			@message = current_user.messages.find(params[:id])
			@messageable = @message.messageable
		end
		def message_params
			params.expect(message: [ :body, images: [] ])
		end
		def broadcast_to_chat
			ChatChannel.broadcast_to(@messageable, { message: @message })
		end
end
