Rails.application.routes.draw do
  resources :playlists, only: [:new, :create, :show]

  namespace :api do
    namespace :v1 do
      resource :search, only: :show
    end
  end

  root to: 'playlists#new'
end
