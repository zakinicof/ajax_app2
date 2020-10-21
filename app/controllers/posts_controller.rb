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
  # 「既読」の操作を行ったときに実行されるアクション
  def checked
    # idの情報を取得してpostに代入
    post = Post.find(params[:id])
    # 既読であるかの判定
    if post.checked 
      # 既読なら既読を解除するためにfalseへ
      post.update(checked: false)
    else
      # 未読なら既読へ
      post.update(checked: true)
    end
    # その後更新した情報を取得し直し
    item = Post.find(params[:id])
    # json形式のデータでchecked.jsに返却
    render json: { post: item }
  end
end
