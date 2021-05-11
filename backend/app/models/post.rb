class Post < ApplicationRecord
    has_many :comments, :dependent => :destroy
    validates_presence_of :img_url, :description
end
