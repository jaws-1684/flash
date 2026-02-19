class ChatsController < ApplicationController
  def index
    render inertia: { chats: current_user.chat_names, group_chats: current_user.group_chats }
  end

  def create
    @chat = current_user.find_or_initialize_chat(chat_params)
    if @chat.save
      render json: { chat_id: @chat.id }
    else
      render json: @chat.errors, status: :unprocessable_entity
    end
  end
  def destroy
    @chat = current_user.conversations.find(params[:id])
    if @chat.destroy
      redirect_to root_path, alert: "Chat deleted"
    else
      redirect_to @chat, alert: "Something went wrong"
    end
  end

  private
    def chat_params
      params.expect(chat: [ :recipient_id ])
    end
end
