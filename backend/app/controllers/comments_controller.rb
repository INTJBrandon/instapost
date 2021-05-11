class CommentsController < ApplicationController

    def index
        comments = Comment.all
        render json: comments
    end
    def create
        comment = Comment.new(comment_params)
        if comment.save
            render json: comment
        end
    end


    def destroy
        comment = Comment.find_by(id: params[:id])
        comment.destroy
    end






    def comment_params
        params.require(:comment).permit(:content, :post_id)
    end
end
