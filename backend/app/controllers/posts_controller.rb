class PostsController < ApplicationController
    def index 
        posts = Post.all
        render json: posts, include: [:comments]
    end


    def create
        byebug
        post = Post.new(post_params)
        if post.save
            render json: post
        end

    end




    def post_params
        params.require(:post).permit(:title, :description, :img_url)
    end
    
end
