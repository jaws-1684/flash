class GroupChats::GroupChatsController < ApplicationController
  include Messageable
  before_action :set_messageable
    def show
      if @messageable
        render inertia: "messages/index", props: {
          chat: @messageable,
          chats: current_user.chats.includes(:messages),
          group_chats: current_user.group_chats.includes(:messages),
          chat_messages:  @messageable.messages,
          type: :group
        }
      # render :json => order_by_creation_time(@messageable.messages)
      else
         redirect_to root_path, alert: "Chat not found"
      end
    end
  private
    def set_messageable
        @group_chats = current_user.group_chats
        @messageable = @group_chats.find_by_slug(params[:group_chat_id]) || @group_chats.find(params[:group_chat_id])
    end
end