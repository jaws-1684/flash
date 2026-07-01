class ChatsController < ApplicationController
  def index
    render inertia: { chats: current_user.chats.includes(:messages), group_chats: current_user.group_chats.includes(:messages) }
  end

  def create
    @recipient_id = params[:chat][:recipient_id]
    @user_chat = current_user.user_chats.find_by_recipient_id(@recipient_id)
    @chat = @user_chat&.chat || current_user.chats.build(user_id: current_user.id, recipient_id: @recipient_id)
   
    if @chat.persisted? || @chat.save
      render json: { chat_id: @chat.id }
    else
      render json: @chat.errors, status: :unprocessable_entity
    end
  end
  def destroy
    @chat = current_user.chats.find(params[:id])

    @user_chat = current_user.user_chats.find_by_chat_id_and_recipient_id(@chat.id, @chat.recipient.id)
    if @user_chat.destroy
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
