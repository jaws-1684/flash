module Messageable
	def show
		if @messageable
	      render :json => @messageable.messages
	    else
	      render json: { error: "not found" }, status: 404  
	    end
	end
	
	def create
		@message = @messageable.messages.new(message_params)
		@message.user = current_user
		
		if @message.save
			render json: {}, status: :ok 
		else
			render json: { error: "message could not be saved" }, status: 404 
		end	
	end

	private

	def message_params
		params.expect(message: [:body])
	end
end