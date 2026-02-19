class GroupChats::GroupChatsController < ApplicationController
  include Messageable
  before_action :set_messageable
    def show
      if @messageable
        render inertia: "messages/index", props: {
          chat: @messageable,
          chatMessages:  @messageable.messages,
          type: :group
        }
      # render :json => order_by_creation_time(@messageable.messages)
      else
         redirect_to root_path, alert: "Chat not found"
      end
    end
  private
    def set_messageable
        @chat_groups = current_user.chat_groups
        @messageable = @chat_groups.find_by_slug(params[:group_chat_id]) || @chat_groups.find(params[:group_chat_id])
    end
end