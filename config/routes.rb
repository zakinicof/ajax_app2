Rails.application.routes.draw do
  # URLは/posts,行き先はpostsコントローラーのindexアクション
  root to: "posts#index"
  get "posts/new", to: "posts#new"
  post "posts", to: "posts#create"
end
