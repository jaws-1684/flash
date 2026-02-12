class Message < ApplicationRecord
  after_create :attach_image_keys
  belongs_to :messageable, polymorphic: true
  belongs_to :user
  has_many_attached :images

  def as_json(options = {})
      super({ except: [ :messageable_type, :messageable_id, :image_keys ], methods: :attached_images }.merge(options))
  end

  def attached_images
    self.image_keys.split(",") unless self.image_keys.blank?
  end

  private
    def attach_image_keys
      if images.attached?
        options = { width: 200, height: 200, crop: :fill }
        keys = images.map { |image| image.url }.join(",")
        self.update(image_keys: keys)
      end
    end
end
