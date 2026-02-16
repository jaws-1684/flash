class Message < ApplicationRecord
  after_create :attach_image_keys
  belongs_to :messageable, polymorphic: true
  belongs_to :user
  has_many_attached :images

  def as_json(options = {})
      unless soft_deleted
        super({ except: [ :image_keys ], methods: :attached_images }.merge(options))
      else
        super({ except: [ :image_keys, :body ] }).merge(options)  
      end
  end

  def attached_images
    self.image_keys.split(",") unless self.image_keys.blank?
  end

  def soft_delete!
    update(soft_deleted: true)
  end

  private
    def attach_image_keys
      if images.attached?
        keys = images.map(&:url).join(",")
        update(image_keys: keys)
      end
    end
end
