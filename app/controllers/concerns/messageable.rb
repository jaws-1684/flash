module Messageable	
	def create
		@message = @messageable.messages.new(message_params)
		@message.user = current_user
		
		if @message.save
			ChatChannel.broadcast_to(@messageable, { message: @message, time_ago: helpers.time_ago_in_words(@message.created_at)} )
		else
			render json: { error: "message could not be saved" }, status: :unprocessable_entity 
		end	
	end

	private

	def message_params
		params.expect(message: [:body])
	end
end