class Chats::ChatsController < ApplicationController
  include Messageable
  include Pagy::Method

  before_action :set_messageable
  
    def show
     

      if @messageable
        pagy, records = pagy(:countless, @messageable.messages)
        render inertia: "messages/index", props: {
          chat: @messageable,
          chats: current_user.chats.includes(:messages),
          group_chats: current_user.group_chats.includes(:messages),
          chat_messages: InertiaRails.scroll(pagy) { records.as_json },
          type: :private
        }
      # render :json => order_by_creation_time(@messageable.messages)
      else
         redirect_to root_path, alert: "Chat not found"
      end
    end
  private
    def set_messageable
        @messageable = current_user.chats.find_by(id: params[:chat_id])
      end
end
