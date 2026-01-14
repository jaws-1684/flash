class Field < ApplicationComponent
  erb_template <<-ERB
   <div class="field mb-4 <%= classes %>">
      <%= content %>
   </div>
  ERB

  def initialize(classes: '')
    @classes = classes
  end

  private

  attr_reader :classes
end