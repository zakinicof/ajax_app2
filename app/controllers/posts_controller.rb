class PostsController < ApplicationController
  def index  #indexアクションを定義
    @posts = Post.all #全てのレコードを@postに代入
  end
  def new
  end
  def create
    Post.create(content: params[:content])
    # contentカラムはparams[:content]（新規投稿ページで記述された内容）として保存する
  end
end
