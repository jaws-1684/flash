module Messageable
  def create
    @message = @messageable.messages.new(message_params)
    @message.user = current_user

    if params[:images]
      @message.images.attach(params[:images])
    end


    if @message.save
      broadcast_to @messageable, { message: @message }, @message.messageable_type
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
