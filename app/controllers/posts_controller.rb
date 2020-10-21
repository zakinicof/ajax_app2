class PostsController < ApplicationController
  def index  #indexアクションを定義
    @posts = Post.all.order(id: "DESC") #全てのレコードを@postに代入
  end

  def create
    # contentカラムはparams[:content]（新規投稿ページで記述された内容）として保存する
    Post.create(content: params[:content])
    # indexアクション（トップページ）へリダイレクト
    redirect_to action: :index
  end
end
