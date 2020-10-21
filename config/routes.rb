Rails.application.routes.draw do
  # URLは/posts,行き先はpostsコントローラーのindexアクション
  root to: "posts#index"
  post "posts", to: "posts#create"
  # pathパラメーターを使用してエンドポイントを設定
  get 'posts/:id' , to: "posts#checked"
end
