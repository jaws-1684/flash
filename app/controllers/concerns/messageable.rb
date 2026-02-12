module Messageable
  def create
    @message = @messageable.messages.new(message_params)
    @message.user = current_user

    if params[:images]
      @message.images.attach(params[:images])
    end


    if @message.save
      ChatChannel.broadcast_to(@messageable, { data: @message })
      render json: {}, status: :ok
    else
      render json: { error: "message could not be saved" }, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.expect(message: [ :body, images: [] ])
  end
end
