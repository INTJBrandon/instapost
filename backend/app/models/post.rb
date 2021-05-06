class Post < ApplicationRecord
    has_many :comments
    validates_presence_of :img_url, :description, :title
end
