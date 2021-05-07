# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Post.create(title: "Second Post", description: "more descriptions", img_url: "some url")
Post.create(title: "Third Post", description: "more descriptions", img_url: "some url")
Post.create(title: "Fourth Post", description: "more descriptions", img_url: "some url")
Post.create(title: "Fifth Post", description: "more descriptions", img_url: "some url")
Post.create(title: "Sixth Post", description: "more descriptions", img_url: "some url")
Post.create(title: "Seventh Post", description: "more descriptions", img_url: "some url")

Comment.create(content: "This post is pretty good", post_id: 1)
Comment.create(content: "I agree, this posts is amazing", post_id: 1)

Comment.create(content: "Let's go! I love this post", post_id: 2)