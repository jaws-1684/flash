class Chats::ChatsController < ApplicationController
  include Messageable
  before_action :set_messageable
    def show
      if @messageable
        render inertia: "messages/index", props: {
          chat: @messageable,
          chats: current_user.chat_names, 
          group_chats: current_user.group_chats,
          recipient: current_user.chat_recipient(@messageable),
          chatMessages:  @messageable.messages,
          type: :private
        }
      # render :json => order_by_creation_time(@messageable.messages)
      else
         redirect_to root_path, alert: "Chat not found"
      end
    end
  private
    def set_messageable
        @messageable = current_user.conversations.find_by(id: params[:chat_id])
      end
end
