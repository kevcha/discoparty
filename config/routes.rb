Rails.application.routes.draw do
  devise_for :users

  resources :playlists, only: [:index, :create, :show, :destroy]
  resources :parties, only: :show, path: :party
  resources :joins, only: :index

  get :join, to: 'playlists#join', as: 'join_playlist'
  get :parties, to: 'parties#show'

  namespace :api do
    namespace :v1 do
      resource :search, only: :show
      resources :playlists, only: [:show] do
        resources :tracks, only: [:index, :create, :update, :destroy]
        member do
          post 'state', to: 'playlists#state'
        end
      end

      resources :tracks, only: [] do
        member do
          post :vote, to: 'tracks#upvote'
          delete :vote, to: 'tracks#downvote'
        end
      end
    end
  end

  root to: 'pages#home'
end
