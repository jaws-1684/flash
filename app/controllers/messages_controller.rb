class MessagesController < ApplicationController
	def destroy
		message_id = params[:id]
		@message = current_user.messages.find(message_id)
		@messageable = @message.messageable

		if @message.soft_delete!
			ChatChannel.broadcast_to(@messageable, { message: @message })
			render json: {}, status: :ok
		else
			render json: @message.errors, status: :unprocessable_entity	 
		end
	end
end
