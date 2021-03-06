class PostsController < ApplicationController
    def index 
        posts = Post.all
        render json: posts, include: [:comments]
    end


    def create
        post = Post.new(post_params)
        if post.save
            render json: post
        end

    end

    def destroy
        post = Post.find_by(id: params[:id])
        post.destroy
    end




    def post_params
        params.require(:post).permit(:description, :img_url)
    end
    
end
