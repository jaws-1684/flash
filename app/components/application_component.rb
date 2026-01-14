class ApplicationComponent < ViewComponent::Base
  # include Turbo::FramesHelper

  # delegate :inline_svg_tag, :inline_svg, to: :helpers

  # class << self
  #   attr_reader :class_variants

  #   def style(&)
  #     @class_variants = ClassVariants.build(&)
  #   end
  # end

  # def classes_for(slot)
  #   self.class.class_variants.render(slot, type: variant)
  # end
  def initialize(classes: '')
    @classes = classes
  end
  private

  attr_reader :classes
end