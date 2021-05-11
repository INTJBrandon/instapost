class PostSerializer < ActiveModel::Serializer
  attributes :id, :description, :img_url
  has_many :comments
end
