module Messageable
	def show
		if @messageable
			render inertia: 'chats/show', props: { 
				chat_id: @messageable.id,
				recipient: current_user.chat_recipient(@messageable), 
				messages:  order_by_creation_time(@messageable.messages)
			}
	      # render :json => order_by_creation_time(@messageable.messages)
	    else
	     redirect_to root_path, alert: "Chat not found" 
	    end
	end
	
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