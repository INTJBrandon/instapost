class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :img_url
  has_many :comments
end
